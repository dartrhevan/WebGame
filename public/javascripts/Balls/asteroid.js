import Drawable from "../drawable.js";
import Ball from "./ball.js";
import Piece from "./piece.js";
import rand from "../rand.js";
//const Drawable = require("./drawable.js")

export default class Asteroid extends Ball {
    constructor(x,y,radius,game, d,v = -10, a = 0) {
        super(x,y,radius,game, v, a);
        this.disposable = d;
        this.fillStyle = d ? '#442211' : '#000000';
    }

    disappear() {
        super.disappear();
        const radius = 2.5;
        const size = rand(8) +7;
        for(let i = 0; i < size; i++)
            this.game.staticDrawables.push(new Piece(this.x, this.y, radius, this.game, -15, rand(Math.PI * 2)));
    }
}
