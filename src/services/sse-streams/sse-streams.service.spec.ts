import { Test, TestingModule } from '@nestjs/testing'
import { SseStreamsService } from './sse-streams.service'

describe('SseStreamsService', () => {
  let service: SseStreamsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SseStreamsService],
    }).compile()

    service = module.get<SseStreamsService>(SseStreamsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
