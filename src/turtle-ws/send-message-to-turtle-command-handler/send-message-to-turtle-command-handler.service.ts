import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SendMessageToTurtleCommand } from 'src/commands/send-message-to-turtle.command'
import { TurtleClientPoolService } from '../turtle-client-pool/turtle-client-pool.service'

@CommandHandler(SendMessageToTurtleCommand)
export class SendMessageToTurtleCommandHandlerService
  implements ICommandHandler<SendMessageToTurtleCommand>
{
  constructor(private pool: TurtleClientPoolService) {}

  execute(command: SendMessageToTurtleCommand): Promise<any> {
    const { label, message } = command.payload

    const entry = this.pool.findViaKey(label)
    if (!entry) {
      // TODO throw error to let user know that turtle is not connected
      return
    }

    const client = entry[1]
    client.send(message)
  }
}
