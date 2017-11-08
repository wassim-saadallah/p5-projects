let particle;
let gravityFields = [];
let num = 4;
let play = false;
let dragged = false;
let initVel;
let rad = 75;

let target;

function setup() {
	createCanvas(1000, 600);
	for (var i = 0; i < num; i++) {
		gravityFields.push(createVector(random(-3 * width / 8, 3 * width / 8), random(-height / 2, height / 4)));
	}

	target = createVector(random(-width/2+20, width/2 - 20),random(-height/2 + 20, height/2 - 20))
	particle = new Particle(0, (height / 4) + 50);
}

function mouseDragged() {
	dragged = true;
}

function mousePressed() {
	dragged = true;
}

function mouseReleased() {
	dragged = false;
	play = true;
	initVel = createVector(mouseX-width/2, mouseY-height/2).sub(particle.pos).mult(-1);
	console.log(initVel);
	particle.vel = initVel.setMag(map(dist(mouseX, mouseY, particle.pos.x, particle.pos.y), 0, height, 0, 10));
	
}


function draw() {
	background(220);
	translate(width / 2, height / 2);
	noStroke();
	for (let i = 0; i < gravityFields.length; i++) {
		let r = gravityFields[i];
		fill(20 * i);
		ellipse(r.x, r.y, 20, 20);
		noFill();
		stroke(0)
		strokeWeight(0.2);
		ellipse(r.x, r.y, rad, rad);
		strokeWeight(0.4);
		ellipse(r.x, r.y, rad + 20, rad + 20);
		strokeWeight(0.7);
		ellipse(r.x, r.y, rad + 40, rad + 40);
	}

	fill(255,50,10);
	noStroke();
	ellipse(target.x,target.y, 20,20);

	if(rad>20) rad -= 1
	else if(rad == 20) rad = 75

	if (!play)
		particle.show();

	if (dragged && !play) {
		strokeWeight(1);
		stroke(0);
		let a = createVector(mouseX - (width / 2), mouseY - (height / 2) - particle.pos.y).mult(-1).add(particle.pos);
		line(particle.pos.x, particle.pos.y, a.x, a.y);
	}

	if (play) {
		let max = Math.max(...gravityFields.map(x => dist(x.x, x.y, particle.pos.x, particle.pos.y)));
		for (let i = 0; i < gravityFields.length; i++) {
			let r = gravityFields[i];
			particle.applyForce(r.copy().sub(particle.pos).setMag(map(dist(r.x, r.y, particle.pos.x, particle.pos.y), max, 0, 0, 0.09)));
		}
		particle.update();
		particle.show();

		if(particle.collideWith(target,20)){
			noLoop();
			createP("YEEEEEY");
		}
	}

}