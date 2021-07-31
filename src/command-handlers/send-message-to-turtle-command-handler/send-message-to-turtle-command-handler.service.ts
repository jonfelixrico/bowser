import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SendMessageToTurtleCommand } from 'src/commands/send-message-to-turtle.command'
import { TurtleClientPoolService } from '../../websockets/turtle-client-pool/turtle-client-pool.service'

@CommandHandler(SendMessageToTurtleCommand)
export class SendMessageToTurtleCommandHandlerService
  implements ICommandHandler<SendMessageToTurtleCommand>
{
  constructor(private pool: TurtleClientPoolService, private logger: Logger) {}

  execute(command: SendMessageToTurtleCommand): Promise<any> {
    const { turtleId: label, message } = command.payload

    const entry = this.pool.findViaKey(label)
    if (!entry) {
      // TODO throw error to let user know that turtle is not connected
      this.logger.verbose(
        `Attempted to send a mesage to unregistered turtle ${label}.`,
        SendMessageToTurtleCommandHandlerService.name,
      )
      return
    }

    const client = entry[1]
    client.send(message)
    this.logger.verbose(
      `Sent a message to turtle ${label}`,
      SendMessageToTurtleCommandHandlerService.name,
    )
  }
}
