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
		//MapLayers["Wall"].debug = true;
		//MapLayers["ObjectCollide"].debug = true;

		console.log(Application);
		this.E1 = new Ennemy(this.game,[{x: 0, y:0}])
		this.game.camera.follow(this.E1);

	},
	update : function(){


	},
	render : function(){


	}
}

