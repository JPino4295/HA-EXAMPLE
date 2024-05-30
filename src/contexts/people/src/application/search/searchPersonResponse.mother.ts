import { Nullable } from '@context/shared/domain/nullable';
import SearchPersonResponse from '@src/application/search/searchPersonResponse';
import Person, { PersonPrimitives } from '@src/domain/person';
import PersonMother from '@src/domain/person.mother';

export default class SearchPersonResponseMother {
    static create(primitives: Nullable<Person>): SearchPersonResponse {
        return new SearchPersonResponse(primitives);
    }

    static random(overwrites?: Partial<PersonPrimitives>): SearchPersonResponse {
        return SearchPersonResponseMother.create(PersonMother.random(overwrites));
    }

    static empty(): SearchPersonResponse {
        return SearchPersonResponseMother.create(null);
    }
}
