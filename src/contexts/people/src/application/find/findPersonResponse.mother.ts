import { Nullable } from '@context/shared/domain/nullable';
import FindPersonResponse from '@src/application/find/findPersonResponse';
import Person, { PersonPrimitives } from '@src/domain/person';
import PersonMother from '@src/domain/person.mother';

export default class FindPersonResponseMother {
    static create(primitives: Nullable<Person>): FindPersonResponse {
        return new FindPersonResponse(primitives);
    }

    static random(overwrites?: Partial<PersonPrimitives>): FindPersonResponse {
        return FindPersonResponseMother.create(PersonMother.random(overwrites));
    }

    static empty(): FindPersonResponse {
        return FindPersonResponseMother.create(null);
    }
}
