import { Module } from '@nestjs/common'
import { TurtleWsGateway } from './turtle-ws.gateway'
import { TurtleClientPoolService } from './turtle-client-pool/turtle-client-pool.service'
import { CqrsModule } from '@nestjs/cqrs'
import { SendMessageToTurtleCommandHandlerService } from './send-message-to-turtle-command-handler/send-message-to-turtle-command-handler.service'

@Module({
  imports: [CqrsModule],
  providers: [
    TurtleWsGateway,
    TurtleClientPoolService,
    SendMessageToTurtleCommandHandlerService,
  ],
})
export class TurtleWsModule {}
