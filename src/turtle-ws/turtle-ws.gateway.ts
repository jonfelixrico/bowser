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
import { URL } from 'url'
import { TurtleConnectedEvent } from '../events/turtle-connected.event'
import { TurtleDisconnectedEvent } from '../events/turtle-disconnected.event'
import { TurtleClientPoolService } from './turtle-client-pool/turtle-client-pool.service'

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
    const { headers, url } = incomingMessage

    /*
     * It doesn't matter if we put ws:// or wss:// here really, the protocol has no bearing here.
     * We're only putting it here so that URL will parse it properly
     */
    const parsedUrl = new URL(`ws://${headers.host}/${url}`)
    const params = parsedUrl.searchParams

    const label = params.get('label')

    this.pool.add(label, client)

    this.eventBus.publish(
      new TurtleConnectedEvent({
        // TODO make this safe, implement validation
        x: parseInt(params.get('x')),
        y: parseInt(params.get('y')),
        z: parseInt(params.get('z')),
        bearing: parseInt(params.get('bearing')),
        label,
      }),
    )

    this.logger.verbose(`Turtle ${label} has connected.`)

    fromEvent<MessageEvent>(client, 'onmessage')
      .pipe(takeUntil(fromEvent(client, 'onclose'))) // avoid mem leak, release listener if disconnection occurred
      .subscribe((e) => {
        this.eventBus.publish(
          // TODO add try catch if JSON.parse fails
          new TurtleIncomingMessageReceived(label, JSON.parse(e.data)),
        )
      })
  }
}
