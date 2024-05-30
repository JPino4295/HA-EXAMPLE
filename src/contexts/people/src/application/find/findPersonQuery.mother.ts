import FindPersonQuery, { SearchPersonQueryParams } from '@src/application/search/searchPersonQuery';
import PersonNameMother from '@src/domain/personName.mother';
import PersonSurnameMother from '@src/domain/personSurname.mother';

export default class FindPersonQueryMother {
    static create(primitives: SearchPersonQueryParams): FindPersonQuery {
        return new FindPersonQuery(primitives);
    }

    static random(overwrites?: Partial<SearchPersonQueryParams>): FindPersonQuery {
        return FindPersonQueryMother.create({
            name: PersonNameMother.random().value,
            surname: PersonSurnameMother.random().value,
            ...overwrites
        });
    }
}
