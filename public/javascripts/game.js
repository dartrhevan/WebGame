import Rocket from "./rocket.js";
import Asteroid from "./asteroid.js";
import Ball from "./ball.js";
import {LifeBonus, ScoreBonus} from "./bonus.js";

export default class Game {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;
        this.period = 55;
        //this.timer = {};
        //this.int = setInterval(this.act.bind(this), period);
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
        this.startNewGame();
        //const startGame = () => this.restart();
        $('#rst').click(this.startNewGame.bind(this));
        $('#st').click(this.pause.bind(this));
        window.onkeypress = e => e.key.toLowerCase() === 'k' ? this.rocket.shoot() : null;
        /*clearInterval(this.int);
        this.int = setInterval(this.act.bind(this), this.period);*/

    }

    startNewGame() {
        this.rocket = new Rocket(this);
        this.drawables = [];
        this.bullets = [];
    }


    pause() {
        if(this.int)
            this.int = clearInterval(this.int);
        else
            this.int = setInterval(this.act.bind(this), this.period);
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
        $('#s').html(this.rocket.scores);
        $('#l').html(this.rocket.lives);
        $('#b').html(this.rocket.bullets);
    }

    draw() {
        this.ctx.clearRect(0,0,600,800);
        this.rocket.draw();
    }

    generateAsteroids() {
        //const size = Math.random() % 2;
        //for(let i = 0; i < size; ++i)
        if( rand() % 7 === 0)
            this.drawables.push(getBall(rand(this.width), 0, 15, this))
    }
    /*
        removeAsteroids() {

        }*/
}
/** TODO: Move to own file*/
function rand(max = 100, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}

function getBall(x,y,radius,game) {
    const r = rand();
    if(r <= 70)
        return new Asteroid(x,y,radius,game, rand(0, 1));
    else if(r <= 90)
        return new ScoreBonus(x,y,radius,game);
    else return new LifeBonus(x,y,radius,game)
}
