import PersonAddressCity from '@src/domain/personAddress/personAddressCity';
import PersonAddressCountry from '@src/domain/personAddress/personAddressCountry';
import PersonAddressStreet from '@src/domain/personAddress/personAddressStreet';
import { Nullable } from '@context/shared/domain/nullable';

export type PersonAddressPrimitives = {
    street?: string;
    city: string;
    country: string;
}

// Since this is only part of the Person Aggregate Root, it doesn't need to extend AggregateRoot.
// Usually (almost always) there is only one aggregate root per context, since each context is created for it
export default class PersonAddress {
    // Not all the properties of a Domain Entity need to be defined always.
    // Sometimes, some properties are optional, and we can use the Nullable type to define them.
    readonly street: Nullable<PersonAddressStreet>;

    readonly city: PersonAddressCity;

    readonly country: PersonAddressCountry;

    constructor(primitives: PersonAddressPrimitives) {
        this.street = primitives.street ? new PersonAddressStreet(primitives.street) : null;
        this.city = new PersonAddressCity(primitives.city);
        this.country = new PersonAddressCountry(primitives.country);
    }

    toPrimitives(): PersonAddressPrimitives {
        return {
            street: this.street?.value ?? undefined,
            city: this.city.value,
            country: this.country.value
        };
    }
}
