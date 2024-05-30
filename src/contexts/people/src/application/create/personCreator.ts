import CreatePersonCommand from '@src/application/create/createPersonCommand';
import Person from '@src/domain/person';
import PersonRepository from '@src/domain/personRepository';

export default class PersonCreator {
    readonly repository: PersonRepository;

    constructor(repository: PersonRepository) {
        this.repository = repository;
    }

    // Use cases that uses commands usually return void, but there are some cases when a response can be returned
    // For example: Create a person and return the database record's Id
    async run(command: CreatePersonCommand): Promise<void> {
        await this.repository.save(
            new Person({
                name: command.name,
                surname: command.surname,
                age: command.age,
                address: {
                    street: command.street,
                    country: command.country,
                    city: command.city
                }
            })
        );
    }
}
