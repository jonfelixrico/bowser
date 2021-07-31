import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RepositoriesModule } from 'src/repositories/repositories.module'
import { ServicesModule } from 'src/services/services.module'
import { TurtleStatusUpdateSentEventHandlerService } from './turtle-status-update-sent-event-handler/turtle-status-update-sent-event-handler.service'

@Module({
  imports: [RepositoriesModule, CqrsModule, ServicesModule],
  providers: [TurtleStatusUpdateSentEventHandlerService],
})
export class EventHandlersModule {}
