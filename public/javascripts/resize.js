export function resize(g) {
    const canvas = document.getElementById('canvas');
    canvas.width = Math.min(window.innerWidth, window.innerHeight / 1.5);
    canvas.height = window.innerHeight - 104;
    g.width = canvas.width;
    g.height = canvas.height;
    g.generateBackground();
    //canvas.parentNode.offsetHeight = canvas.height;
}
