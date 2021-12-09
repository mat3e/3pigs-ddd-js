import {EntitySnapshot} from './vo';
import {Aggregate, DomainRepository} from './base';

export interface DomainEventPublisher {
    publish(event: DomainEvent): void;
}

export interface DomainEvent {
    readonly occurredOn: Date;
}

export abstract class EventsDrivenRepository<ID, T extends Aggregate<ID, SnapshotWithEvents<ID>>> implements DomainRepository<ID, T> {
    abstract findById(id: ID): T | null;

    abstract append(events: DomainEvent[]): T;

    save(aggregate: T): T {
        return this.append(aggregate.snapshot.events);
    }
}

export interface SnapshotWithEvents<ID> extends EntitySnapshot<ID> {
    readonly events: DomainEvent[];
}
