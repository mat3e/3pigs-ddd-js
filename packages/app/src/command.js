export class BuildHouse {
    #owner;

    constructor(owner) {
        this.#owner = owner;
    }

    get owner() {
        return this.#owner;
    }
}

export class BlowDown {
    #id;

    constructor(id) {
        this.#id = id;
    }

    get id() {
        return this.#id;
    }
}
