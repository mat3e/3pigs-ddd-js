const aggregates = new Map();

module.exports = {
    save(aggregate) {
        if (!aggregate.id) {
            aggregate.id = Math.random();
        }
        aggregates.set(aggregate.id, aggregate);
        return aggregate;
    },
    findById(id) {
        return aggregates.get(id);
    }
};