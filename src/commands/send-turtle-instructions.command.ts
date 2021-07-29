import { ICommand } from '@nestjs/cqrs'

export interface ISendTurtleInstructionsCommandPayload {
  label: string
  instructions: {
    type: string
    args: Array<number | string>
  }[]
}

export class SendTurtleInstructionsCommand implements ICommand {
  constructor(readonly payload: ISendTurtleInstructionsCommandPayload) {}
}
