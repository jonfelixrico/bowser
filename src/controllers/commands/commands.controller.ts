import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SendMessageToTurtleCommand } from 'src/commands/send-message-to-turtle.command'
import { IAction, SendCommandDto } from '../dtos/send-command.dto'

interface ICommandMessage {
  type: 'COMMAND'
  payload: IAction[]
}

@Controller('commands')
export class CommandsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async sendCommand(@Body() { commands }: SendCommandDto) {
    commands = commands || []

    for (const { id, actions } of commands) {
      const message: ICommandMessage = {
        type: 'COMMAND',
        payload: actions,
      }

      await this.commandBus.execute(
        new SendMessageToTurtleCommand({
          turtleId: id,
          message: JSON.stringify(message),
        }),
      )
    }
  }
}
