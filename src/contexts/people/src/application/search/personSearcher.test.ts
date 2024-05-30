import PersonRepositoryMock from '@src/__mocks__/personRepository.mock';
import PersonSearcher from '@src/application/search/personSearcher';
import SearchPersonQueryHandler from '@src/application/search/searchPersonQueryHandler';
import SearchPersonQueryMother from '@src/application/search/searchPersonQuery.mother';
import SearchPersonResponseMother from '@src/application/search/searchPersonResponse.mother';
import PersonMother from '@src/domain/person.mother';

describe('personSearcher', () => {
    it('should return a full SearchPersonResponse if the person exists', async () => {
        expect.hasAssertions();

        const repository = new PersonRepositoryMock(),
            searcher = new PersonSearcher(repository),
            handler = new SearchPersonQueryHandler(searcher),
            query = SearchPersonQueryMother.random(),
            person = PersonMother.random(),
            expected = SearchPersonResponseMother.create(person);

        repository.whenFindThenReturn(person);

        await expect(handler.handle(query)).resolves.toStrictEqual(expected);
    });

    it('should return an empty SearchPersonResponse if the person does not exist', async () => {
        expect.hasAssertions();

        const repository = new PersonRepositoryMock(),
            searcher = new PersonSearcher(repository),
            handler = new SearchPersonQueryHandler(searcher),
            query = SearchPersonQueryMother.random(),
            expected = SearchPersonResponseMother.empty();

        repository.whenFindThenReturn(null);

        await expect(handler.handle(query)).resolves.toStrictEqual(expected);
    });

    it('should call the repository with the correct params', async () => {
        expect.hasAssertions();

        const repository = new PersonRepositoryMock(),
            searcher = new PersonSearcher(repository),
            handler = new SearchPersonQueryHandler(searcher),
            query = SearchPersonQueryMother.random();

        repository.whenFindThenReturn(PersonMother.random());

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(PersonMother.create(query));
    });
});
