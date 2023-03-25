import MotherCreator from '@context/shared/domain/motherCreator.mother';
import CreatePersonCommand, { CreatePersonCommandParams } from '@src/application/create/createPersonCommand';
import Person from '@src/domain/person';
import PersonAddressCityMother from '@src/domain/personAddress/personAddressCity.mother';
import PersonAddressCountryMother from '@src/domain/personAddress/personAddressCountry.mother';
import PersonAddressStreetMother from '@src/domain/personAddress/personAddressStreet.mother';
import PersonAgeMother from '@src/domain/personAge.mother';
import PersonNameMother from '@src/domain/personName.mother';
import PersonSurnameMother from '@src/domain/personSurname.mother';

export default class CreatePersonCommandMother {
    static create(params: CreatePersonCommandParams): CreatePersonCommand {
        return new CreatePersonCommand(params);
    }

    static random(overwrites?: Partial<CreatePersonCommandParams>): CreatePersonCommand {
        return CreatePersonCommandMother.create({
            name: PersonNameMother.random().value,
            surname: PersonSurnameMother.random().value,
            age: PersonAgeMother.random().value,
            street: MotherCreator.boolean() ? PersonAddressStreetMother.random().value : undefined,
            country: PersonAddressCountryMother.random().value,
            city: PersonAddressCityMother.random().value,
            ...overwrites
        });
    }

    static fromPerson(person: Person): CreatePersonCommand {
        return CreatePersonCommandMother.create({
            name: person.name.value,
            surname: person.surname.value,
            age: person.age.value,
            ...person.address.toPrimitives()
        });
    }
}
