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

		console.log("MapLayer");
		console.log(MapLayers);
		this.Player = MapLayers["Player"];
		this.InteractObjects = MapLayers["InteractObjects"];
		
	},
	update : function()
	{
		this.Player.Update();
		for (var i = 0; i < this.InteractObjects.length; i++) 
		{
			this.InteractObjects[i].Update();
		}
		Application.Timer.Update();
	},
	render : function(){
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32);
	}
}

