import Rocket from "./Rockets/rocket.js";
import Asteroid from "./Balls/asteroid.js";
import Ball from "./Balls/ball.js";
import {LifeBonus, ScoreBonus} from "./Balls/bonus.js";
import Player from "./Rockets/Player.js";
import rand from "./rand.js";
import Enemy from "./Rockets/enemy.js";
import {BulletBonus} from "./Balls/bonus.js";

export default class Game {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;
        this.period = 50;
        //this.timer = {};
        //this.int = setInterval(this.act.bind(this), period);
        window.onkeydown = ev => {
            switch (ev.key.toLowerCase()) {
                case 'ф':
                case 'a':
                    this.rocket.turningLeft = true;
                    break;
                case 'в':
                case 'd':
                    this.rocket.turningRight = true;
                    break;
                case 'ц':
                case 'w':
                    this.rocket.moving = true;
                    break;
                case 'ы':
                case 's':
                    this.rocket.goBack = true;
                    break;
            }
        };
        window.onkeyup = ev => {
            switch (ev.key.toLowerCase()) {
                case 'a':
                case 'ф':
                    this.rocket.turningLeft = false;
                    break;
                case 'в':
                case 'd':
                    this.rocket.turningRight = false;
                    break;
                case 'w':
                case 'ц':
                    this.rocket.moving = false;
                    break;
                case 's':
                case 'ы':
                    this.rocket.goBack = false;
                    break;
            }
        };
        this.startNewGame();
        //const startGame = () => this.restart();
        $('#rst').click(this.startNewGame.bind(this));
        $('#st').click(this.pause.bind(this));
        window.onkeypress = e => e.key.toLowerCase() === 'k' ||  e.key.toLowerCase() === 'л' ? this.rocket.shoot() : null;
        /*clearInterval(this.int);
        this.int = setInterval(this.act.bind(this), this.period);*/
        this.increase = () => this.speed += 15 / this.speed;
        this.increaseInt = setInterval(this.increase.bind(this), 30000)
    }

    startNewGame() {
        this.rocket = new Player(this);
        this.drawables = [];
        this.bullets = [];
        this.speed = 10;
        this.invalidate();
    }


    pause() {
        if(this.int) {
            this.increase= clearInterval(this.increaseInt);
            this.int = clearInterval(this.int);
        }
        else {
            this.int = setInterval(this.act.bind(this) , this.period);
            this.increaseInt = setInterval(this.increase.bind(this), 30000)
        }
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
        this.generateDrawable();
        $('#s').html(this.rocket.scores);
        $('#l').html(this.rocket.lives);
        $('#b').html(this.rocket.bullets);
        this.checkGameOver();
    }

    invalidate()
    {
        this.draw();
        this.drawables.forEach(a => a.draw());
        this.bullets.forEach(a => a.draw());
    }

    checkGameOver() {
        if(!this.rocket.lives) {
            alert(`Game over! Your scores: ${this.rocket.scores}`);
            this.startNewGame();
            this.pause();
        }
    }
    speed = 10;
    draw() {
        this.ctx.clearRect(0,0,600,800);
        this.rocket.draw();
    }

    generateDrawable() {
        //const size = Math.random() % 2;
        //for(let i = 0; i < size; ++i)
        if( rand() % 13 === 0)
            this.drawables.push(getDrawable(rand(this.width), 0, 15, this, -this.speed))
    }
    /*
        removeAsteroids() {

        }*/
}


function getDrawable(x, y, radius, game, v) {
    const r = rand();
    if(r <= 50)
        return new Asteroid(x,y,radius,game, rand(0, 1), v);
    else if(r <= 70)
        return new Enemy(x, y, game, -v * 0.8);
    else if(r <= 80)
        return new BulletBonus(x,y,radius,game, v);
    else if(r <= 90)
        return new ScoreBonus(x,y,radius,game, v);
    else return new LifeBonus(x,y,radius,game, v)
}
