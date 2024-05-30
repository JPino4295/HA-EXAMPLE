import SearchPersonQuery, { SearchPersonQueryParams } from '@src/application/search/searchPersonQuery';
import PersonNameMother from '@src/domain/personName.mother';
import PersonSurnameMother from '@src/domain/personSurname.mother';

export default class SearchPersonQueryMother {
    static create(primitives: SearchPersonQueryParams): SearchPersonQuery {
        return new SearchPersonQuery(primitives);
    }

    static random(overwrites?: Partial<SearchPersonQueryParams>): SearchPersonQuery {
        return SearchPersonQueryMother.create({
            name: PersonNameMother.random().value,
            surname: PersonSurnameMother.random().value,
            ...overwrites
        });
    }
}
