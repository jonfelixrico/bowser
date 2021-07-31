import { ICommand } from '@nestjs/cqrs'

interface ISendMessageToTurtleCommandPayload {
  turtleId: string
  message: string
}

export class SendMessageToTurtleCommand implements ICommand {
  constructor(readonly payload: ISendMessageToTurtleCommandPayload) {}
}
