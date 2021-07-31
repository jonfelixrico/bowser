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
import { parse } from 'query-string'
import { TurtleConnectedEvent } from 'src/events/turtle-connected.event'
import { TurtleDisconnectedEvent } from 'src/events/turtle-disconnected.event'
import { TurtleIncomingMessageReceived } from 'src/events/turtle-incoming-message-received.event'
import { TurtleClientPoolService } from 'src/websockets/turtle-client-pool/turtle-client-pool.service'

const WS_URL_REGEXP = /\/*(.*)/

interface ITurtleMessageBody<T = unknown> {
  type: string
  payload: T
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

    const queryString = WS_URL_REGEXP.exec(incomingMessage.url)[1]
    const queryParams = parse(queryString)
    const turtleId = queryParams.id as string

    this.eventBus.publish(new TurtleConnectedEvent(turtleId))

    this.pool.add(turtleId, client)
    this.logger.verbose(`Turtle ${turtleId} has connected.`)

    fromEvent<MessageEvent>(client, 'message')
      .pipe(takeUntil(fromEvent(client, 'close'))) // avoid mem leak, release listener if disconnection occurred
      .subscribe((e) => {
        const body = JSON.parse(e.data) as ITurtleMessageBody

        this.eventBus.publish(
          // TODO add try catch if JSON.parse fails
          new TurtleIncomingMessageReceived(turtleId, body.type, body.payload),
        )
      })
  }
}
