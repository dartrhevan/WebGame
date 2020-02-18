
import Rocket from "./Rockets/rocket.js";
import Asteroid from "./Balls/asteroid.js";
import Game from './game.js';
//import $ from 'jquery';

$(function () {
    //const canvas = document.getElementById('canvas');//$('#canvas');
    const ctx = canvas.getContext('2d');
    const g = new Game(ctx, canvas.width, canvas.height);
    fetch('/username')
        .then(r => r.json())
        .then(resp => {
        if(resp.err)
            console.log(resp.err);
        else showUserName(resp)
    }).catch(e => console.log(e));
});

function setInt(func, period, timeout) {
    timeout.id = setTimeout(() => {
        func();
        timeout.id = setTimeout(func, period);
    }, period);
}


