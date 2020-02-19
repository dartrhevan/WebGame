export function resize(canvas, g) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 104;
    g.width = canvas.width;
    g.height = canvas.height;
    //canvas.parentNode.offsetHeight = canvas.height;
}
