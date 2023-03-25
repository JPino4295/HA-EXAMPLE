import MotherCreator from '@context/shared/domain/motherCreator.mother';
import PersonAge from '@src/domain/personAge';

export default class PersonAgeMother {
    static create(value: number): PersonAge {
        return new PersonAge(value);
    }

    static random(): PersonAge {
        return PersonAgeMother.create(MotherCreator.age());
    }
}
