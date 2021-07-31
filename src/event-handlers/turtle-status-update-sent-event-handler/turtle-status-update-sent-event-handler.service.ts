import { Logger, OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { EventBus, IEventHandler, ofType } from '@nestjs/cqrs'
import { filter } from 'rxjs/operators'
import { TurtleIncomingMessageReceived } from 'src/events/turtle-incoming-message-received.event'
import { TurtleStatusRepositoryService } from 'src/repositories/turtle-status-repository/turtle-status-repository.service'
import { SseStreamsService } from 'src/services/sse-streams/sse-streams.service'

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
    private sse: SseStreamsService,
  ) {}

  handle({ turtleId, payload }: TurtleIncomingMessageReceived<IStatus>) {
    const status = {
      ...payload,
      timestamp: new Date(),
    }

    this.repo.updateStatus(turtleId, status)
    // TODO send to specific streams next time

    this.sse.broadcast({
      id: turtleId,
      ...status,
    })

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
