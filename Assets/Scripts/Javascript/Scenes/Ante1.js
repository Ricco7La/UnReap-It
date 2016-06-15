Application.Ante1 = function(){}



Application.Ante1.prototype = {
	create: function(){ 
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;


		this.Map = {};


		var MapLayers = GenerateMap(this.game, this.Map, 'Ante1', 'All_Tiles', 'Tiles');


		this.Player = MapLayers["Player"];

		//this.Switch = new Switch(this.game, 550, 800);

	},
	update : function()
	{
		this.Player.Update();
	},
	render : function(){


	}
}

