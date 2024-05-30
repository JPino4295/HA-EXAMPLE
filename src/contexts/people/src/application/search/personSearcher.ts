import SearchPersonQuery from '@src/application/search/searchPersonQuery';
import SearchPersonResponse from '@src/application/search/searchPersonResponse';
import Person from '@src/domain/person';
import PersonRepository from '@src/domain/personRepository';

export default class PersonSearcher {
    private repository: PersonRepository;

    constructor(repository: PersonRepository) {
        this.repository = repository;
    }

    async run(query: SearchPersonQuery): Promise<SearchPersonResponse> {
        const person = await this.repository.find(new Person(query));

        // Since this use case is a searcher, we can return a nullable value (in case the repository returns null).
        return new SearchPersonResponse(person);
    }
}
