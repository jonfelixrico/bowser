import { IEvent } from '@nestjs/cqrs'

interface ITurtleConnectedEventPayload {
  client: WebSocket
  id: string
  payload: {
    x: number
    y: number
    z: number
    bearing: number
  }
}

export class TurtleConnectedEvent implements IEvent {
  constructor(readonly payload: ITurtleConnectedEventPayload) {}
}
