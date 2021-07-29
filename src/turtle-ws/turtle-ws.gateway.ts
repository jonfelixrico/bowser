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
import { TurtleIncomingMessageReceived } from 'src/events/turtle-incoming-message-received.event'
import { TurtleConnectedEvent } from '../events/turtle-connected.event'
import { TurtleDisconnectedEvent } from '../events/turtle-disconnected.event'
import { TurtleClientPoolService } from './turtle-client-pool/turtle-client-pool.service'

interface ITurtleData {
  label: string
  x: number
  y: number
  z: number
  bearing: number
  fuelLevel: number
}

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

    // TODO add error handling here if JSON.parse fails
    const payload: ITurtleData = JSON.parse(headers['turtle-data'] as string)

    this.eventBus.publish(new TurtleConnectedEvent(payload))

    this.pool.add(payload.label, client)
    this.logger.verbose(`Turtle ${payload.label} has connected.`)

    fromEvent<MessageEvent>(client, 'onmessage')
      .pipe(takeUntil(fromEvent(client, 'onclose'))) // avoid mem leak, release listener if disconnection occurred
      .subscribe((e) => {
        this.eventBus.publish(
          // TODO add try catch if JSON.parse fails
          new TurtleIncomingMessageReceived(payload.label, JSON.parse(e.data)),
        )
      })
  }
}
