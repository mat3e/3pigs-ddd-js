import {EntitySnapshot} from './vo';

export interface DomainRepository<ID, T extends Aggregate<ID, EntitySnapshot<ID>>> {
    findById(id: ID): T | null;

    save(aggregate: T): T;
}

export interface Aggregate<ID, T extends EntitySnapshot<ID>> extends DomainEntity<ID, T> {
}

export interface DomainEntity<ID, T extends EntitySnapshot<ID>> {
    get snapshot(): T;
}
