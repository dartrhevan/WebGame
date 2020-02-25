import Ball from "./ball.js";
import rand from "../rand.js";

export default class Piece extends Ball {
    constructor(...args) {
        super(...args);
        this.willDisappear = false;/*
        setTimeout(() => {
            this.willDisappear = true;
            clearInterval(this.inv);
        }, 300 + rand(50, -50));*/
        //this.inv = setInterval(() => {
            //if(this.willDisappear) {
               /** this.opacity -= 0.2;
        if(!this.colour)
            console.log(this);
        this.fillStyle = `rgba(${this.colour.r},${this.colour.g}, ${this.colour.b}, ${this.opacity})`;
        this.tick--;*/
           // }
       // }, 50);
        this.colour = Piece.colours[rand(Piece.colours.length - 1)];
        this.fillStyle = `rgba(${this.colour.r},${this.colour.g}, ${this.colour.b}, ${this.opacity})`;
        this.tick = 10;
    }

    checkDisappearing() {
        return this.willDisappear;
    }
    disappear() {
        this.game.staticDrawables.splice(this.game.staticDrawables.indexOf(this), 1);
    }
    act() {
        super.act();
        this.opacity -= 0.2;
        if(!this.colour)
            console.log(this);
        this.fillStyle = `rgba(${this.colour.r},${this.colour.g}, ${this.colour.b}, ${this.opacity})`;
        this.tick--;
        if(!this.tick)
            this.willDisappear = true;
    }

    opacity = 1;
    static colours = [{r: 100, g: 50, b: 40}, {r: 250, g: 50, b: 40}, {r: 51, g: 26, b: 0}, {r: 51, g: 16, b: 17}, {r: 0, g: 0, b: 0}]
}
