import Asteroid from "./asteroid.js";

export default class Bullet extends Asteroid
{
    checkDisappearing() {
        return this.x < 0 || this.x > this.game.width || this.y <  0 || this.y > this.game.height;
    }
    constructor(...args) {
        super(...args);
    }

    disappear() {
        this.game.bullets.splice(this.game.drawables.indexOf(this), 1);
    }

    checkIntersection(drawable) {
        if(drawable instanceof Asteroid)
            return Math.sqrt(((this.x - drawable.x) ** 2 + (this.y - drawable.y) ** 2)) < this.radius + drawable.radius;
    }

    interact(drawable)
    {
        if(drawable instanceof Asteroid) {
            drawable.disappear();
            this.disappear();
        }
    }

    fillStyle = '#AA0000';
}