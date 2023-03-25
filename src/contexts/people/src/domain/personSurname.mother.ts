import MotherCreator from '@context/shared/domain/motherCreator.mother';
import PersonSurname from '@src/domain/personSurname';

export default class PersonSurnameMother {
    static create(value: string): PersonSurname {
        return new PersonSurname(value);
    }

    static random(): PersonSurname {
        return PersonSurnameMother.create(MotherCreator.surname());
    }
}
