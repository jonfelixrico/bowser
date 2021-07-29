import { EventBus } from '@nestjs/cqrs'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets'
import { IncomingMessage } from 'http'
import { URL } from 'url'
import { TurtleConnectedEvent } from './events/turtle-connected.event'
import { TurtleDisconnectedEvent } from './events/turtle-disconnected.event'

@WebSocketGateway()
export class TurtleWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private eventBus: EventBus) {}

  handleDisconnect(client: WebSocket) {
    this.eventBus.publish(new TurtleDisconnectedEvent(client))
  }

  handleConnection(client: WebSocket, ...args: [IncomingMessage]) {
    const [incomingMessage] = args
    const { headers, url } = incomingMessage

    const parsedUrl = new URL([headers.host, url].join('/'))
    const params = parsedUrl.searchParams

    this.eventBus.publish(
      new TurtleConnectedEvent({
        client,
        id: params.get('label'),
        payload: {
          x: parseInt(params.get('x')),
          y: parseInt(params.get('y')),
          z: parseInt(params.get('z')),
          bearing: parseInt(params.get('bearing')),
        },
      }),
    )
  }
}
