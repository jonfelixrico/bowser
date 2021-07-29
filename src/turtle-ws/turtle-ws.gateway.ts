import { EventBus } from '@nestjs/cqrs'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets'
import { IncomingMessage } from 'http'
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
        x: parseInt(params.get('x')),
        y: parseInt(params.get('y')),
        z: parseInt(params.get('z')),
        bearing: parseInt(params.get('bearing')),
        label,
      }),
    )
  }
}
