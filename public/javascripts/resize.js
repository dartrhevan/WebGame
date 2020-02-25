export function resize(g) {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 104;
    g.width = canvas.width;
    g.height = canvas.height;
    g.generateBackground();
    //canvas.parentNode.offsetHeight = canvas.height;
}
