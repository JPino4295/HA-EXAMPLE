import PersonRepositoryMock from '@src/__mocks__/personRepository.mock';
import PersonFinder from '@src/application/find/personFinder';
import FindPersonQueryHandler from '@src/application/find/findPersonQueryHandler';
import FindPersonQueryMother from '@src/application/find/findPersonQuery.mother';
import FindPersonResponseMother from '@src/application/find/findPersonResponse.mother';
import PersonMother from '@src/domain/person.mother';
import PersonNotFoundError from '@src/domain/errors/personNotFoundError';

describe('personFinder', () => {
    it('should return a PersonNotFoundError if the person does not exist', async () => {
        expect.hasAssertions();

        const repository = new PersonRepositoryMock(),
            finder = new PersonFinder(repository),
            handler = new FindPersonQueryHandler(finder),
            query = FindPersonQueryMother.random();

        repository.whenFindThenReturn(null);

        await expect(handler.handle(query)).rejects.toThrow(PersonNotFoundError);
    });

    it('should return a full FindPersonResponse if the person exists', async () => {
        expect.hasAssertions();

        const repository = new PersonRepositoryMock(),
            finder = new PersonFinder(repository),
            handler = new FindPersonQueryHandler(finder),
            query = FindPersonQueryMother.random(),
            person = PersonMother.random(),
            expected = FindPersonResponseMother.create(person);

        repository.whenFindThenReturn(person);

        await expect(handler.handle(query)).resolves.toStrictEqual(expected);
    });

    it('should call the repository with the correct params', async () => {
        expect.hasAssertions();

        const repository = new PersonRepositoryMock(),
            finder = new PersonFinder(repository),
            handler = new FindPersonQueryHandler(finder),
            query = FindPersonQueryMother.random();

        repository.whenFindThenReturn(PersonMother.random());

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(PersonMother.create(query));
    });
});
