import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { RepositoriesModule } from 'src/repositories/repositories.module'
import { CommandsController } from './commands/commands.controller'
import { TurtlesController } from './turtles/turtles.controller'
import { SseController } from './sse/sse.controller'
import { ServicesModule } from 'src/services/services.module'

@Module({
  imports: [CqrsModule, RepositoriesModule, ServicesModule],
  controllers: [CommandsController, TurtlesController, SseController],
})
export class ControllersModule {}
