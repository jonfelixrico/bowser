export interface ISentCommand {
  label: string
  instructions: {
    type: string
    args: Array<number | string>
  }[]
}

export class SendCommandDto {
  commands: ISentCommand[]
}
