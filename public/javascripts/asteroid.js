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

    act(iDrawable = undefined) {
        super.act(iDrawable);
        const ind =this.game.asteroids.indexOf(this);
        if(this.y > this.game.height - this.radius * 2)
             this.game.asteroids.splice(ind/*this.game.asteroids.indexOf(this)*/, 1);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.arc(this.x, this.y, this.radius, 0, 360);
        this.ctx.fill();
    }
}