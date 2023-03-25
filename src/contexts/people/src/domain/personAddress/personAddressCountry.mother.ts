import MotherCreator from '@context/shared/domain/motherCreator.mother';
import PersonAddressCountry from '@src/domain/personAddress/personAddressCountry';

export default class PersonAddressCountryMother {
    static create(value: string): PersonAddressCountry {
        return new PersonAddressCountry(value);
    }

    static random(): PersonAddressCountry {
        return PersonAddressCountryMother.create(MotherCreator.country());
    }
}
