export default class Drawable {
    constructor(game) {
        this.game = game;
    }
    x = 0;
    y = 400;
    velocity = 0;
    angle = 0;
    turningRight = false;
    turningLeft = false;
    goBack = false;
    moving = false;
    width = 30;
    height = 90;
    get ctx() {
        return this.game.ctx;
    }

    draw() { }

    move() {
        //const directionSign = this.goBack ? -1 : 1;
        const xShift = this.velocity * Math.sin(this.angle);
        const yShift = this.velocity * Math.cos(this.angle);
        if(this.x + xShift> 0 && this.x + xShift  < this.game.width)
            this.x += xShift;
        if(this.y - yShift > 0 && this.y - yShift < this.game.height)
            this.y -= yShift;
    }

    rotate() {
        if(this.turningLeft)
            this.turn(-0.04);
        else if(this.turningRight)
            this.turn(0.04);
    }

    act(iDrawable = undefined) {
        if(Math.abs(this.velocity) >= 0.01)
            this.rotate();
        this.move();
        if((this.moving || this.turningRight || this.turningLeft) && this.velocity < 12 && !this.goBack)
            this.velocity += 0.5;
        else if(this.velocity > -12)
            if(this.goBack || this.turningRight || this.turningLeft)
                this.velocity -= 0.5;
            else if(this.velocity > 0)
                this.velocity -= 0.25;
    }
    /*
        speedup() {
            this.velocity += 10;
        }*/

    turn(a) {
        this.angle += a;
    }

}