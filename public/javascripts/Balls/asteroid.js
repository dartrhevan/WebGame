import Drawable from "../drawable.js";
import Ball from "./ball.js";
//const Drawable = require("./drawable.js")

export default class Asteroid extends Ball {
    constructor(x,y,radius,game, d,v = -10, a = 0) {
        super(x,y,radius,game, v, a);
        this.disposable = d;
        this.fillStyle = d ? '#442211' : '#000000';
    }
}
