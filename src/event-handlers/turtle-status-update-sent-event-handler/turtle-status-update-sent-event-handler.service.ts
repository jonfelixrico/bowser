import { Logger, OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { EventBus, IEventHandler, ofType } from '@nestjs/cqrs'
import { filter } from 'rxjs/operators'
import { TurtleIncomingMessageReceived } from 'src/events/turtle-incoming-message-received.event'
import { TurtleStatusRepositoryService } from 'src/repositories/turtle-status-repository/turtle-status-repository.service'

interface IStatus {
  x: number
  y: number
  z: number
  bearing: number
  fuelLevel: number
  fuelLimit: number
  label: string
}

@Injectable()
export class TurtleStatusUpdateSentEventHandlerService
  implements
    OnModuleInit,
    IEventHandler<TurtleIncomingMessageReceived<IStatus>>
{
  constructor(
    private eventBus: EventBus,
    private repo: TurtleStatusRepositoryService,
    private logger: Logger,
  ) {}

  handle({ turtleId, payload }: TurtleIncomingMessageReceived<IStatus>) {
    this.repo.updateStatus(turtleId, payload)
    this.logger.verbose(
      `Updated the status of turtle ${turtleId}/${payload.label}`,
      TurtleStatusUpdateSentEventHandlerService.name,
    )
  }

  onModuleInit() {
    this.eventBus
      .pipe(
        ofType(TurtleIncomingMessageReceived),
        filter(({ type }) => type === 'STATUS_UPDATE'),
      )
      .subscribe(this.handle.bind(this))
  }
}
