import Ball from "./ball.js";

export class Bonus extends Ball {
    constructor(...args) {
        super(...args);
    }

    interact(drawable) {
        this.disappear();
    }
    fillStyle = '#BEDD44';
}

export class LifeBonus extends Bonus {
    constructor(...args) {
        super(...args);
    }
    interact(rocket) {
        super.interact(rocket);
        rocket.lives++;
    }
}

export class ScoreBonus extends Bonus {
    constructor(...args) {
        super(...args);
    }
    interact(rocket) {
        super.interact(rocket);
        rocket.scores += 3;
    }
}