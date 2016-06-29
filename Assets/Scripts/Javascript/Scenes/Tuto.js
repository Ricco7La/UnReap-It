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

	    var eugeneDial = new Dialogue(180,350,'eugeneDial',["","Manuel de la traversée illégale des Enfers.\n1 : Si vous n'êtes pas convoqué par Lucifer, ou un de ses\ngardiens. Vous serez exécuté sur le champ.\n La fuite est donc votre seule échappatoire!","2 : La majorité des portes s'ouvre à l'aide\ndes différents leviers prévu à cet effet.\n3 : Une porte peut necessiter l'activation\nde plusieurs leviers pour s'ouvrir."]);    
	    MapLayers.DialAreas.firstDial.DialArray.push( eugeneDial);

	    var eugeneDial3 = new Dialogue(180,350,'eugeneDial',["","4 : Toutes âmes trouvées durant la traversée des\ndifférents cercles de l'enfer est\nla propriété de notre maître Lucifer","Ahahah, là il peut toujours rêver.\nJe les garderai pour moi."]);
	    MapLayers.DialAreas.secondDial.DialArray.push( eugeneDial3);

	    var eugeneDial5 = new Dialogue(180,350,'eugeneDial',["","5 : Il vous est possible d'annihiler les\nserviteurs de Lucifer grâce aux pièges","C'est parfait!\nDu moment que je n'ai plus à tuer d'humains."]);
	    MapLayers.DialAreas.thirdDial.DialArray.push( eugeneDial5);
	},

	update : function()
	{
		Application.Timer.Update();
	},

	render : function()
	{
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32, "rgb(255, 255, 255)", "18px Lithos Pro");
		this.game.debug.text('Souls : ' + Application.nbrSouls, 32, 32, "rgb(255, 255, 255)", "18px Lithos Pro");
	},

}

