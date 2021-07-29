import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandsController } from './commands/commands.controller'

@Module({
  imports: [CqrsModule],
  controllers: [CommandsController],
})
export class ControllersModule {}
