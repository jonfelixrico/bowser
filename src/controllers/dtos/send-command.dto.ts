export interface IAction {
  action: string
  args: Array<number | string>
}

export interface ITurtleCommand {
  id: string
  actions: IAction[]
}

export class SendCommandDto {
  commands: ITurtleCommand[]
}
