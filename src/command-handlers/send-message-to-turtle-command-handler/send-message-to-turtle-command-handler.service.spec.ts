import { Test, TestingModule } from '@nestjs/testing'
import { SendMessageToTurtleCommandHandlerService } from './send-message-to-turtle-command-handler.service'

describe('SendMessageToTurtleCommandHandlerService', () => {
  let service: SendMessageToTurtleCommandHandlerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMessageToTurtleCommandHandlerService],
    }).compile()

    service = module.get<SendMessageToTurtleCommandHandlerService>(
      SendMessageToTurtleCommandHandlerService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
