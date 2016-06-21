Application.Credit = function()
{

}



Application.Credit.prototype = {

	preload : function()
	{
		
	},

	create: function()
	{ 
		//console.log('Credit Screen');
		this.background = this.game.add.tileSprite(0, 50, Application.config.width, 1548, 'credit');
		
        
	},

	update : function()
	{
		this.background.position.y -= 1;
		if (this.background.position.y <= -1386) 
		{
			this.state.start("Title");
		}
	},

	render : function()
	{

	},

}

