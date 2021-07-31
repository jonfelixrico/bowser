import { IEvent } from '@nestjs/cqrs'

export class TurtleIncomingMessageReceived<T = unknown> implements IEvent {
  constructor(
    readonly turtleId: string,
    readonly type: string,
    readonly payload: T,
  ) {}
}
