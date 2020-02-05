import Drawable from "./drawable.js";

export default class Rocket extends Drawable {
    constructor(game) {
        super(game);
        this.width = 22.5;
        this.height = 67.5;
    }

    lives = 5;
    bullets = 5;

    drawLeftEngine() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FF1111';
        this.ctx.moveTo(0, this.height);
        this.ctx.lineTo( this.width / 4,  this.height - this.width / 2);
        this.ctx.lineTo( this.width / 4,  (this.height - this.width / 2) / 3);
        this.ctx.lineTo( 0,  this.height - 2 * (this.height - this.width / 2) / 3);
        this.ctx.fill();
    }

    drawRightEngine() {
        this.ctx.beginPath();
        this.ctx.moveTo( this.width,  this.height);
        this.ctx.lineTo( this.width * 0.75,  this.height - this.width / 2);
        this.ctx.lineTo( this.width * 0.75,  (this.height - this.width / 2) / 3);
        this.ctx.lineTo( this.width,  this.height - 2 * (this.height - this.width / 2) / 3);//80
        this.ctx.fill();
    }

    drawBody() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#050505';
        this.ctx.moveTo( this.width / 2,  0);
        this.ctx.lineTo( this.width * 0.75, (this.height - this.width / 2) / 6);
        this.ctx.lineTo( this.width * 0.75, this.height - this.width / 2);
        this.ctx.lineTo(this.width / 4,  this.height - this.width / 2);
        this.ctx.lineTo( this.width / 4, (this.height - this.width / 2) / 6);
        this.ctx.fill();
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        //ctx.tr
        this.drawLeftEngine();
        this.drawRightEngine();
        this.drawBody();
        this.ctx.restore();
    }

/*
    speedup() {
        this.velocity += 10;
    }*/

/*
    goBack() {
        if(this.velocity > -20)
            this.velocity -= 0.2;
    }
*/
    shoot() {

    }
}