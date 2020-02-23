import Ball from "./ball.js";
import rand from "../rand.js";

export default class Piece extends Ball {
    constructor(...args) {
        super(...args);
        this.willDisappear = false;
        setTimeout(() => this.willDisappear = true, 280 + rand(50, -50));
        setInterval(() => {
            this.opacity -= 0.1;
            this.fillStyle = `rgba(100, 55, 40, ${this.opacity})`;
        }, 28);
    }
    checkDisappearing() {
        return this.willDisappear;
    }
    disappear() {
        this.game.staticDrawables.splice(this.game.staticDrawables.indexOf(this), 1);

    }
    opacity = 1;
    fillStyle = 'rgba(100, 55, 40, 1)';

}
