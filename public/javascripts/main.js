import Game from './game.js';
import {resize} from "./resize.js";

$(function () {
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


    $('#upBut').bind("touchstart", e => {e.preventDefault(); g.movingUp = true});
    $('#upBut').bind("touchend", e => {e.preventDefault(); g.movingUp = false});
    $('#downBut').bind("touchstart", e => {e.preventDefault(); g.movingDown = true});
    $('#downBut').bind("touchend", e => {e.preventDefault(); g.movingDown = false});

    $('#rightBut').bind("touchstart", e => {e.preventDefault(); g.turningRight = true});
    $('#rightBut').bind("touchend", e => {e.preventDefault(); g.turningRight = false});
    $('#leftBut').bind("touchstart", e => {e.preventDefault(); g.turningLeft = true});
    $('#leftBut').bind("touchend", e => {e.preventDefault(); g.turningLeft = false});
    $("#shootBut").click(e => g.shoot());
    canvas.onclick = e => toggleMenu(true);
    alert("Control for desktop: use W, A, S, D to move, P to pause and K to shoot");
});
