Application.Ante2 = function(){}



Application.Ante2.prototype = {
	create: function(){ 
		Application.Game.sound.stopAll();
		this.ambiant = this.game.add.audio('ambiant');
		//console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;


		this.Map = {};


		var MapLayers = GenerateMap(this.game, this.Map, 'Ante2', 'All_Tiles', 'Tiles');
		this.ambiant.loopFull();
	},
	update : function()
	{
		Application.Timer.Update();

		
	},
	render : function(){
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32, "rgb(255, 255, 255)", "18px Lithos Pro");
		this.game.debug.text('Souls : ' + Application.nbrSouls, 32, 32, "rgb(255, 255, 255)", "18px Lithos Pro");
	}
}

