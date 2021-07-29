import { IEvent } from '@nestjs/cqrs'

export class TurtleIncomingMessageReceived<T = unknown> implements IEvent {
  constructor(readonly label: string, readonly payload: T) {}
}
