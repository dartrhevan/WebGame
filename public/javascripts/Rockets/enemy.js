import Rocket from "./rocket.js";
import rand from "../rand.js";
import Piece from "../Balls/piece.js";

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
        const radius = 2.5;
        const size = rand(8) +7;
        for(let i = 0; i < size; i++)
            this.game.staticDrawables.push(new Piece(this.x + this.width / 2, this.y - this.height / 2, radius, this.game, -15, rand(Math.PI * 2)));

    }

    shouldMoveY(yShift) {
        return true;//this.y - yShift > 0 && this.y - yShift < this.game.height;
    }

}
