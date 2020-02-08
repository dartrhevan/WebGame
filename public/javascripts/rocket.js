import Drawable from "./drawable.js";
import Asteroid from "./asteroid.js";
import Bullet from "./bullet.js";

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
    rotate() {
        if(this.turningLeft)
            this.turn(-0.06);
        else if(this.turningRight)
            this.turn(0.06);
    }

    turn(a) {
        this.angle += a;
    }

    act() {
        if(Math.abs(this.velocity) >= 0.01)
            this.rotate();
        this.move();
        if((this.moving || this.turningRight || this.turningLeft) && this.velocity < 12 && !this.goBack)
            this.velocity += 0.5;
        else if(this.velocity > -12)
            if(this.goBack || this.turningRight || this.turningLeft)
                this.velocity -= 0.5;
            else if(this.velocity > 0)
                this.velocity -= 0.25;
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

    checkIntersection(drawable) {
        const x = this.x * Math.cos(this.angle) + this.y * Math.sin(this.angle);
        const y = -this.x * Math.sin(this.angle) + this.y * Math.cos(this.angle);
        const dx = drawable.x * Math.cos(this.angle) + drawable.y * Math.sin(this.angle);
        const dy = -drawable.x * Math.sin(this.angle) + drawable.y * Math.cos(this.angle);
        const cx = x + this.width / 2;
        const cy = y + this.height / 2;
        if(drawable instanceof Asteroid)
            return Math.abs(cx - dx ) <= drawable.radius + this.width / 2 &&
                Math.abs(cy - dy ) <= drawable.radius + this.height / 2;
            /*
            return (x < cx ? (cy < y ? x + this.width >= x - drawable.radius && cy + drawable.radius >= y :
                x + this.width >= x - drawable.radius && cy + drawable.radius <= y + this.height) :
                (y > cy ? x <= cx + drawable.radius && cy + drawable.radius >= y :
                    cy + drawable.radius <= y + this.height &&  x <= cx + drawable.radius));*/
    }
/*
    isAbove(x,y, cx, cy, r) {
        return
    }

    isBellow(x,y, cx, cy, r) {

    }

    isLefter(x,y, cx, cy, r) {

    }

    isRighter(x,y, cx, cy, r) {

    }
    */
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

    interact(drawable) {
        if(drawable instanceof Asteroid)
        {
            this.lives--;
            drawable.disappear();
            //alert(this.lives);
            l.innerHTML = this.lives;
        }
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
        this.game.bullets.push(new Bullet(this.x + this.width / 2, this.y, 3, this.game, false, 17, this.angle))
    }
}