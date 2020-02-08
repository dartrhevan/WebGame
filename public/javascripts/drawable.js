export default class Drawable {
    constructor(game) {
        this.game = game;
    }
    x = 0;
    y = 400;
    velocity = 0;
    angle = 0;
    width = 30;
    height = 90;
    get ctx() {
        return this.game.ctx;
    }
/*
    get center() {
        return {
            cx: this.x + this.width / 2,
            cy: this.y + this.height / 2
        };
    }

    getDistanceTo(drawable) {
        return Math.sqrt((this.center.cx - drawable.center.cx) * (this.center.cx - drawable.center.cx)
            + (this.center.cy - drawable.center.cy) * (this.center.cy - drawable.center.cy));
    }
*/
    draw() { }

    move() {
        //const directionSign = this.goBack ? -1 : 1;
        const xShift = this.velocity * Math.sin(this.angle);
        const yShift = this.velocity * Math.cos(this.angle);
        if(this.shouldMoveX(xShift)/*this.x + xShift> 0 && this.x + xShift  < this.game.width*/)
            this.x += xShift;
        if(this.shouldMoveY(yShift)/*this.y - yShift > 0 && this.y - yShift < this.game.height*/)
            this.y -= yShift;
    }

    shouldMoveX(xShift) {
        return this.x + xShift> 0 && this.x + xShift  < this.game.width;
    }
    //interact(drawable) {  }

    shouldMoveY(yShift) {
        return this.y - yShift > 0 && this.y - yShift < this.game.height;
    }
    checkIntersection(drawable) {
    }
        act() {
    }
    /*
        speedup() {
            this.velocity += 10;
        }*/


}