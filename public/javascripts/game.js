
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
        const period = 500;
        this.rocket = new Rocket(this);
        this.asteroids = [];
        this.timer = {};
        setInterval(this.draw.bind(this), period);
        window.onkeypress = ev => {
            switch (ev.key) {
                case 'a':
                    this.rocket.turn(-0.5);
                    break;
                case 'd':
                    this.rocket.turn(0.5);
                    break;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0,0,600,800);
        this.rocket.draw();
    }

}


