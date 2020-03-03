export function resize(g) {
    const canvas = document.getElementById('canvas');
    canvas.width = Math.min(window.innerWidth, window.innerHeight / 1.4);
    canvas.height = window.innerHeight - 40;
    canvas.parentElement.style.height = canvas.height + "px";

    g.width = canvas.width;
    g.height = canvas.height;
    g.generateBackground();
    //canvas.parentNode.offsetHeight = canvas.height;
}
