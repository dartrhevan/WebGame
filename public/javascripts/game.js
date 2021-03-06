
import Asteroid from "./Balls/asteroid.js";
import {LifeBonus, ScoreBonus} from "./Balls/bonus.js";
import Player from "./Rockets/Player.js";
import rand from "./rand.js";
import Enemy from "./Rockets/enemy.js";
import {BulletBonus} from "./Balls/bonus.js";
import {resize} from "./resize.js";
import Star from "./Balls/Star.js";

export default class Game {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;
        this.period = 51;
        this.staticDrawables = [];
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
        this.background = [];
        this.startNewGame();
        this.generateBackground();
        window.onkeypress = e => {
             switch(e.key.toLowerCase()) {
                 case 'k':
                 case 'л':
                     this.rocket.shoot();// : null;
                     break;
                 case 'p':
                 case 'з':
                     this.pause();
                     break;
                 case 'r':
                 case 'к':
                     this.startNewGame();
                     break;
             }
        };
    }
    increase()  {
        this.speed += 15 / this.speed;
        if(!rand(5) && this.frequency > 10)
            this.frequency--;
    }

    shoot() {
        this.rocket.shoot();
    }

    get turningRight() { return this.rocket.turningRight; }
    set turningRight(v) { this.rocket.turningRight = v; }


    get turningLeft() { return this.rocket.turningLeft; }
    set turningLeft(v) { this.rocket.turningLeft = v; }

    get movingDown() { return this.rocket.goBack; }
    set movingDown(v) { this.rocket.goBack = v; }

    get movingUp() { return this.rocket.moving; }
    set movingUp(v) { this.rocket.moving = v; }

    get isPaused() {
        return !this.int;
    }

    startNewGame() {

        resize(this);
        this.rocket = new Player(this);
        this.drawables = [];
        this.bullets = [];
        this.speed = 10;
        this.invalidate();
    }

    frequency = 13;
    pause() {
        if(this.int) {
            this.increaseInt = clearInterval(this.increaseInt);
            this.int = clearInterval(this.int);
            //window.onresize = resize.bind(null, this);
        }
        else {
            this.int = setInterval(this.act.bind(this) , this.period);
            this.increaseInt = setInterval(this.increase.bind(this), 30000);
            //window.onresize = null;//resize(canvas);
        }
    }

    act() {
        this.rocket.act();
        this.draw();
        this.drawables.forEach(a => {
            a.act();
            a.draw();
            if(this.rocket.checkIntersection(a))
                this.rocket.interact(a);
            for(let b of this.bullets)
                if(b.checkIntersection(a))
                    b.interact(a);
        });
        this.bullets.forEach(a => {
            a.act();
            a.draw();
            if(this.rocket.checkIntersection(a))
                this.rocket.interact(a);
        });
        this.generateDrawable();
        $('#scores').html(this.rocket.scores);
        $('#lives').html(this.rocket.lives);
        $('#bullets').html(this.rocket.bullets);
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
            fetch('/add_record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
                        scores: this.rocket.scores
                    })
            }).then(reps => reps.json())
                .then(resp => {
                    if(resp.res === 'OK')
                        alert("Your record has been successfully saved");
                    else if(resp.res === "Too little")
                        alert("Your result isn't brilliant");
                    else if(resp.error)
                        alert("Can't save your achievement: " + resp.error);
                    else {
                        alert('Error!');
                        console.log(resp);
                    }
                    showLeaderBoard();
                });
            this.startNewGame();
            this.pause();
        }
    }
    speed = 10;
    draw() {
        this.ctx.clearRect(0,0,this.width,this.height);
        this.staticDrawables.forEach(a => {
            a.act();
            a.draw();
        });
        this.background.forEach(a => a.draw());
        this.rocket.draw();
    }

    generateDrawable() {
        if( rand() % this.frequency === 0)
            this.drawables.push(getDrawable(rand(this.width), 0, 15, this, -this.speed))
    }

    generateBackground() {
        this.background = [];
        const count = rand(30) + 70;
        for(let i = 0; i < count; i++)
            this.background.push(new Star(rand(this.width), rand(this.height), this));
    }
}


function getDrawable(x, y, radius, game, v) {
    const r = rand();
    if(r <= 50)
        return new Asteroid(x,y,radius,game, rand(0, 1), v);
    else if(r <= 70)
        return new Enemy(x, y, game, -v * 0.8);
    else if(r <= 77)
        return new BulletBonus(x,y,radius,game, v);
    else if(r <= 90)
        return new ScoreBonus(x,y,radius,game, v);
    else return new LifeBonus(x,y,radius,game, v)
}
