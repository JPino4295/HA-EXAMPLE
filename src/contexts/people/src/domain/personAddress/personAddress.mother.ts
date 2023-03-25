import PersonAddress, { PersonAddressPrimitives } from '@src/domain/personAddress/personAddress';
import PersonAddressCityMother from '@src/domain/personAddress/personAddressCity.mother';
import PersonAddressCountryMother from '@src/domain/personAddress/personAddressCountry.mother';
import PersonAddressStreetMother from '@src/domain/personAddress/personAddressStreet.mother';

export default class PersonAddressMother {
    static create(primitives: PersonAddressPrimitives): PersonAddress {
        return new PersonAddress(primitives);
    }

    static random(overwrites?: Partial<PersonAddressPrimitives>): PersonAddress {
        return PersonAddressMother.create({
            street: PersonAddressStreetMother.random().value,
            country: PersonAddressCountryMother.random().value,
            city: PersonAddressCityMother.random().value,
            ...overwrites
        });
    }
}
