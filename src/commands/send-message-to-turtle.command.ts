import { ICommand } from '@nestjs/cqrs'

interface ISendMessageToTurtleCommandPayload {
  label: string
  message: string
}

export class SendMessageToTurtleCommand implements ICommand {
  constructor(readonly payload: ISendMessageToTurtleCommandPayload) {}
}
