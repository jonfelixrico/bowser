import { Logger } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets'
import { IncomingMessage } from 'http'
import { fromEvent } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TurtleConnectedEvent } from 'src/events/turtle-connected.event'
import { TurtleDisconnectedEvent } from 'src/events/turtle-disconnected.event'
import { TurtleIncomingMessageReceived } from 'src/events/turtle-incoming-message-received.event'
import { TurtleClientPoolService } from 'src/turtle/gateways/turtle-client-pool/turtle-client-pool.service'

@WebSocketGateway()
export class TurtleWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private eventBus: EventBus,
    private pool: TurtleClientPoolService,
    private logger: Logger,
  ) {}

  handleDisconnect(client: WebSocket) {
    const removed = this.pool.removeViaClient(client)

    if (!removed) {
      // TODO add logging -- this case is odd
      this.logger.warn(
        'An unknown client has disconnected.',
        TurtleWsGateway.name,
      )
      return
    }

    const [key] = removed

    this.eventBus.publish(new TurtleDisconnectedEvent(key))
    this.logger.verbose(`Turtle ${key} has disconnected.`)
  }

  handleConnection(client: WebSocket, ...args: [IncomingMessage]) {
    const [incomingMessage] = args
    const { headers } = incomingMessage
    const turtleId = headers['turtle-id'] as string

    this.eventBus.publish(new TurtleConnectedEvent(turtleId))

    this.pool.add(turtleId, client)
    this.logger.verbose(`Turtle ${turtleId} has connected.`)

    fromEvent<MessageEvent>(client, 'onmessage')
      .pipe(takeUntil(fromEvent(client, 'onclose'))) // avoid mem leak, release listener if disconnection occurred
      .subscribe((e) => {
        this.eventBus.publish(
          // TODO add try catch if JSON.parse fails
          new TurtleIncomingMessageReceived(turtleId, JSON.parse(e.data)),
        )
      })
  }
}
