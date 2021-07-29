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
  ) {}

  handleDisconnect(client: WebSocket) {
    const removed = this.pool.removeViaClient(client)

    if (!removed) {
      // TODO add logging -- this case is odd
      return
    }

    const [key] = removed

    this.eventBus.publish(new TurtleDisconnectedEvent(key))
  }

  handleConnection(client: WebSocket, ...args: [IncomingMessage]) {
    const [incomingMessage] = args
    const { headers, url } = incomingMessage

    const parsedUrl = new URL([headers.host, url].join('/'))
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
