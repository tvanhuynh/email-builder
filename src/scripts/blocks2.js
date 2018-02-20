/**
 * Create class for email blocks
*/

exports.create = (...args) => {
    return new Block(...args);
}

class Block {
    constructor(id, description, style, content) {
        console.log(id)
        this.id = id;
        this.test = () => {
            return false;
        }
    }
}