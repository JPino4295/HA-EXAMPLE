import MotherCreator from '@src/shared/domain/motherCreator.mother';

export default class PersonAddressStreetMother {
    static create(value: string): PersonAddressStreet {
        return new PersonAddressStreet(value);
    }

    static random(): PersonAddressStreet {
        return PersonAddressStreetMother.create(MotherCreator.street());
    }
}
