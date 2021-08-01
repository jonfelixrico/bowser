import { Injectable } from '@nestjs/common'
import { Subject } from 'rxjs'
import { filter, map, takeUntil } from 'rxjs/operators'

export interface IMessageEvent<T = unknown> {
  data: T
  id?: string
  type?: string
  retry?: number
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

  sendToStream(streamId: string, event: IMessageEvent) {
    this.main$.next({
      streamId,
      event: event,
    })
  }

  broadcast(event: IMessageEvent) {
    this.main$.next({
      event,
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
