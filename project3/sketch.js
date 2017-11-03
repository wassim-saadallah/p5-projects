let bubbles = [];
let numBubbles = 20;
let numClusters = numBubbles;
let clusters = [];
let initClusters = [];
let spacing;
let m = 0;



function setup() {
	frameRate(30);
	createCanvas(400, 400);

	//instanciate bubbles
	for (let i = 0; i < numBubbles; i++) {
		bubbles.push(new Bubble(random(width) - 10, random(height) - 10, 7));
	}

	//instanciate the clusters
	spacing = (width - (10 * (numClusters + 1))) / 10;
	for (let j = 0; j < numClusters; j++) {
		let c = new Cluster([bubbles[j]], color(random(255), random(255), random(255)), (20 + j * spacing), 300, 10);
		clusters.push(c);
		initClusters.push(c);
	}
}

function draw() {
	background(51);
	noLoop();

	//show clusters
	background(51);
	clusters.forEach(c => {
		c.show();
		fill(255);
		ellipse(c.pos.x, c.pos.y, c.r, c.r);
	});


	//check if number of clusters >1
	if (clusters.length > 1) {


		//find the least distance pair
		let min = Infinity;
		let indexA = 0;
		let indexB = 0;
		for (let i = 0; i < clusters.length; i++) {
			for (let j = 0; j < clusters.length; j++) {
				if (i != j) {
					let d = distance(clusters[i], clusters[j]);
					if (d < min) {
						min = d;
						indexA = i;
						indexB = j;
					}
				}
			}
		}

		// console.log(min, indexA, indexB);

		//merge them together
		showMerge(indexA, indexB);
		merge(indexA, indexB);


	}
}


function distance(c1, c2) {
	var min = Infinity;
	for (let i = 0; i < c1.bubbles.length; i++) {
		for (let j = 0; j < c2.bubbles.length; j++) {
			let d = dist(c1.bubbles[i].data.x, c1.bubbles[i].data.y, c2.bubbles[j].data.x, c2.bubbles[j].data.y);
			if (d < min) {
				min = d;
			}
		}
	}
	return min;
}

function merge(i, j) {
	let x = clusters[i].bubbles.concat(clusters[j].bubbles);
	clusters[i].bubbles = x;
	console.log(i, j)
	console.log(j);
	clusters.splice(j, 1);
}

function showMerge(i, j) {
	clusters[i].pos = createVector((clusters[i].pos.x + clusters[j].pos.x) / 2, Math.max(clusters[i].pos.y, clusters[j].pos.y) - 20);
}


function keyPressed() {
	loop();
}