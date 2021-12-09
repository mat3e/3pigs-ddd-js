import {Material, Pigs3, toHouseId} from "../vo";
import {House, HouseSnapshot} from "../model";
import {HouseAbandoned} from "../event";

describe('House', () => {
    it('should restore house from snapshot', () => {
        // given
        const material: Material = 'BRICKS'
        const pigs: Pigs3 = ['VERY_LAZY', 'LAZY']
        const snapshot: HouseSnapshot = {
            id: randomId(),
            material,
            pigs,
            events: []
        }

        // when
        const result = House.from(snapshot);

        // then
        expect(result.snapshot).toEqual(snapshot);
    });

    it('should NOT restore when more than 3 pigs', () => {
        expect(() => House.from({
            id: randomId(),
            material: 'BRICKS',
            pigs: ['LAZY', 'LAZY', 'LAZY', 'LAZY'] as any,
            events: []
        })).toThrow('No more than 3 pigs allowed in the house');
    });

    it('should have smart pigs after a brainstorming session', () => {
        // given
        const house = House.from({
            id: randomId(),
            material: 'BRICKS',
            pigs: ['LAZY', 'NOT_LAZY', 'VERY_LAZY'],
            events: []
        });

        // when
        house.runBrainstorming();

        // then
        expect(house.snapshot.pigs).toEqual(expect.arrayContaining(['NOT_LAZY_ANYMORE', 'NOT_LAZY']));
    });

    it.each<Material>(['STRAW', 'WOOD'])('should get blown down when from %s', (material: Material) => {
        // given
        const before = new Date();
        const house = House.from({
            id: randomId(),
            material,
            pigs: ['LAZY'],
            events: []
        });

        // when
        house.handleHurricane();

        // then
        expect(house.snapshot.pigs).toHaveLength(0);
        expect(house.snapshot.events).toHaveLength(1);
        expect(house.snapshot.events[0].occurredOn.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(house.snapshot.events[0]).toBeInstanceOf(HouseAbandoned);
        expect((house.snapshot.events[0] as HouseAbandoned).refugees).toHaveLength(1);
        expect((house.snapshot.events[0] as HouseAbandoned).refugees).toContain('LAZY');
    });

    it('should NOT get blown down when from BRICKS', () => {
        expect(
            () => House.from({
                id: randomId(),
                material: 'BRICKS',
                pigs: ['LAZY'],
                events: []
            }).handleHurricane()
        ).toThrow('Cannot destroy a house from bricks');
    });
});

const randomId = () => toHouseId(Math.random());