class Bubble{
    constructor(x,y,r,color){
        this.pos = createVector(x,y);
        this.r = r;
        this.color = color;
    }

    show(){
        fill(this.color);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
        
    }
}


class Cluster{
    constructor(bubbles, color){
        this.bubbles = bubbles;
        this.color = color;
    }
    updateColor(){
       for(var i= 0;i <this.bubbles.length;i++){
           this.bubbles[i].color = this.color;
       }
    }
}