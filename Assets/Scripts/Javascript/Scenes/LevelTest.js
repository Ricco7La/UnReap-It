Application.LevelTest = function(){}



Application.LevelTest.prototype = {
	create: function(){ 
		//console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;

    	Application.tilesCG = Application.Game.physics.p2.createCollisionGroup();
		Application.ennemyCG = Application.Game.physics.p2.createCollisionGroup();
		Application.playerCG = Application.Game.physics.p2.createCollisionGroup();


		this.Map = {};

		var layers = [
			{layerName: "BackGround", worldSize: true, collide: false },
			{layerName: "Wall", collide: true },
			{layerName: "ObjectCollide", collide: true },
			{layerName: "Object" }
		];
		var MapLayers = GenerateMap(this.game, this.Map, 'LevelTest', 'All_Tiles', 'Tiles', layers);
		//console.log('testEnd');

		this.Player = MapLayers["Player"];

	},
	update : function()
	{
		this.Player.Update();
	},
	render : function(){


	}
}

