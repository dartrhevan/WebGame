import Game from './game.js';
import {resize} from "./resize.js";
//import $ from 'jquery';

$(function () {
    //const canvas = document.getElementById('canvas');//$('#canvas');
    const ctx = canvas.getContext('2d');
    const g = new Game(ctx, canvas.width, canvas.height);
    resize(g);
    window.onresize = resize.bind(null, g);
    $('#restartBut').click(g.startNewGame.bind(g));
    $('#startBut').click(g.pause.bind(g));
    fetch('/username')
        .then(r => r.json())
        .then(resp => {
        if(resp.err)
            console.log(resp.err);
        else showUserName(resp)
    }).catch(e => console.log(e));
});
/*
function setInt(func, period, timeout) {
    timeout.id = setTimeout(() => {
        func();
        timeout.id = setTimeout(func, period);
    }, period);
}

*/
