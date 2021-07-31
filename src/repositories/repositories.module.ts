import { Module } from '@nestjs/common'
import { TurtleStatusRepositoryService } from './turtle-status-repository/turtle-status-repository.service'

@Module({
  providers: [TurtleStatusRepositoryService],
  exports: [TurtleStatusRepositoryService],
})
export class RepositoriesModule {}
