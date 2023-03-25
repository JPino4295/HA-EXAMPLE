import Command from '@context/shared/domain/commandBus/command';
import { CommandHandler } from '@context/shared/domain/commandBus/commandHandler';
import CreatePersonCommand from '@src/application/create/createPersonCommand';
import PersonCreator from '@src/application/create/personCreator';

export default class CreatePersonCommandHandler implements CommandHandler<CreatePersonCommand> {
    readonly creator: PersonCreator;

    constructor(creator: PersonCreator) {
        this.creator = creator;
    }

    // This method is used to reference the command that this handler will handle.
    // It's useful to not create a specific infrastructure element to handle this.
    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return CreatePersonCommand;
    }

    async handle(command: CreatePersonCommand): Promise<void> {
        return this.creator.run(command);
    }
}
