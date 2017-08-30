const {Vector2} = require('three');
const {Trait} = require('@snakesilk/engine');

function add(vecA, vecB) {
    vecA.x = vecA.x + vecB.x;
    vecA.y = vecA.y + vecB.y;
    return vecA;
}

function copy(vecA, vecB) {
    vecA.x = vecB.x;
    vecA.y = vecB.y;
    return vecA;
}

class Move extends Trait
{
    constructor() {
        super();

        this.NAME = 'move';

        this._diff = new Vector2();
        this.aim = new Vector2();
        this.speed = 100;
    }

    __timeshift(deltaTime) {
        if (!this._enabled) {
            return;
        }
        copy(this._diff, this.aim).setLength(this.speed * deltaTime);
        add(this._host.position, this._diff);
    }
}

module.exports = Move;
