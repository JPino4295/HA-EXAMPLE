import Query from '@context/shared/domain/queryBus/query';

export type FindPersonQueryParams = {
    name: string;
    surname: string;
};

export default class SearchPersonQuery extends Query {
    readonly name: string;

    readonly surname: string;

    constructor(params: FindPersonQueryParams) {
        super();

        this.name = params.name;
        this.surname = params.surname;
    }
}
