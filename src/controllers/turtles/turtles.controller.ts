import { Controller, Get } from '@nestjs/common'
import { TurtleStatusRepositoryService } from 'src/repositories/turtle-status-repository/turtle-status-repository.service'

@Controller('turtles')
export class TurtlesController {
  constructor(private repo: TurtleStatusRepositoryService) {}

  @Get()
  getAllTurtles() {
    const entries = Object.values(this.repo.statusMap)
    return entries.sort((a, b) => a.id.localeCompare(b.id))
  }
}
