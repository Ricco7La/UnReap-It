Application.Tuto = function(){}



Application.Tuto.prototype = {
	create: function(){ 
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;


		this.Map = {};
		
		var MapLayers = GenerateMap(this.game, this.Map, 'Tuto', 'All_Tiles', 'Tiles');
		var pause = this.game.add.text(300, 240, 'Pause', { font: '24px Arial', fill: '#fff' });
		pause.fixedToCamera = true;

		menu = this.game.add.sprite(300, 240, 'menu');
	    menu.anchor.setTo(0.5, 0.5);
	    menu.fixedToCamera = true;
	    menu.visible = false;

		
		pause.inputEnabled = true;

    	pause.events.onInputUp.add(function ()
    	{
	        // When the paus button is pressed, we pause the game
	        Application.Game.paused = true;

	        // Then add the menu
	        menu.visible = true
	        console.log(menu)
    	});

	    // Add a input listener that can help us return from being paused
	    this.game.input.onDown.add(this.unpause, self);
	},
	update : function()
	{
		Application.Timer.Update();
	},
	render : function()
	{
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32);
	},

	unpause : function(event)
	{
        // Only act if paused
        if(Application.Game.paused)
        {
            // Calculate the corners of the menu
            var x1 = 300 - 270/2, x2 = 300 + 270/2,
                y1 = 240 - 180/2, y2 = 240 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )
            {
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);
            }
            else
            {
                // Remove the menu and the label
                menu.visible = false;

                // Unpause the game
                Application.Game.paused = false;
            }
        }
    },
}

