
/*
const rocket = {
    leftEngine: new Path2D('M0,130 L30,70 L30,0 L0,60 Z'),
    rightEngine: new Path2D('M30,130 L0,70 L0,0 L30,60 Z'),
    body: new Path2D('M Z')
};
*/

$(function () {
    //const canvas = document.getElementById('canvas');//$('#canvas');
    const ctx = canvas.getContext('2d');
    const g = new Game(ctx);
});

function setInt(func, period, timeout) {
    timeout.id = setTimeout(() => {
        func();
        timeout.id = setTimeout(func, period);
    }, period);
}

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        const period = 500;
        this.rocket = new Rocket(this);
        this.asteroids = [];
        this.timer = {};
        setInt(this.draw.bind(this), period, this.timer);
    }

    draw() {
        this.rocket.draw(this.ctx);
    }

}

class IDrawable {
    draw(ctx) {}
}

class Rocket extends IDrawable {
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
    }

    move() {
        this.x += this.velocity * Math.cos(this.angle);
        this.y += this.velocity * Math.sin(this.angle);
    }

    act(iDrawable = undefined) {
        this.move();
    }

    shoot() {

    }
}