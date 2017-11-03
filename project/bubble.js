class Bubble{
    constructor(x,y,r,c){
        this.pos = createVector(x,y);
        this.r = r;
        this.color = c;
    }

    show(){
        fill(this.color);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
        
    }
}
