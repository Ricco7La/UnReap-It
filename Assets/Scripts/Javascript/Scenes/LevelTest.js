Application.LevelTest = function(){}



Application.LevelTest.prototype = {
	create: function(){ 
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);

		var Map = GenerateMap('LevelTest');

	},
	update : function(){


	},
	render : function(){


	}
}

