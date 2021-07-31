import { Test, TestingModule } from '@nestjs/testing'
import { TurtleClientPoolService } from './turtle-client-pool.service'

describe('TurtleClientPoolService', () => {
  let service: TurtleClientPoolService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurtleClientPoolService],
    }).compile()

    service = module.get<TurtleClientPoolService>(TurtleClientPoolService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
