import MotherCreator from '@context/shared/domain/motherCreator.mother';
import PersonName from '@src/domain/personName';

export default class PersonNameMother {
    static create(value: string): PersonName {
        return new PersonName(value);
    }

    static random(): PersonName {
        return PersonNameMother.create(MotherCreator.firstName());
    }
}
