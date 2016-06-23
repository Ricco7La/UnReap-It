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
	  //       if (_self.background.position.y <= -1700) 
			// {
				_self.tween = Application.Game.add.tween(_self.logo).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None,true);
				_self.tween.onComplete.add(function()
        	    {
        	    	setTimeout(function()
    	    		{
    	    			console.log("fini")
        	       		_self.state.start("Title");
    	    		},3000)
        	    })	
			// }

	    },27000)
	        
	},

	update : function()
	{
		this.background.position.y -= 1;
		
	},

	// end : function()
	// {
	// 	if (this.background.position.y <= -1700) 
	// 	{
	// 		this.tween = Application.Game.add.tween(this.logo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);
	// 		this.tween.onComplete.add(function()
 //            {
 //            	console.log("fini")
 //                this.state.start("Title");
 //            })	
	// 	}
	// },

}

