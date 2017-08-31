const {PointLight, Vector3} = require('three');
const {Easing, Events, Trait, Tween} = require('@snakesilk/engine');

class Torch extends Trait
{
    constructor() {
        super();
        this.NAME = 'torch';

        this.intensity = 1;
        this.flicker = .25;
        this.volatility = 1;

        this.lights = [
            new PointLight(),
            new PointLight(),
        ];

        this.origin = new Vector3(0, 0, 20);

        this.lights[0].color.setRGB(0.9, 0.5, 0.4);
        this.lights[0].color.setRGB(1, 0.8, 0.4);

        this.lights.forEach(light => {
            light.intensity = 0.5;
        });
    }

    __attach(host) {
        super.__attach(host);
        this.lights.forEach(light => {
            this._host.model.add(light);
        });
    }

    __detach() {
        this.lights.forEach(light => {
            this._host.model.remove(light);
        });
        super.__detach();
    }

    __timeshift(deltaTime, totalTime) {
        const h = this._host;
        this.lights.forEach(light => {
            light.position.copy(this.origin);
            light.position.x += Math.sin(totalTime * 1.3 * 2) * this.volatility;
            light.position.y += Math.sin(totalTime * 1.7 * 2) * this.volatility;
            light.intensity = this.intensity + ((this.flicker * Math.random()) - this.flicker / 2);
        });

        if (h.move.heading.y) {
            if (h.move.heading.y > 0) {
                this.lights.forEach(light => {
                    light.position.x *= -1;
                });
            }
        }
    }
}

module.exports = Torch;
