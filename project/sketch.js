let colors = [];
let bubbles = [];
let numBubbles = 5000;
let k = 7;
let nodes = [];
let prev_nodes = [];
let clusters = [];
let C = true;
let error = 1;



function setup() {
	frameRate(10);
	createCanvas(800,800);

	for(let i = 0; i<k; i++){
		colors.push(color(random(255),random(255),random(255)))
	}

	//instanciate bubbles
	for(let i = 0; i<numBubbles; i++){
		bubbles.push(new Bubble(random(width)-10 ,random(height)-10,1,color(255)));
	}

	//instanciate the nodes
	for(let i = 0; i<k; i++){
		nodes.push(new Bubble(random(width)-10 ,random(height)-10,6,colors[i]));
		clusters.push([]);
	}

	
	//instanciate the clusters
	for(let i = 0; i<numBubbles; i++){
		let distances = nodes.map( n => dist(bubbles[i].pos.x,bubbles[i].pos.y,n.pos.x,n.pos.y));
		let minIndex = distances.reduce((previous,current, currentIndex) =>  distances[previous] > current ? currentIndex : previous,0);
		clusters[minIndex].push(bubbles[i]);
	}
	show();
}

function draw() {
	background(0);

	
	// update the previous nodes
	prev_nodes = [];
	nodes.forEach(n => prev_nodes.push(new Bubble(n.pos.x ,n.pos.y,this.r,this.color)));


	//caluclate the new nodes
	for(let i = 0; i<k; i++){
		nodes[i].pos = clusters[i].reduce((acc, curr) => acc.add(curr.pos),createVector(0,0)).div(clusters[i].length);
		if(dist(nodes[i].pos.x, nodes[i].pos.y, prev_nodes[i].pos.x, prev_nodes[i].pos.y) < error){
			C = false;
		}
		console.log(C);
	}
	if(!C) noLoop();

	

	//reinstanciate the clusters
	clusters = [];
	for(let i = 0; i<k; i++){
		clusters.push([]);
	}
	for(let i = 0; i<numBubbles; i++){
		let distances = nodes.map(n => dist(bubbles[i].pos.x,bubbles[i].pos.y,n.pos.x,n.pos.y));
		let minIndex = distances.reduce((previous,current, currentIndex) =>  distances[previous] > current ? currentIndex : previous,0);
		clusters[minIndex].push(bubbles[i]);
	}


	show();
}




function show(){
	//show the clusters and the nodes
	colors.forEach((c,i) => clusters[i].forEach(cl => {
		cl.color = c;
		cl.show();
	}));
	nodes.forEach(c => c.show());	
}