import { Module } from '@nestjs/common'
import { TurtleClientPoolService } from './gateways/turtle-client-pool/turtle-client-pool.service'
import { CqrsModule } from '@nestjs/cqrs'
import { SendMessageToTurtleCommandHandlerService } from './command-handlers/send-message-to-turtle-command-handler/send-message-to-turtle-command-handler.service'
import { TurtleWsGateway } from './gateways/turtle-ws-gateway/turtle-ws.gateway'

@Module({
  imports: [CqrsModule],
  providers: [
    TurtleWsGateway,
    TurtleClientPoolService,
    SendMessageToTurtleCommandHandlerService,
  ],
})
export class TurtleModule {}
