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

		this.P1 = new Player(this.game, 150, 150);
		this.S1 = new Soul(this.game,200,200);
		this.S2 = new Soul(this.game,900,800);
		this.S3 = new Soul(this.game,400,700);

		this.game.camera.follow(this.P1);

	},
	update : function()
	{
		this.P1.Update();
		this.S1.Update();
	},
	render : function(){


	}
}

