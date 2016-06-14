Application.LevelTest = function(){}



Application.LevelTest.prototype = {
	create: function(){ 
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;

		this.Map = {};

		var layers = [
			{layerName: "BackGround", worldSize: true, collide: false },
			{layerName: "Wall", collide: true },
			{layerName: "ObjectCollide", collide: true },
			{layerName: "Object" }
		];
		var MapLayers = GenerateMap(this.game, this.Map, 'LevelTest', 'All_Tiles', 'Tiles', layers);

		//console.log(Application);
		//this.E1 = new Ennemy(this.game,[{x: 150, y:150},{x: 350, y:150},{x: 350, y:350},{x: 150, y:350}]);
		//this.E1 = new Ennemy(this.game,[{x: 150, y:150, rotation: 0},{x: 150, y:150, rotation: 90},{x: 150, y:150, rotation: 180},{x: 150, y:150, rotation: 270}]);

		this.game.camera.follow(this.E1);

	},
	update : function(){

	},
	render : function(){


	}
}

