import Drawable from "../drawable.js";
import rand from "../rand.js";

export default class Ball extends Drawable {
    constructor(x,y,radius,game, v = -10, a = 0) {
        super(game);
        //this.disposable = d;
        this.x = x;
        this.y = y;
        //this.ctx = ctx;
        this.radius = radius;
        this.velocity = v;
        this.angle = a;
        //this.fillStyle = d ? '#442211' : '#000000';
    }

    act() {
        //super.act();
        super.move();
        if(this.checkDisappearing())
            this.disappear();
    }

    fillStyle;

    checkDisappearing() {
        return this.y > this.game.height - this.radius * 2;
    }

    get width() {
        return this.radius;
    }

    get height() {
        return this.radius;
    }

    shouldMoveX(xShift) {
        return true;
    }

    shouldMoveY(yShift) {
        return true;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.arc(this.x, this.y, this.radius, 0, 360);
        this.ctx.fill();
    }

    disappear() {
        this.game.drawables.splice(this.game.drawables.indexOf(this), 1);
    }

}
