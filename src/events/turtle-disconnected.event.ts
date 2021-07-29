import { IEvent } from '@nestjs/cqrs'

export class TurtleDisconnectedEvent implements IEvent {
  constructor(readonly turtleLabel: string) {}
}
