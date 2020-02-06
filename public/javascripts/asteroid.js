import Drawable from "./drawable.js";

export default class Asteroid extends Drawable {
    constructor(x,y,radius,game) {
        super(game);
        this.x = x;
        this.y = y;
        //this.ctx = ctx;
        this.radius = radius;
        this.velocity = -10;
    }

    act() {
        //super.act();
        super.move();
        if(this.y > this.game.height - this.radius * 2)
            this.disappear();
    }

    get width() {
        return this.radius;
    }

    get height() {
        return this.radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.arc(this.x, this.y, this.radius, 0, 360);
        this.ctx.fill();
    }

    disappear() {
        this.game.asteroids.splice(this.game.asteroids.indexOf(this), 1);
    }
}