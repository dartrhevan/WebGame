
import Rocket from "./rocket.js";
import Asteroid from "./asteroid.js";

$(function () {
    //const canvas = document.getElementById('canvas');//$('#canvas');
    const ctx = canvas.getContext('2d');
    const g = new Game(ctx, canvas.width, canvas.height);
});

function setInt(func, period, timeout) {
    timeout.id = setTimeout(() => {
        func();
        timeout.id = setTimeout(func, period);
    }, period);
}

class Game {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        const period = 50;
        this.rocket = new Rocket(this);
        this.asteroids = [new Asteroid(50, 70, 15, this)];
        //this.timer = {};
        this.width = w;
        this.height = h;
        setInterval(this.act.bind(this), period);
        window.onkeydown = ev => {
            switch (ev.key.toLowerCase()) {
                case 'a':
                    this.rocket.turningLeft = true;
                    break;
                case 'd':
                    this.rocket.turningRight = true;
                    break;
                case 'w':
                    this.rocket.moving = true;
                    break;
                case 's':
                    this.rocket.goBack = true;
                    break;
            }
        };
        window.onkeyup = ev => {
            switch (ev.key.toLowerCase()) {
                case 'a':
                    this.rocket.turningLeft = false;
                    break;
                case 'd':
                    this.rocket.turningRight = false;
                    break;
                case 'w':
                    this.rocket.moving = false;
                    break;
                case 's':
                    this.rocket.goBack = false;
                    break;
            }
        }
    }

    act() {
        this.rocket.act();
        this.draw();
        this.asteroids.forEach(a => {
            a.act();
            a.draw();
            if(this.rocket.checkIntersection(a)/*this.rocket.getDistanceTo(a) < 1 * a.width*/)
                this.rocket.interact(a);
        });
        this.generateAsteroids();
    }

    draw() {
        this.ctx.clearRect(0,0,600,800);
        this.rocket.draw();
    }

    generateAsteroids() {
        //const size = Math.random() % 2;
        //for(let i = 0; i < size; ++i)
        if( rand() % 17 === 0)
            this.asteroids.push(new Asteroid(rand(this.width), 0, 15, this))
    }
/*
    removeAsteroids() {

    }*/
}

function rand(max = 100, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}


