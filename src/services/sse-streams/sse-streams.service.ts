import { Injectable } from '@nestjs/common'
import { Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'

interface ISseSubjectPayload<T = unknown> {
  id?: string
  payload: T
}

@Injectable()
export class SseStreamsService {
  private main$ = new Subject<ISseSubjectPayload>()
  private close$ = new Subject<string>()

  closeStream(id: string) {
    this.close$.next(id)
  }

  sendToStream(id: string, payload: unknown) {
    this.main$.next({
      id,
      payload,
    })
  }

  broadcast(payload: unknown) {
    this.main$.next({
      payload,
    })
  }

  getStream(id: string) {
    return this.main$.pipe(
      filter((e) => !id || id === e.id),
      takeUntil(this.close$.pipe(filter((closedId) => id === closedId))),
    )
  }
}
