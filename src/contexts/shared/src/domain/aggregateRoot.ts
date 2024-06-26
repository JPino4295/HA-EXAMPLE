import { DomainEvent } from '@src/domain/eventBus/domainEvent';

export default abstract class AggregateRoot {
    private domainEvents: Array<DomainEvent>;

    constructor() {
        this.domainEvents = [];
    }

    pullDomainEvents(): Array<DomainEvent> {
        const { domainEvents } = this;

        this.domainEvents = [];

        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    abstract toPrimitives(): unknown;
}
