import Asteroid from "./asteroid.js";
import Ball from "./ball.js";
import Rocket from "../Rockets/rocket.js";

export default class Bullet extends Ball
{
    checkDisappearing() {
        return this.x < 0 || this.x > this.game.width || this.y <  0 || this.y > this.game.height;
    }

    constructor(...args) {
        super(...args);
    }

    disappear() {
        console.log('BD');
        this.game.bullets.splice(this.game.bullets.indexOf(this), 1);
    }

    checkIntersection(drawable) {
        if(drawable instanceof Asteroid)
            return Math.sqrt(((this.x - drawable.x) ** 2 + (this.y - drawable.y) ** 2)) < this.radius + drawable.radius;
        else if(drawable instanceof Rocket)
            return drawable.checkIntersection(this);
    }

    interact(drawable)
    {
        if(drawable instanceof Asteroid || drawable instanceof Rocket) {
            if(drawable.disposable || drawable instanceof Rocket)
                drawable.disappear();
            this.disappear();
        }
    }

    fillStyle = '#AA0000';
}
