import FindPersonResponse from '@src/application/find/findPersonResponse';
import SearchPersonQuery from '@src/application/search/searchPersonQuery';
import PersonNotFoundError from '@src/domain/errors/personNotFoundError';
import Person from '@src/domain/person';
import PersonRepository from '@src/domain/personRepository';

export default class PersonSearcher {
    private repository: PersonRepository;

    constructor(repository: PersonRepository) {
        this.repository = repository;
    }

    async run(query: SearchPersonQuery): Promise<FindPersonResponse> {
        const person = new Person(query),
            storedPerson = await this.repository.find(new Person(query));

        // Since this use case is a finder, we throw an Error when the repository returns null
        if (!storedPerson) {
            throw new PersonNotFoundError(person);
        }

        return new FindPersonResponse(storedPerson);
    }
}
