import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets'
import { IncomingMessage } from 'http'
import { URL } from 'url'

@WebSocketGateway()
export class TurtleWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleDisconnect(client: any) {
    throw new Error('Method not implemented.')
  }

  handleConnection(client: WebSocket, ...args: [IncomingMessage]) {
    const [incomingMessage] = args
    const { headers, url } = incomingMessage

    const parsedUrl = new URL([headers.host, url].join('/'))
  }
}
