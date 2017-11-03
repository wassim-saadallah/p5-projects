let bubbles = [];
let numBubbles = 100;
let numClusters = numBubbles;
let clusters = [];

let m = 0;



function setup() {
	frameRate(30);
	createCanvas(800,800);

	//instanciate bubbles
	for(let i = 0; i<numBubbles; i++){
		bubbles.push(new Bubble(random(width)-10 ,random(height)-10,7));
	}

	//instanciate the clusters
	for(let j = 0; j<numClusters; j++){
		let c = new Cluster([bubbles[j]],color(random(255),random(255),random(255),10));
		c.updateColor();
		clusters.push(c);
	}

	show();
}

function draw() {
	background(0);

	//check if number of clusters >1

	if(clusters.length>1){

		
		//find the least distance pair
		let min = Infinity;
		let indexA = 0;
		let indexB = 0;
		for(let i = 0; i<clusters.length;i++){
			for(let j = 0; j< clusters.length; j++){
				if(i!=j){
					let d = distance(clusters[i], clusters[j]);
					if(d< min){
						min = d; 
						indexA = i;
						indexB = j;
					}  
				}
			}
		}
		
		console.log(min, indexA, indexB);

		//merge them together
		merge(indexA,indexB);

	}

	show();
}


function distance(c1,c2){
	var min = Infinity;
	for(let i = 0; i<c1.bubbles.length;i++){
		for(let j = 0; j< c2.bubbles.length; j++){
			let d = dist(c1.bubbles[i].pos.x, c1.bubbles[i].pos.y, c2.bubbles[j].pos.x, c2.bubbles[j].pos.y);
			if(d< min){
				min = d; 
			}  
		}
	}
	return min;
}

function merge(i,j){
	let x = clusters[i].bubbles.concat(clusters[j].bubbles);
	clusters[i].bubbles = x;
	var c1 = clusters[i].color.levels;
	var c2 = clusters[j].color.levels;
	clusters[i].color = color(floor((c1[0] + c2[0])/2),floor((c1[1] + c2[1])/2),floor((c1[2] + c2[2])/2),c1[3]+10);
	clusters[i].updateColor();
	clusters.splice(j,1);
}




function show(){
	//show the clusters and the nodes
	clusters.forEach((c,i) => c.bubbles.forEach(b => {
		b.show();
	}));
	
}