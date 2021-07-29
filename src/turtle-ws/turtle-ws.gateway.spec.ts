import { Test, TestingModule } from '@nestjs/testing'
import { TurtleWsGateway } from './turtle-ws.gateway'

describe('TurtleWsGateway', () => {
  let gateway: TurtleWsGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurtleWsGateway],
    }).compile()

    gateway = module.get<TurtleWsGateway>(TurtleWsGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
