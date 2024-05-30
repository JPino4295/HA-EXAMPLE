import MotherCreator from '@context/shared/domain/motherCreator.mother';
import PersonAddressStreet from '@src/domain/personAddress/personAddressStreet';

export default class PersonAddressStreetMother {
    static create(value: string): PersonAddressStreet {
        return new PersonAddressStreet(value);
    }

    static random(): PersonAddressStreet {
        return PersonAddressStreetMother.create(MotherCreator.street());
    }
}
