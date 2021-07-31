import { IEvent } from '@nestjs/cqrs'

export class TurtleConnectedEvent implements IEvent {
  constructor(readonly turtleId: string) {}
}
