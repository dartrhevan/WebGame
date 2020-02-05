import Drawable from "./drawable.js";

export default class Asteroid extends Drawable {
    constructor(x,y,radius,game) {
        super(game);
        this.x = x;
        this.y = y;
        //this.ctx = ctx;
        this.radius = radius;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.arc(this.x, this.y, this.radius, 0, 360);
        this.ctx.fill();
    }
}