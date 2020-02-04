
/*
const rocket = {
    leftEngine: new Path2D('M0,130 L30,70 L30,0 L0,60 Z'),
    rightEngine: new Path2D('M30,130 L0,70 L0,0 L30,60 Z'),
    body: new Path2D('M Z')
};
*/
import Rocket from "./rocket.js";

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
        const period = 50;
        this.rocket = new Rocket(this);
        this.asteroids = [];
        this.timer = {};
        setInterval(this.act.bind(this), period);
        window.onkeydown = ev => {
            switch (ev.key) {
                case 'a':
                    this.rocket.turningLeft = true;
                    break;
                case 'd':
                    this.rocket.turningRight = true;
                    break;
                case 'w':
                    this.rocket.velocity = 10;
                    break;
            }
        };
        window.onkeyup = ev => {
            switch (ev.key) {
                case 'a':
                    this.rocket.turningLeft = false;
                    break;
                case 'd':
                    this.rocket.turningRight = false;
                    break;
                case 'w':
                    this.rocket.velocity = 0;
                    break;
            }
        }
    }

    act() {
        this.rocket.act();
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0,0,600,800);
        this.rocket.draw();
    }

}


