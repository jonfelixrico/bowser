import { IEvent } from '@nestjs/cqrs'

interface ITurtleConnectedEventPayload {
  x: number
  y: number
  z: number
  bearing: number
  label: string
}

export class TurtleConnectedEvent implements IEvent {
  constructor(readonly payload: ITurtleConnectedEventPayload) {}
}
