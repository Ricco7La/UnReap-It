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

	 //    this.isPaused = false;

		// this.menu = this.game.add.sprite(Application.config.width * .5, Application.config.height * .5, 'pauseMenu');
	 //    this.menu.anchor.setTo(0.5, 0.5);
	 //    this.menu.fixedToCamera = true;
	 //    this.menu.visible = false;

	 //    var menuPositionTopY = ((Application.config.height - this.menu.height) * .5);

	 //    this.option = this.game.add.text(Application.config.width * .5, menuPositionTopY + (this.menu.height * .167) * .5, "Option", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		// this.option.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		// this.option.anchor.setTo(0.5, 0.5);
		// this.option.fixedToCamera = true;
		// this.option.visible = false;

	 //    this.save = this.game.add.text(Application.config.width * .5, menuPositionTopY + (this.menu.height * .167) * 1.5, "Save", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		// this.save.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		// this.save.anchor.setTo(0.5, 0.5);
		// this.save.fixedToCamera = true;
		// this.save.visible = false;

	 //    this.load = this.game.add.text(Application.config.width * .5, menuPositionTopY + (this.menu.height * .167) * 2.5, "Load", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		// this.load.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		// this.load.anchor.setTo(0.5, 0.5);
		// this.load.fixedToCamera = true;
		// this.load.visible = false;

	 //    this.mainTitle = this.game.add.text(Application.config.width * .5, menuPositionTopY + (this.menu.height * .167) * 3.5, "Main Title", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		// this.mainTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		// this.mainTitle.anchor.setTo(0.5, 0.5);
		// this.mainTitle.fixedToCamera = true;
		// this.mainTitle.visible = false; 

	 //    this.quit = this.game.add.text(Application.config.width * .5, menuPositionTopY + (this.menu.height * .167) * 4.5, "Quit", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		// this.quit.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		// this.quit.anchor.setTo(0.5, 0.5);
		// this.quit.fixedToCamera = true;
		// this.quit.visible = false;

	 //    this.back = this.game.add.text(Application.config.width * .5, menuPositionTopY + (this.menu.height * .167) * 5.5, "Back", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		// this.back.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		// this.back.anchor.setTo(0.5, 0.5);
		// this.back.fixedToCamera = true;
		// this.back.visible = false;

		// this.game.input.keyboard.addCallbacks(this, null, null, this.SetPause);


	 //    this.game.input.onDown.add(this.unpause, self);
	},
	update : function()
	{
		Application.Timer.Update();
	},
	render : function()
	{
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32);
	},

	// SetPause : function(_char)
	// {
 //        if( _char == "p" && !this.isPaused)
 //        {
 //        	Application.Game.paused = true;
 //         	this.menu.visible = true;
	// 		this.option.visible = true;
	// 		this.save.visible = true;
	// 		this.load.visible = true;
	// 		this.mainTitle.visible = true;
	// 		this.quit.visible = true;
	// 		this.back.visible = true;
 //        	this.isPaused = true;
 //        }
 //        else if( _char == "p" && this.isPaused)
 //        {
 //            Application.Game.paused = false;
 //   			this.menu.visible = false;
	// 		this.option.visible = false;
	// 		this.save.visible = false;
	// 		this.load.visible = false;
	// 		this.mainTitle.visible = false;
	// 		this.quit.visible = false;
	// 		this.back.visible = false;
 //        	this.isPaused = false;
 //        }

	// },

	// unpause : function(event)
	// {
 //        // Only act if paused
 //        if(Application.Game.paused)
 //        {
 //            // Calculate the corners of the menu
 //            var x1 = (Application.config.width - 150 ) * .5, x2 = (Application.config.width + 150) * .5;
 //                y1 = (Application.config.height - 300) * .5, y2 = (Application.config.height + 300) * .5;

 //            // Check if the click was inside the menu
 //            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )
 //            {
 //                // The choicemap is an array that will help us see which item was clicked
 //                var choicemap = ['Option', 'Save', 'Load', 'MainTitle', 'Quit', 'Back'];

 //                // Get menu local coordinates for the click
 //                var x = event.x - x1,
 //                    y = event.y - y1;

 //                // Calculate the choice 
 //                var choice = Math.floor(y / 50) ;
 //                console.log(event)
 //                if(choicemap[choice] == 'Option')
 //                {

 //                }
 //                else if(choicemap[choice] == 'Save')
 //                {

 //                }
 //                else if(choicemap[choice] == 'Load')
 //                {

 //                }
 //                else if(choicemap[choice] == 'MainTitle')
	// 			{

	// 			}
 //                else if(choicemap[choice] == 'Quit')
 //                {

 //                }
 //                else if(choicemap[choice] == 'Back')
 //                {
	//                 Application.Game.paused = false;
	// 	        	this.menu.visible = false;
	// 				this.option.visible = false;
	// 				this.save.visible = false;
	// 				this.load.visible = false;
	// 				this.mainTitle.visible = false;
	// 				this.quit.visible = false;
	// 				this.back.visible = false;
	// 	        	this.isPaused = false;
 //                }
 //            }
 //            // else
 //            // {
 //            //     // Remove the menu and the label
 //            //     menu.visible = false;

 //            //     // Unpause the game
 //            //     Application.Game.paused = false;
 //            //}
 //        }
 //    },
}

