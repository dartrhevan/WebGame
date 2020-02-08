import Rocket from "./rocket.js";
import Asteroid from "./asteroid.js";

export default class Game {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        const period = 55;
        this.rocket = new Rocket(this);
        this.drawables = [];
        this.bullets = [];
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
        };
        window.onkeypress = e => e.key.toLowerCase() === 'k' ? this.rocket.shoot() : null;
    }

    act() {
        this.rocket.act();
        this.draw();
        this.drawables.forEach(a => {
            a.act();
            a.draw();
            if(this.rocket.checkIntersection(a)/*this.rocket.getDistanceTo(a) < 1 * a.width*/)
                this.rocket.interact(a);
            for(let b of this.bullets)
                if(b.checkIntersection(a))
                    b.interact(a);
        });
        this.bullets.forEach(a => {
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
        if( rand() % 7 === 0)
            this.drawables.push(new Asteroid(rand(this.width), 0, 15, this, rand(0, 1)))
    }
    /*
        removeAsteroids() {

        }*/
}

function rand(max = 100, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}
