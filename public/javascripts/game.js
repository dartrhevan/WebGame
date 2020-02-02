//let canvas = $('#canvas');
const ctx = canvas.getContext('2d');
/*
const rocket = {
    leftEngine: new Path2D('M0,130 L30,70 L30,0 L0,60 Z'),
    rightEngine: new Path2D('M30,130 L0,70 L0,0 L30,60 Z'),
    body: new Path2D('M Z')
};
*/

$(function () {

});

function setInt(func, period, timeout) {
    timeout.id = setTimeout(() => {
        func();
        timeout.id = setTimeout(func, period);
    }, period);
}

class Game {
    constructor() {
        const period = 500;
        setInt(this.draw, 500);
        this.rocket = {};
        this.asteroids = []
    }

    draw() {

    }

}