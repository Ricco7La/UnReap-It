Application.Ante1 = function(){}



Application.Ante1.prototype = {
	create: function(){ 
		Application.Game.sound.stopAll();
		this.ambiant = this.game.add.audio('ambiant'); 
		//console.log('Game Screen');
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;


		this.Map = {};

	
		var MapLayers = GenerateMap(this.game, this.Map, 'Ante1', 'All_Tiles', 'Tiles');

		var dialArea = new DialArea(this.game, 760, 1200, 100, 50);

		var eugeneDial = new Dialogue(180,350,'eugeneDial',"Bien, si je ne me trompe pas, l'embarcadère de Charon \ndoit se trouver au bout de ce cercle... \nEvitons d'attirer l'attention, j'aimerais eviter une\néffusion de sang inutile...");
		var medusaDial = new Dialogue(160,350,'medusaDial',"Il parait qu'Eugène a disparu des bureaux. \nOn a ordre de le ramener si jamais on le voit");
		var eugeneDial2 = new Dialogue(180,350,'eugeneDial',"HEIN QUOI ?! Déjà ? Il y'a baleine sous gravier \ns'ils savent déjà que je suis parti...\nSoyons discret");
		
		dialArea.DialArray.push(eugeneDial,medusaDial,eugeneDial2);

		this.ambiant.loopFull();
				
	},
	update : function()
	{
		Application.Timer.Update();	

		
	},
	render : function(){
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32);
	}

}
