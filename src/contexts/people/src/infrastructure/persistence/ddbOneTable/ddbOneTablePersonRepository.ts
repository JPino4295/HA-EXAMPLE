import DdbOneTableRepository from '@context/shared/infrastructure/persistence/ddbOneTable/ddbOneTableRepository';
import PersonModel from '@src/infrastructure/persistence/ddbOneTable/person.model';
import Person from '@src/domain/person';
import PersonRepository from '@src/domain/personRepository';
import { OneModel } from 'dynamodb-onetable';

export default class DdbOneTablePersonRepository extends DdbOneTableRepository<Person> implements PersonRepository {
    // eslint-disable-next-line class-methods-use-this
    protected modelName(): string {
        return 'Person';
    }

    // eslint-disable-next-line class-methods-use-this
    protected loadModel(): OneModel {
        return PersonModel;
    }

    async save(person: Person): Promise<void> {
        return this.persist(person, { exists: null });
    }
}
