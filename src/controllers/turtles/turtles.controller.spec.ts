import { Test, TestingModule } from '@nestjs/testing'
import { TurtlesController } from './turtles.controller'

describe('TurtlesController', () => {
  let controller: TurtlesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurtlesController],
    }).compile()

    controller = module.get<TurtlesController>(TurtlesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
