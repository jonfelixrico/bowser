import { Injectable } from '@nestjs/common'
import { Subject } from 'rxjs'
import { filter, map, takeUntil } from 'rxjs/operators'

export interface IMessageEvent<T = unknown> {
  data: T
}

export interface ISseMessage<T = unknown> {
  type: string
  data?: T
}

interface ISseSubjectPayload<T = unknown> {
  streamId?: string
  event: IMessageEvent<T>
}

@Injectable()
export class SseStreamsService {
  private main$ = new Subject<ISseSubjectPayload>()
  private close$ = new Subject<string>()

  closeStream(id: string) {
    this.close$.next(id)
  }

  sendToStream(streamId: string, message: ISseMessage) {
    this.main$.next({
      streamId,
      event: {
        data: message,
      },
    })
  }

  broadcast(message: ISseMessage) {
    this.main$.next({
      event: {
        data: message,
      },
    })
  }

  getStream(streamId: string) {
    return this.main$.pipe(
      filter((e) => !e.streamId || streamId === e.streamId),
      takeUntil(this.close$.pipe(filter((closedId) => streamId === closedId))),
      map(({ event }) => event),
    )
  }
}
