import Rocket from "./rocket.js";
import rand from "../rand.js";

export default class Enemy extends Rocket {

    constructor(x, y, game, v) {
        super(game);
        this.velocity = v;
        this.x = x;
        this.y = y;
        this.angle = Math.PI;
    }

    act() {
        super.act();
        if(!(rand() % 15))
            super.shoot();
        if(this.y > this.game.height)
            this.disappear();
    }

    shouldMoveX(xShift) {
        return false;//this.x + xShift> 0 && this.x + xShift  < this.game.width;
    }

    disappear() {
        this.game.drawables.splice(this.game.drawables.indexOf(this), 1);
        this.game.rocket.scores++;
    }

    shouldMoveY(yShift) {
        return true;//this.y - yShift > 0 && this.y - yShift < this.game.height;
    }

}
