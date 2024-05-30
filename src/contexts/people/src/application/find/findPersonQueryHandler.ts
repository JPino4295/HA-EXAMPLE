import PersonFinder from '@src/application/find/personFinder';
import FindPersonQuery from '@src/application/find/findPersonQuery';
import FindPersonResponse from '@src/application/find/findPersonResponse';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';

export default class FindPersonQueryHandler
implements QueryHandler<FindPersonQuery, FindPersonResponse> {
    private finder: PersonFinder;

    constructor(finder: PersonFinder) {
        this.finder = finder;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo() {
        return FindPersonQuery;
    }

    async handle(query: FindPersonQuery): Promise<FindPersonResponse> {
        return this.finder.run(query);
    }
}
