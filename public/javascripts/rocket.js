import Drawable from "./drawable.js";
import Asteroid from "./Balls/asteroid.js";
import Bullet from "./Balls/bullet.js";
import {LifeBonus, ScoreBonus, Bonus} from "./Balls/bonus.js";
import Ball from "./Balls/ball.js";

export default class Rocket extends Drawable {
    constructor(game) {
        super(game);
        this.width = 22.5;
        //this.velocity = 15;
        this.height = 67.5;
        //this.angle = Math.PI;
    }

    turningRight = false;
    turningLeft = false;
    goBack = false;
    moving = false;


    checkIntersection(drawable) {

        const x = this.x * Math.cos(this.angle) + this.y * Math.sin(this.angle);
        const y = -this.x * Math.sin(this.angle) + this.y * Math.cos(this.angle);
        const dx = drawable.x * Math.cos(this.angle) + drawable.y * Math.sin(this.angle);
        const dy = -drawable.x * Math.sin(this.angle) + drawable.y * Math.cos(this.angle);
        const cx = x + this.width / 2;
        const cy = y + this.height / 2;
        if(drawable instanceof Ball) {/*
            const x = this.x * Math.cos(this.angle) + this.y * Math.sin(this.angle);
            const y = -this.x * Math.sin(this.angle) + this.y * Math.cos(this.angle);
            const dx = drawable.x * Math.cos(this.angle) + drawable.y * Math.sin(this.angle);
            const dy = -drawable.x * Math.sin(this.angle) + drawable.y * Math.cos(this.angle);
            const cx = x + this.width / 2;
            const cy = y + this.height / 2;*/
            return Math.abs(cx - dx) <= drawable.radius + this.width / 2 &&
                Math.abs(cy - dy) <= drawable.radius + this.height / 2;
        }
        else if (drawable instanceof Rocket) {/*
            const x = this.x * Math.cos(this.angle) + this.y * Math.sin(this.angle);
            const y = -this.x * Math.sin(this.angle) + this.y * Math.cos(this.angle);
            const cx = x + this.width / 2;
            const cy = y + this.height / 2;

            const x2 = drawable.x * Math.cos(this.angle) + drawable.y * Math.sin(this.angle);
            const y2 = -drawable.x * Math.sin(this.angle) + drawable.y * Math.cos(this.angle);*/
            const cx2 = dx + drawable.width / 2;
            const cy2= dy + drawable.height / 2;
            return Math.sqrt((cx- cx2) ** 2 + (cy - cy2) ** 2) <= this.height;
        }

    }

    interact(drawable) {
        if(drawable instanceof Bonus)
            drawable.interact(this);
        else if(drawable instanceof Ball || drawable instanceof Rocket)
        {
            this.lives--;
            drawable.disappear();
            l.innerHTML = this.lives;
        }
    }

    act() {
        this.move();
    }

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
    interact(drawable) {
        if(drawable instanceof Bonus)
            drawable.interact(this);
        else if(drawable instanceof Ball)
        {
            this.lives--;
            drawable.disappear();
            //alert(this.lives);
            l.innerHTML = this.lives;
        }
    }*/

    shoot() {
        this.game.bullets.push(new Bullet(this.x + this.width / 2, this.y, 3, this.game, 17, this.angle));
        //this.bullets--;
    }
}
