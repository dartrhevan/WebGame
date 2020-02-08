
import Rocket from "./rocket.js";
import Asteroid from "./asteroid.js";
import Game from './game.js'
//import $ from 'jquery';

$(function () {
    //const canvas = document.getElementById('canvas');//$('#canvas');
    const ctx = canvas.getContext('2d');
    const g = new Game(ctx, canvas.width, canvas.height);
});

function setInt(func, period, timeout) {
    timeout.id = setTimeout(() => {
        func();
        timeout.id = setTimeout(func, period);
    }, period);
}


