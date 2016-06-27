Application.GameOver = function()
{

}



Application.GameOver.prototype = {

	preload : function()
	{
		
	},

	create: function()
	{ 
		this.game.sound.stopAll();
		Application.Game.world.width = Application.config.width;
		Application.Game.world.height = Application.config.height;
		Application.Game.camera.x = 0;
		Application.Game.camera.y = 0;
		this.game.sound.play('gameOver');
		console.log('GameOver Screen');
		var background = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'gameOver');

	 	this.start = this.game.add.text(110, this.game.world.centerY + 100, "Try Again", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		this.start.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.start.inputEnabled = true;
		this.start.events.onInputOver.add(function(){ this.state.start("Title") },this);
		console.log(this.game.input.mousePointer);
        
	},

	update : function()
	{

	},

	render : function()
	{

	},

}