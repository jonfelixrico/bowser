import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RepositoriesModule } from 'src/repositories/repositories.module'
import { TurtleStatusUpdateSentEventHandlerService } from './turtle-status-update-sent-event-handler/turtle-status-update-sent-event-handler.service'

@Module({
  imports: [RepositoriesModule, CqrsModule],
  providers: [TurtleStatusUpdateSentEventHandlerService],
})
export class EventHandlersModule {}
