Application.LevelTest = function(){}



Application.LevelTest.prototype = {
	create: function(){ 
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);

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
	},
	update : function(){


	},
	render : function(){


	}
}

