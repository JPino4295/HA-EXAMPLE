import Query from '@context/shared/domain/queryBus/query';

export type SearchPersonQueryParams = {
    name: string;
    surname: string;
};

export default class SearchPersonQuery extends Query {
    readonly name: string;

    readonly surname: string;

    constructor(params: SearchPersonQueryParams) {
        super();

        this.name = params.name;
        this.surname = params.surname;
    }
}
