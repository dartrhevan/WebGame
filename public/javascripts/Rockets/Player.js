import Rocket from "./rocket.js";
import Ball from "../Balls/ball.js";
import Asteroid from "../Balls/asteroid.js";
import {Bonus} from "../Balls/bonus.js";
import Bullet from "../Balls/bullet.js";
import Enemy from "./enemy.js";

export default class Player extends Rocket {
    constructor(game) {
        super(game);
        this.width = 22.5;
        this.height = 67.5;
        //this.x = 500;
    }

    turningRight = false;
    turningLeft = false;
    goBack = false;
    moving = false;
    rotate() {
        if(this.turningLeft)
            this.turn(-0.06);
        else if(this.turningRight)
            this.turn(0.06);
    }

    turn(a) {
        this.angle += a;
    }

    act() {
        if(Math.abs(this.velocity) >= 0.01)
            this.rotate();
        super.act();
        if((this.moving || this.turningRight || this.turningLeft) && this.velocity < 12 && !this.goBack)
            this.velocity += 0.5;
        else if(this.velocity > -12)
            if(this.goBack || this.turningRight || this.turningLeft)
                this.velocity -= 0.5;
            else if(this.velocity > 0)
                this.velocity -= 0.25;
    }

    lives = 5;
    bullets = 20;
    scores = 0;

    shoot() {
        if(this.bullets > 0) {
            super.shoot();
        //this.game.bullets.push(new Bullet(this.x + this.width / 2, this.y, 3, this.game, 17, this.angle));
            this.bullets--;
        }
    }
}
