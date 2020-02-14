import Ball from "./ball.js";

export class Bonus extends Ball {
    constructor(...args) {
        super(...args);
    }

    interact(drawable) {
        this.disappear();
    }

    draw() {
        super.draw();
        this.ctx.save();
        this.ctx.font = "25px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(this.text, this.x, this.y + this.radius / 2);
        this.ctx.restore();
    }

    fillStyle = '#BEDD44';
    text = '';
}

export class LifeBonus extends Bonus {
    constructor(...args) {
        super(...args);
    }
    interact(rocket) {
        super.interact(rocket);
        rocket.lives++;
    }
    text='L';
}

export class ScoreBonus extends Bonus {
    constructor(...args) {
        super(...args);
    }
    interact(rocket) {
        super.interact(rocket);
        rocket.scores += 3;
    }
    text='3';
}

export class BulletBonus extends Bonus {
    constructor(...args) {
        super(...args);
    }
    interact(rocket) {
        super.interact(rocket);
        rocket.bullets += 5;
    }
    text='B';
}
