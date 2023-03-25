import Person, { PersonPrimitives } from '@src/domain/person';
import PersonAddressMother from '@src/domain/personAddress/personAddress.mother';
import PersonAgeMother from '@src/domain/personAge.mother';
import PersonNameMother from '@src/domain/personName.mother';
import PersonSurnameMother from '@src/domain/personSurname.mother';

export default class PersonMother {
    static create(primitives: PersonPrimitives): Person {
        return new Person(primitives);
    }

    static random(overwrites?: Partial<PersonPrimitives>): Person {
        return PersonMother.create({
            name: PersonNameMother.random().value,
            surname: PersonSurnameMother.random().value,
            age: PersonAgeMother.random().value,
            address: PersonAddressMother.random().toPrimitives(),
            ...overwrites
        });
    }
}
