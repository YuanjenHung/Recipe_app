import uniqid from 'uniqid';

export default class List {
    constructor () {
        this.items = [];
    }

    addItem(count, ingrediant) {
        const item = {
            id: uniqid(),
            count,
            ingrediant
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateItem(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}