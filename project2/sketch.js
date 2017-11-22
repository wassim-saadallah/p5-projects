
var offset = 50;
function setup() {
	createCanvas(700, 700);
}

function draw() {
	background(240);
	noFill();
	translate(width/2,height/2);
	for (var i = -6; i < 4; i+=1) {
		for (var j = -6; j < 4; j+=1) {
			beginShape(TRIANGLE_STRIP);
			vertex(offset * (1 + j), offset * (1 + i),0);
			vertex(offset * (1 + j), offset * (2 + i),0);
			vertex(offset * (2 + j), offset * (1 + i),0);
			endShape();
		}
	}


}