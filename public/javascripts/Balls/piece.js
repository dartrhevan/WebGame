import Ball from "./ball.js";
import rand from "../rand.js";

export default class Piece extends Ball {
    constructor(...args) {
        super(...args);
        this.willDisappear = false;
        setTimeout(() => this.willDisappear = true, 280 + rand(50, -50));
        this.inv = setInterval(() => {
            this.opacity -= 0.1;
            if(!this.colour)
                console.log(this);
            this.fillStyle = `rgba(${this.colour.r},${this.colour.g}, ${this.colour.b}, ${this.opacity})`;
        }, 28);
    }
    checkDisappearing() {
        return this.willDisappear;
    }
    disappear() {
        this.game.staticDrawables.splice(this.game.staticDrawables.indexOf(this), 1);
        clearInterval(this.inv);
    }
    colour = Piece.colours[rand(Piece.colours.length)];
    opacity = 1;
    fillStyle = 'rgba(120, 65, 50, 1)';
    static colours = [{r: 100, g: 50, b: 40}, {r: 250, g: 50, b: 40}, {r: 51, g: 26, b: 0}, {r: 51, g: 16, b: 17}, {r: 0, g: 0, b: 0}]
}
