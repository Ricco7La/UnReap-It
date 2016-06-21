Application.Ante1 = function(){}



Application.Ante1.prototype = {
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

	
		var MapLayers = GenerateMap(this.game, this.Map, 'Ante1', 'All_Tiles', 'Tiles');
		eugeneDial = new Dialogue(180,350,'eugeneDial',"Bien, si je ne me trompe pas, l'embarcadère de Charon \ndoit ce trouver au bout de ce cercle... \nEvitons d'attirer l'attention, j'aimerais eviter une effusion de \nsang inutile...");
		medusaDial = new Dialogue(160,350,'medusaDial',"Il parait qu'Eugène a disparu des bureaux. \nOn a ordre de le ramener si jamais on le vois");
		eugeneDial2 = new Dialogue(180,350,'eugeneDial',"HEIN QUOI ?! Déjà ? Il y'a balaine sous gravier \ns'ils savent déjà que je suis parti...\nSoyons discret");
		medusaDial.setVisible(false);
		eugeneDial.setVisible(false);
		eugeneDial2.setVisible(false);
		this.lastInput = this.game.time.now;

		this.DialArray = [eugeneDial,medusaDial,eugeneDial2];
		this.indexDial = 0;

		this.DialArray[this.indexDial].setVisible(true);
		this.ambiant.loopFull();
				
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
