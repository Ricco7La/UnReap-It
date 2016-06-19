Application.Ante1 = function(){}



Application.Ante1.prototype = {
	create: function(){ 
		//console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;


		this.Map = {};

	
		var MapLayers = GenerateMap(this.game, this.Map, 'Ante1', 'All_Tiles', 'Tiles');
		eugenedial = new Dialogue('eugeneDial',"Il faut que je passe sans me faire reperer ! \n ce serait con de ce faire choper");
		medusaDial = new Dialogue('medusaDial',"ATTRAPEZ LE !! VIV..MORT !... Attend il est quoi enfaite ?!")
		medusaDial.setVisible(false);
		eugenedial.setVisible(false);
		this.lastInput = this.game.time.now;

		this.DialArray = [eugenedial,medusaDial];
		this.indexDial = 0;

		this.DialArray[this.indexDial].setVisible(true);
				
	},
	update : function()
	{
		Application.Timer.Update();
		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.M) && ( this.lastInput + 500) < this.game.time.now )
		{
			//console.log("ici")
			this.lastInput = this.game.time.now;
			this.DialArray[this.indexDial].setVisible(false);
			this.indexDial ++;
			if (this.indexDial < this.DialArray.length) 
			{
				this.DialArray[this.indexDial].setVisible(true);
			}
			
		}		

		
	},
	render : function(){
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32);
	}

}


// function dialogue(_charaDial,_text)
// {


// 	var boxDialogue = Application.Game.add.image(0,0,_charaDial);
//  	var dialogue = Application.Game.add.text(180,350, _text, { font: "14px Merriweather", fill: "#ff1105", align: "center" });
// 	boxDialogue.fixedToCamera = true;
// 	dialogue.fixedToCamera = true;
// 	// _game.input.keyboard.isDown(Phaser.Keyboard.UP
// 	boxDialogue.update = function() 
// 	{
// 		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
// 		{
// 			console.log("kill dial")
// 			boxDialogue.destroy();
// 		}
// 	}
// 	dialogue.update = function()
// 	{
// 		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
// 		{
// 			dialogue.destroy();
// 		}
// 	}
	



// 	console.log("dialogue")
// }
