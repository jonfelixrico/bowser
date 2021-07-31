import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { WebsocketsModule } from 'src/websockets/websockets.module'
import { SendMessageToTurtleCommandHandlerService } from './send-message-to-turtle-command-handler/send-message-to-turtle-command-handler.service'

@Module({
  imports: [CqrsModule, WebsocketsModule],
  providers: [SendMessageToTurtleCommandHandlerService],
})
export class CommandHandlersModule {}
