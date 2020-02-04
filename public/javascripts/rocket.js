
class IDrawable {
    draw(ctx) {}
}

export default class Rocket extends IDrawable {
    constructor(game) {
        super();
        this.game = game;
    }
    x = 0;
    y = 600;
    velocity = 0;
    angle = 0;
    turningRight = false;
    turningLeft = false;
    moving = false;
    draw(ctx = this.game.ctx) {
        //left engine
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        //ctx.tr
        ctx.beginPath();
        ctx.fillStyle = '#FF1111';
        ctx.moveTo(0, 180);
        ctx.lineTo( 15,  150);
        ctx.lineTo( 15,  50);
        ctx.lineTo( 0,  80);
        ctx.fill();
        //right engine
        ctx.beginPath();
        ctx.moveTo( 80,  180);
        ctx.lineTo( 65,  150);
        ctx.lineTo( 65,  50);
        ctx.lineTo( 80,  80);
        ctx.fill();
        //body
        ctx.beginPath();
        ctx.fillStyle = '#050505';
        ctx.moveTo( 40,  0);
        ctx.lineTo( 65, 25);
        ctx.lineTo( 65, 150);
        ctx.lineTo(15,  150);
        ctx.lineTo( 15, 25);
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.velocity * Math.sin(this.angle);
        this.y -= this.velocity * Math.cos(this.angle);
    }

    rotate() {
        if(this.turningLeft)
            this.turn(-0.02);
        else if(this.turningRight)
            this.turn(0.02);
    }

    act(iDrawable = undefined) {
        if(this.velocity >= 0.01)
            this.rotate();
        this.move();
        if(this.moving)
            this.velocity += 0.2;
        else if(this.velocity > 0)
            this.velocity -= 0.2;
    }

    speedup() {
        this.velocity += 10;
    }

    turn(a) {
        this.angle += a;
    }

    shoot() {

    }
}