import {SnapshotWithEvents} from '@pigs/shared/event';
import {Aggregate} from '@pigs/shared/base';
import {HouseAbandoned, HouseEvent} from './event';
import {HouseId, Material, Pig, Pigs3} from './vo';

export function blowDown(target: House) {
    try {
        target.handleHurricane();
    } catch (e: any) {
        if (e.message && e.message.startsWith('Cannot destroy a house')) {
            // TODO: retry blow & publish event when failure
        }
    }
}

export interface HouseSnapshot extends SnapshotWithEvents<HouseId> {
    readonly material: Material;
    readonly pigs: Pigs3;
    readonly events: HouseEvent[];
}

export class House implements Aggregate<HouseId, HouseSnapshot> {
    static from({id, material, pigs, events}: HouseSnapshot): House {
        return new House(id, material, pigs, events);
    }

    private eventsToPublish: HouseEvent[] = [];

    constructor(
        private id: HouseId,
        private material: Material,
        private pigs: Pigs3,
        events: HouseEvent[] = []
    ) {
        if (pigs.length > 3) {
            throw Error('No more than 3 pigs allowed in the house');
        }
        this.eventsToPublish.push(...events);
    }

    get snapshot(): HouseSnapshot {
        return {
            id: this.id,
            material: this.material,
            pigs: [...this.pigs],
            events: [...this.eventsToPublish]
        };
    }

    handleHurricane() {
        if (this.material === 'BRICKS') {
            throw Error('Cannot destroy a house from bricks');
        }
        this.eventsToPublish.push(new HouseAbandoned(this.id, [...this.pigs]));
        this.pigs.length = 0;
    }

    runBrainstorming() {
        for (let i = 0; i < this.pigs.length; i++) {
            this.pigs[i] = learnFromMistakes(this.pigs[i]);
        }
    }
}

const learnFromMistakes: (pig: Pig) => Pig = (pig: Pig) => pig === 'LAZY' || pig === 'VERY_LAZY' ? 'NOT_LAZY_ANYMORE' : pig;
