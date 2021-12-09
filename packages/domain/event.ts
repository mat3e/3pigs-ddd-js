import {DomainEvent} from '@pigs/shared/event';
import {HouseId, Pigs3} from './vo';

export interface HouseEvent extends DomainEvent {
    readonly house: HouseId;
}

export class HouseAbandoned implements HouseEvent {
    constructor(readonly house: HouseId, readonly refugees: Pigs3, readonly occurredOn = new Date()) {
    }
}
