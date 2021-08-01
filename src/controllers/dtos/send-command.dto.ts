export interface ITurtleCommand {
  id: string
  actions: {
    action: string
    args: Array<number | string>
  }[]
}

export class SendCommandDto {
  commands: ITurtleCommand[]
}
