import PersonSearcher from '@src/application/search/personSearcher';
import SearchPersonQuery from '@src/application/search/searchPersonQuery';
import SearchPersonResponse from '@src/application/search/searchPersonResponse';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';

export default class SearchPersonQueryHandler
implements QueryHandler<SearchPersonQuery, SearchPersonResponse> {
    private searcher: PersonSearcher;

    constructor(searcher: PersonSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo() {
        return SearchPersonQuery;
    }

    async handle(query: SearchPersonQuery): Promise<SearchPersonResponse> {
        return this.searcher.run(query);
    }
}
