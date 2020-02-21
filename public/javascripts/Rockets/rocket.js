import Drawable from "../drawable.js";
import Asteroid from "../Balls/asteroid.js";
import Bullet from "../Balls/bullet.js";
import {LifeBonus, ScoreBonus, Bonus} from "../Balls/bonus.js";
import Ball from "../Balls/ball.js";
import rotatePoint from "./rotate.js";

export default class Rocket extends Drawable {
    constructor(game) {
        super(game);
        this.width = 22.5;
        this.height = 67.5;
    }

    turningRight = false;
    turningLeft = false;
    goBack = false;
    moving = false;

    getPoints() {
        const basePoint = rotatePoint(this.x, this.y, this.angle);
        const rightAbove = {x: basePoint.x + this.width, y: basePoint.y };
        const rightBelow = {x: basePoint.x + this.width, y: basePoint.y + this.height};
        const below = {x: basePoint.x, y: basePoint.y + this.height};
        return [rotatePoint(basePoint.x, basePoint.y, -this.angle), rotatePoint(below.x, below.y, -this.angle),
            rotatePoint(rightAbove.x, rightAbove.y, -this.angle), rotatePoint(rightBelow.x, rightBelow.y, - this.angle) ];
    }

    checkBallIntersection(xb, yb, radius) {
        const {x, y} = rotatePoint(this.x, this.y, this.angle);
        const t = rotatePoint(xb, yb, this.angle);
        const dx = t.x, dy = t.y;
        const cx = x + this.width / 2;
        const cy = y + this.height / 2;
        return Math.abs(cx - dx) <= radius + this.width / 2 &&
            Math.abs(cy - dy) <= radius + this.height / 2;
    }

    checkRocketIntersection(drawable)
    {
        const ch = ({x, y}) => this.checkBallIntersection(x, y, 1);
        return drawable.getPoints().some(ch.bind(this));// || this.getPoints().some(ch.bind(drawable));
    }

    checkIntersection(drawable) {
        if(drawable instanceof Ball)
            return this.checkBallIntersection(drawable.x, drawable.y, drawable.radius);
        else if (drawable instanceof Rocket)
            return this.checkRocketIntersection(drawable);
    }

    interact(drawable) {
        if(drawable instanceof Bonus)
            drawable.interact(this);
        else if(drawable instanceof Ball || drawable instanceof Rocket)
        {
            this.lives--;
            drawable.disappear();
            $('#lives').html(this.lives);
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

    shoot() {
        const radius = 3;
        const {x, y} = rotatePoint(this.x, this.y, this.angle);
        const bp = rotatePoint(x + this.width / 2, y - radius - 3, -this.angle);
        this.game.bullets.push(new Bullet(bp.x, bp.y, radius, this.game, Math.max(2 * this.velocity, 20), this.angle));
    }
}
