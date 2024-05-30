import AggregateRoot from '@context/shared/domain/aggregateRoot';
import { Nullable } from '@context/shared/domain/nullable';
import PersonAddress, { PersonAddressPrimitives } from '@src/domain/personAddress/personAddress';
import PersonAge from '@src/domain/personAge';
import PersonName from '@src/domain/personName';
import PersonSurname from '@src/domain/personSurname';

export type PersonPrimitives = {
    name: string;
    surname: string;
    // Optional primitive
    age?: number;
    // Optional primitive
    address?: PersonAddressPrimitives;
};

// This is the most important part of our context, hence should extend AggregateRoot.
// AggregateRoot is a shared class that must be present extending one class in every context.
// It has all the methods needed to work with events, primitives, etc.
// It's important to note that must be only one AggregateRoot per context.
export default class Person extends AggregateRoot {
    // Every property of a Domain Entity must be a Value Object (or extend from one) or another Domain Entity.
    readonly name: PersonName;

    readonly surname: PersonSurname;

    // Since this property can be undefined, we set it as Nullable
    readonly age: Nullable<PersonAge>;

    // Here we have a Domain Entity that is composed of other Value Objects.
    readonly address: Nullable<PersonAddress>;

    constructor(primitives: PersonPrimitives) {
        super();

        this.name = new PersonName(primitives.name);
        this.surname = new PersonSurname(primitives.surname);
        this.age = primitives.age ? new PersonAge(primitives.age) : null;
        this.address = primitives.address ? new PersonAddress(primitives.address) : null;
    }

    toPrimitives(): PersonPrimitives {
        return {
            name: this.name.value,
            surname: this.surname.value,
            age: this.age?.value,
            address: this.address?.toPrimitives()
        };
    }
}
