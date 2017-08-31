const {Trait} = require('@snakesilk/engine');

const X = new Map([
    [-1, 'w'],
    [ 1, 'e'],
    [ 0, '' ],
]);

const Y = new Map([
    [-1, 's'],
    [ 1, 'n'],
    [ 0, '' ],
]);

function getHeading(vec2) {
    return Y.get(vec2.y) + X.get(vec2.x);
}

class AnimationRouter extends Trait
{
    constructor() {
        super();
        this.NAME = 'animationRouter';
        this.current = null;
    }

    getHeading() {
        return getHeading(this._host.move.heading);
    }

    getAnimationName(host) {
        const heading = this.getHeading();
        if (host.move.aim.lengthSq()) {
            return 'walk-' + heading;
        } else {
            return 'idle-' + heading;
        }
    }

    __timeshift(deltaTime) {
        const host = this._host;
        const name = this.getAnimationName(host);
        if (name !== this.current && host.animations.has(name)) {
            host.setAnimation(name);
            this.current = name;
        }
    }
}

module.exports = AnimationRouter;
