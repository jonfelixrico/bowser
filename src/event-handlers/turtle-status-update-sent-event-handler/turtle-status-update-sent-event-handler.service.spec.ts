import { Test, TestingModule } from '@nestjs/testing'
import { TurtleStatusUpdateSentEventHandlerService } from './turtle-status-update-sent-event-handler.service'

describe('TurtleStatusUpdateSentEventHandlerService', () => {
  let service: TurtleStatusUpdateSentEventHandlerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurtleStatusUpdateSentEventHandlerService],
    }).compile()

    service = module.get<TurtleStatusUpdateSentEventHandlerService>(
      TurtleStatusUpdateSentEventHandlerService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
