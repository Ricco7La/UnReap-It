Application.LevelTest = function(){}



Application.LevelTest.prototype = {
	create: function(){ 
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);

		this.Map = {};

		var layers = [
			{layerName: "BackGround", worldSize: true, collide: false },
			{layerName: "Wall", collide: false },
			{layerName: "Road" },
			{layerName: "Object" }
		];
		var MapLayers = GenerateMap(this.game, this.Map, 'LevelTest', 'map', 'Tiles', layers);

		MapLayers["Wall"].debug = true;
	},
	update : function(){


	},
	render : function(){


	}
}

