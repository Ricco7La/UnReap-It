function PauseMenu (_game)
{
	var _self = _game.add.sprite(Application.config.width * .5, Application.config.height * .5, 'pauseMenu');
    var menuPositionTopY = ((Application.config.height - _self.height) * .5);

	_self.isPaused = false;

    _self.anchor.setTo(0.5, 0.5);
    _self.fixedToCamera = true;
    _self.visible = false;

    _self.option = _game.add.text(Application.config.width * .5, menuPositionTopY + (_self.height * .167) * .5, "Option", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
	_self.option.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	_self.option.anchor.setTo(0.5, 0.5);
	_self.option.fixedToCamera = true;
	_self.option.visible = false;

    _self.save = _game.add.text(Application.config.width * .5, menuPositionTopY + (_self.height * .167) * 1.5, "Save", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
	_self.save.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	_self.save.anchor.setTo(0.5, 0.5);
	_self.save.fixedToCamera = true;
	_self.save.visible = false;

    _self.load = _game.add.text(Application.config.width * .5, menuPositionTopY + (_self.height * .167) * 2.5, "Load", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
	_self.load.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	_self.load.anchor.setTo(0.5, 0.5);
	_self.load.fixedToCamera = true;
	_self.load.visible = false;

    _self.mainTitle = _game.add.text(Application.config.width * .5, menuPositionTopY + (_self.height * .167) * 3.5, "Main Title", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
	_self.mainTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	_self.mainTitle.anchor.setTo(0.5, 0.5);
	_self.mainTitle.fixedToCamera = true;
	_self.mainTitle.visible = false; 

    _self.quit = _game.add.text(Application.config.width * .5, menuPositionTopY + (_self.height * .167) * 4.5, "Quit", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
	_self.quit.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	_self.quit.anchor.setTo(0.5, 0.5);
	_self.quit.fixedToCamera = true;
	_self.quit.visible = false;

    _self.back = _game.add.text(Application.config.width * .5, menuPositionTopY + (_self.height * .167) * 5.5, "Back", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
	_self.back.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	_self.back.anchor.setTo(0.5, 0.5);
	_self.back.fixedToCamera = true;
	_self.back.visible = false;

    _self.SetPause = function(_char)
	{
        if( _char == "p" && !_self.isPaused)
        {
        	Application.Game.paused = true;
         	_self.visible = true;
			_self.option.visible = true;
			_self.save.visible = true;
			_self.load.visible = true;
			_self.mainTitle.visible = true;
			_self.quit.visible = true;
			_self.back.visible = true;
        	_self.isPaused = true;
        }
        else if( _char == "p" && _self.isPaused)
        {
            Application.Game.paused = false;
   			_self.visible = false;
			_self.option.visible = false;
			_self.save.visible = false;
			_self.load.visible = false;
			_self.mainTitle.visible = false;
			_self.quit.visible = false;
			_self.back.visible = false;
        	_self.isPaused = false;
        }

	};

	_self.OnPauseMenu = function(event)
	{
        // Only act if paused
        if(Application.Game.paused)
        {
            // Calculate the corners of the menu
            var x1 = (Application.config.width - 150 ) * .5, x2 = (Application.config.width + 150) * .5;
                y1 = (Application.config.height - 300) * .5, y2 = (Application.config.height + 300) * .5;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )
            {
                // The choicemap is an array that will help us see which item was clicked
                var choicemap = ['Option', 'Save', 'Load', 'MainTitle', 'Quit', 'Back'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choice = Math.floor(y / 50) ;
                console.log(event)
                if(choicemap[choice] == 'Option')
                {

                }
                else if(choicemap[choice] == 'Save')
                {

                }
                else if(choicemap[choice] == 'Load')
                {

                }
                else if(choicemap[choice] == 'MainTitle')
				{
	                Application.Game.paused = false;
	                /**
	                	TO DO FOR NEXT PHASER UPDATE
	                	SUBMIT ISSUE ON GITHUB 
	                **/
	                Application.Game.world.width = 640;
	                Application.Game.world.height = 480;

					Application.Game.state.start("Title");
					Application.Game.input.keyboard.addCallbacks(this, null, null, function(){});
				}
                else if(choicemap[choice] == 'Quit')
                {

                }
                else if(choicemap[choice] == 'Back')
                {
	                Application.Game.paused = false;
		        	_self.visible = false;
					_self.option.visible = false;
					_self.save.visible = false;
					_self.load.visible = false;
					_self.mainTitle.visible = false;
					_self.quit.visible = false;
					_self.back.visible = false;
		        	_self.isPaused = false;
                }
            }
            // else
            // {
            //     // Remove the menu and the label
            //     menu.visible = false;

            //     // Unpause the game
            //     Application.Game.paused = false;
            //}
        }
    };

	_game.input.keyboard.addCallbacks(this, null, null, _self.SetPause);
    _game.input.onDown.add(_self.OnPauseMenu, self);

    return _self;

}