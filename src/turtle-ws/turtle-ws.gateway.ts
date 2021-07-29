import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

@WebSocketGateway()
export class TurtleWsGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.debug(args)
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }
}
