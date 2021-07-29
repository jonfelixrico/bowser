import { Module } from '@nestjs/common'
import { CommandsController } from './commands/commands.controller'

@Module({
  controllers: [CommandsController],
})
export class ControllersModule {}
