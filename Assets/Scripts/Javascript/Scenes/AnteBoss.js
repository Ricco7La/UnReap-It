Application.AnteBoss = function(){}



Application.AnteBoss.prototype = {
	create: function(){ 
		console.log('Game Screen');
		Application.Game.sound.stopAll();
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.applyGravity = false;
		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.defaultRestitution = 1;
    	this.game.physics.p2.friction = 1;


		this.Map = {};

	
		var MapLayers = GenerateMap(this.game, this.Map, 'AnteBoss', 'All_Tiles', 'Tiles');

		var Charon = new Boss(Application.Game,300,190);
		Charon.body.setCollisionGroup(MapLayers.bossCG);
		Charon.body.collides(MapLayers.playerCG,Application.resetLevel);
		Charon.body.collides(MapLayers.tilesCG,Charon.collisionWithWall);

		charonDial = new Dialogue(130,200,'charonDial',"HALTE LA !\nToutes âmes, morte ou vivante voulant passer doit\npayer son tribut!");
		eugeneDial = new Dialogue(180,350,'eugeneDial',"Hey Charon vieille branche !\nT'inquiète pas j'ai tout pré...*fouille fouille*\n Oh non... non non non non non");
		charonDial2 = new Dialogue(130,200,'charonDial',"J'attend ton tribut Eugène !\nSi tu n'as pas de quoi payer... TU NE PASSERA PAS !!!");
		eugeneDial2 = new Dialogue(180,350,'eugeneDial',"SUPER ton imitation, j'adore, mais serieux\nj'ai oublié ma bourse au bureau !\n*Et je me vois mal y retourner*");
		charonDial3 = new Dialogue(130,200,'charonDial',"Tu connais les règles faucheuse,\n je ne te laisserais pas passer");
		eugeneDial3 = new Dialogue(180,350,'eugeneDial',"Si tu le prend comme ça,\nJe n'ai pas d'autre choix que de forcer le passage\na l'ancienne!");
		charonDial4 = new Dialogue(130,200,'charonDial',"A nous deux !");
		var nbSouls = Application.nbrSouls + 2
		eugeneDial4 = new Dialogue(180,350,'eugeneDial',"Faux ! C'est toi contre moi et mes " + Application.nbrSouls + " nouveaux copains !" );
		
		charonDial.setVisible(false);
		eugeneDial.setVisible(false);
		charonDial2.setVisible(false);
		eugeneDial2.setVisible(false);
		charonDial3.setVisible(false);
		eugeneDial3.setVisible(false);
		charonDial4.setVisible(false);
		eugeneDial4.setVisible(false);

		this.lastInput = this.game.time.now;

		this.DialArray = [charonDial,eugeneDial,charonDial2,eugeneDial2,charonDial3,eugeneDial3,charonDial4,eugeneDial4];
		this.indexDial = 0;

		this.DialArray[this.indexDial].setVisible(true);

		console.log(this.game);

				
	},
	update : function()
	{
		Application.Timer.Update();

		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.M) && ( this.lastInput + 500) < this.game.time.now && this.indexDial < this.DialArray.length )
		{
			console.log("ici")
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
