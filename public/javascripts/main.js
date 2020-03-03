import Game from './game.js';
import {resize} from "./resize.js";
//import $ from 'jquery';

$(function () {
    alert("Fuck");
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

/*
    let gyroscope = new Gyroscope({frequency: 60});

    gyroscope.addEventListener('reading', e => {
        console.log("Angular velocity along the X-axis " + gyroscope.x);
        console.log("Angular velocity along the Y-axis " + gyroscope.y);
        console.log("Angular velocity along the Z-axis " + gyroscope.z);
        console.log(gyroscope);
    });
    gyroscope.start();

    window.addEventListener("deviceorientation", console.log, true);
    $('#shootBut').click(e => g.shoot());
    window.addEventListener("devicemotion", e => alert(e.rotationRate.alpha + " " + e.rotationRate.beta + " " + e.rotationRate.gamma), false);
*/
    $('#upBut').mousedown(e => g.movingUp = true);
    $('#upBut').mouseup(e => g.movingUp = false);

    $('#upBut').bind("touchstart", e => g.movingUp = true);//.get(0).ontouchstart = e => alert("Ye!");//g.movingUp = true;
    $('#upBut').get(0).ontouchend = e => g.movingUp = false;
    /*$('#upBut').toutouchstart( e => g.movingUp = true);
    $('#upBut').get(0).ontouchend = e => g.movingUp = false;
*/

    $('#downBut').mousedown(e => g.movingDown = true);
    $('#downBut').mouseup(e =>g.movingDown = false);
    /*canvas.ontouchstart = e => alert("Ye!");
    document.body.addEventListener('touchstart', function(e){
        e.preventDefault();
        alert(e.changedTouches[0].pageX) // показ коррдинат места прикосновения по X-у.
    }, false);*/
    alert("Fuck !")
});

alert("Fuck !")

