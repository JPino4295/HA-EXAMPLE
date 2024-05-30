import Person, { PersonPrimitives } from '@src/domain/person';
import { Response } from '@context/shared/domain/queryBus/response';
import { Nullable } from '@context/shared/domain/nullable';

// Responses, as the queries, work with primitives
export default class SearchPersonResponse implements Response {
    readonly person?: PersonPrimitives;

    // Responses tend to receive Domain Entities, and then mapping them internally
    constructor(person: Nullable<Person>) {
        this.person = person?.toPrimitives();
    }
}
