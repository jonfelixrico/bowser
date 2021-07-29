import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SendTurtleInstructionsCommand } from 'src/commands/send-turtle-instructions.command'
import { SendCommandDto } from '../dtos/send-command.dto'

@Controller('commands')
export class CommandsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async sendCommand(@Body() { commands }: SendCommandDto) {
    commands = commands || []

    for (const command of commands) {
      await this.commandBus.execute(new SendTurtleInstructionsCommand(command))
    }
  }
}
