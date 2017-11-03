class Bubble {
    constructor(x, y) {
        this.data = createVector(x, y);
    }

}


class Cluster {
    constructor(bubbles, color, x, y, r) {
        this.bubbles = bubbles;
        this.color = color;
        this.pos = createVector(x, y);
        this.r = r;
    }


    show() {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);

    }
}