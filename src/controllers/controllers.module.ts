import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RepositoriesModule } from 'src/repositories/repositories.module'
import { CommandsController } from './commands/commands.controller'
import { TurtlesController } from './turtles/turtles.controller'

@Module({
  imports: [CqrsModule, RepositoriesModule],
  controllers: [CommandsController, TurtlesController],
})
export class ControllersModule {}
