import {blowDown, House} from "@pigs/domain/model";
import {EMPTY_HOUSE_ID} from "@pigs/domain/vo";

export function handle(command, repository) {
    switch (true) {
        // BuildHouse
        case command.owner:
            // TODO: factory in domain
            const newHouse = repository.save(new House(
                EMPTY_HOUSE_ID,
                chooseMaterial(command.owner),
                [command.owner]
            ));
            return newHouse.snapshot.id;
        // BlowDown
        case command.id:
            const house = repository.findById(command.id);
            blowDown(house);
            repository.save(house);
            return house.snapshot.id;
    }
}

// TODO: policy in domain
const chooseMaterial = owner => {
    switch (owner) {
        case 'VERY_LAZY':
            return 'STRAW';
        case 'LAZY':
            return 'WOOD'
        default:
            return 'BRICKS'
    }
}
