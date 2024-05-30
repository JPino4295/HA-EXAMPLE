import Person, { PersonPrimitives } from '@src/domain/person';
import { Response } from '@context/shared/domain/queryBus/response';
import { Nullable } from '@context/shared/domain/nullable';

export default class SearchPersonResponse implements Response {
    readonly person?: PersonPrimitives;

    constructor(person: Nullable<Person>) {
        this.person = person?.toPrimitives();
    }
}
