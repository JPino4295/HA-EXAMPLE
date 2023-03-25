import MotherCreator from '@context/shared/domain/motherCreator.mother';
import PersonAddressCity from '@src/domain/personAddress/personAddressCity';

export default class PersonAddressCityMother {
    static create(value: string): PersonAddressCity {
        return new PersonAddressCity(value);
    }

    static random(): PersonAddressCity {
        return PersonAddressCityMother.create(MotherCreator.city());
    }
}
