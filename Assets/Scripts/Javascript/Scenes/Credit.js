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
		this.background = this.game.add.tileSprite(0, 250, Application.config.width, 1737, 'credit');
		this.logo = this.game.add.tileSprite(0,0,Application.config.width,Application.config.height,'logoCred');
		this.logo.alpha = 0;

		var _self = this;

		setTimeout(function() 
	    {
			_self.tween = Application.Game.add.tween(_self.logo).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None,true);
			_self.tween.onComplete.add(function()
    	    {
    	    	setTimeout(function()
	    		{
    	       		_self.state.start("Title");
	    		},3000)
    	    })	
	    },27000)
	},

	update : function()
	{
		this.background.position.y -= 1;	
	},
}

