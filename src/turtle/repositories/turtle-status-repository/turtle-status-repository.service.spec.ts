import { Test, TestingModule } from '@nestjs/testing'
import { TurtleStatusRepositoryService } from './turtle-status-repository.service'

describe('TurtleStatusRepositoryService', () => {
  let service: TurtleStatusRepositoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurtleStatusRepositoryService],
    }).compile()

    service = module.get<TurtleStatusRepositoryService>(
      TurtleStatusRepositoryService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
