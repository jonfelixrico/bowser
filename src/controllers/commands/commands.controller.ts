import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SendMessageToTurtleCommand } from 'src/commands/send-message-to-turtle.command'
import { SendCommandDto } from '../dtos/send-command.dto'

@Controller('commands')
export class CommandsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async sendCommand(@Body() { commands }: SendCommandDto) {
    commands = commands || []

    for (const { label, instructions } of commands) {
      await this.commandBus.execute(
        new SendMessageToTurtleCommand({
          turtleId: label,
          message: JSON.stringify(instructions),
        }),
      )
    }
  }
}
