
class IDrawable {
    draw(ctx) {}
}

export default class Rocket extends IDrawable {
    constructor(game) {
        super();
        this.game = game;
    }
    x = 0;
    y = 0;
    velocity = 0;
    angle = 0;
    draw(ctx = this.game.ctx) {
        //left engine
        ctx.save();
        ctx.rotate(this.angle);
        //ctx.tr
        ctx.beginPath();
        ctx.fillStyle = '#FF1111';
        ctx.moveTo(this.x + 0, this.y + 180);
        ctx.lineTo(this.x + 15, this.y + 150);
        ctx.lineTo(this.x + 15, this.y + 50);
        ctx.lineTo(this.x + 0, this.y + 80);
        ctx.fill();
        //right engine
        ctx.beginPath();
        ctx.moveTo(this.x + 80, this.y + 180);
        ctx.lineTo(this.x + 65, this.y + 150);
        ctx.lineTo(this.x + 65, this.y + 50);
        ctx.lineTo(this.x + 80, this.y + 80);
        ctx.fill();
        //body
        ctx.beginPath();
        ctx.fillStyle = '#050505';
        ctx.moveTo(this.x + 40, this.y + 0);
        ctx.lineTo(this.x + 65, this.y + 25);
        ctx.lineTo(this.x + 65, this.y + 150);
        ctx.lineTo(this.x + 15, this.y + 150);
        ctx.lineTo(this.x + 15, this.y + 25);
        ctx.fill();
        ctx.restore();
    }

    move() {
        this.x += this.velocity * Math.cos(this.angle);
        this.y += this.velocity * Math.sin(this.angle);
    }

    act(iDrawable = undefined) {
        this.move();
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