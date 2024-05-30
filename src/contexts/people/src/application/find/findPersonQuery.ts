import Query from '@context/shared/domain/queryBus/query';

// We use specific params to find the person
export type FindPersonQueryParams = {
    name: string;
    surname: string;
};

// Queries and commands always have properties that are primitives.
// This is because the commands and the queries are wrappers for the information the application needs to receive
export default class SearchPersonQuery extends Query {
    readonly name: string;

    readonly surname: string;

    constructor(params: FindPersonQueryParams) {
        super();

        this.name = params.name;
        this.surname = params.surname;
    }
}
