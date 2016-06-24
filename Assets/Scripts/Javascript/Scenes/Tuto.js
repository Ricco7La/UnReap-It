Application.Tuto = function(){}



Application.Tuto.prototype = {
	create: function(){ 
		Application.Game.sound.stopAll();
		this.sound = this.game.add.audio('ambiant');
		console.log('Game Screen');
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;

		this.Map = {};
		
		var MapLayers = GenerateMap(this.game, this.Map, 'Tuto', 'All_Tiles', 'Tiles');

		this.sound.loopFull();

		var dialArea = new DialArea(this.game, "un", 110, 1100, 160, 32);
	    var eugeneDial = new Dialogue(180,350,'eugeneDial',"Manuel de la traversée illégale des Enfers.\n1 : Si vous n'êtes pas convoqué par Lucifer, ou un de ses\ngardiens. Vous serez exécuter sur le champ.\n La fuite est donc votre seule échappatoire!");    
	    var eugeneDial2 = new Dialogue(180,350,'eugeneDial',"2 : La majorité des portes s'ouvre à l'aide\ndes différents leviers prévu à cet effet.\n3 : Une porte peut necessiter l'activation\nde plusieurs leviers pour s'ouvrir.");
	    dialArea.DialArray.push( eugeneDial, eugeneDial2);

		// var dialArea2 = new DialArea(this.game, "deux", 110, 768, 160, 32);
	 //    var eugeneDial3 = new Dialogue(180,350,'eugeneDial',"4 : Toutes âmes trouvées durant la traversée des\ndifférents cercles de l'enfer est\nla propriété de notre maître Lucifer");    
	 //    var eugeneDial4 = new Dialogue(180,350,'eugeneDial',"Ahahah, là il peut toujours rêver.\nJe vais les garder pour moi.");
	 //    dialArea2.DialArray.push( eugeneDial3, eugeneDial4);

		// var dialArea3 = new DialArea(this.game, "trois", 512, 480, 32, 480);
	 //    var eugeneDial5 = new Dialogue(180,350,'eugeneDial',"5 : Il vous est possible d'annihiler les\nserviteurs de Lucifer grâce aux pièges");    
	 //    var eugeneDial6 = new Dialogue(180,350,'eugeneDial',"Ca, jamais. Je n'ôterais plus la vie à qui que ce soit");
	 //    dialArea3.DialArray.push( eugeneDial5, eugeneDial6);
	},

	update : function()
	{
		Application.Timer.Update();
	},

	render : function()
	{
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32);
	},

}

