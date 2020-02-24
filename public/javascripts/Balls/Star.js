import Ball from "./ball.js";

export default class Star extends Ball {
    constructor(x, y, game) {
        super(x, y, 2.5, game, 0, 0);
    }

    fillStyle = '#FFFFFF';
}
