import Person from '@src/domain/person';
import PersonRepository from '@src/domain/personRepository';

// This class is used to mock any repository, and used in the use case tests
// With this, we can ensure the use case is calling the repository correctly without the necessity of an actual repository
export default class PersonRepositoryMock implements PersonRepository {
    private mockSave = jest.fn();

    async save(person: Person): Promise<void> {
        return this.mockSave(person);
    }

    assertSaveWasCalledWith(person: Person): void {
        expect(this.mockSave).toHaveBeenCalledWith(person);
    }
}
