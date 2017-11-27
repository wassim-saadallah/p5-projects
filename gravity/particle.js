class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.r = 10;
    }

    show() {
        stroke(255,25,150);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        //this.vel.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    collideWith(target,rad){
        return dist(target.x,target.y,this.pos.x,this.pos.y) <= this.r/2 + rad/2;
    }
}