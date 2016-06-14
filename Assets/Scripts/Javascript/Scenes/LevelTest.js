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

		// in debug add transparency
		//MapLayers["Wall"].body.debug = true;
		//MapLayers["ObjectCollide"].body.debug = true;

		console.log(Application);
		//this.E1 = new Ennemy(this.game,[{x: 150, y:150},{x: 750, y:150},{x: 750, y:750},{x: 150, y:750}]);
		this.P1 = new Player(this.game, 150, 150);
		//this.E1 = new Ennemy(this.game,[{x: 150, y:150, rotation: 0},{x: 150, y:150, rotation: 90},{x: 150, y:150, rotation: 180},{x: 150, y:150, rotation: 270}]);

		this.game.camera.follow(this.P1);

	},
	update : function(){
		this.P1.Update();
	},
	render : function(){


	}
}

