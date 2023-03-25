import PersonMother from '@src/domain/person.mother';
import CreatePersonCommandMother from '@src/application/create/createPersonCommand.mother';
import PersonCreator from '@src/application/create/personCreator';
import PersonRepositoryMock from '@src/__mocks__/personRepository.mock';
import CreatePersonCommandHandler from '@src/application/create/createPersonCommandHandler';

// When testing a use case, we will always mock the infra dependencies, queries, commands, etc.
// This way, we can test the logical behavior of the use case without worrying about the infra.
describe('personCreator', () => {
    it('should create a person', async () => {
        // This line is always present in each test. This will shout us if the tests is not performing any assertion
        expect.hasAssertions();

        // Mock the repository in order to have custom methods
        const repository = new PersonRepositoryMock(),
            creator = new PersonCreator(repository),
            handler = new CreatePersonCommandHandler(creator),
            // Using the mother pattern to create random entities
            person = PersonMother.random(),
            // In this case, we want the command to be created from the person, in order to ensure the repository is called correctly
            command = CreatePersonCommandMother.fromPerson(person);

        // We'll call the handler instead of the use case in order to test its functionality too.
        // We can do this because, usually, the handler has no logic and only calls the use case.
        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(person);
    });
});
