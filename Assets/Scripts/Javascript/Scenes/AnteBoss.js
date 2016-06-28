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
		MapLayers["Z-index"][5].add(Charon);
		Charon.body.setCollisionGroup(MapLayers.bossCG);
		Charon.body.collides(MapLayers.playerCG,Application.resetLevel);
		Charon.body.collides(MapLayers.blockCG,Charon.collisionWithWall);
		Charon.body.collides(MapLayers.tilesCG,Charon.collisionWithWater);

		var invisibleWall = [];
		for (el of MapLayers["BossInterractions"]) 
		{
			var img = this.game.add.sprite(el.x + el.width * 0.5, el.y + el.height * 0.5,"");
			img.width = el.width;
			img.height = el.height;
			Application.Game.physics.p2.enable(img);
			img.body.debug = Application.debugMode;
			img.body.fixedRotation = true;
			img.body.static = true;
			invisibleWall.push(img);
		}

		var charonDial = new Dialogue(130,200,'charonDial',"HALTE LA !\nToutes âmes, morte ou vivante voulant passer doit\npayer son tribut!");
		var eugeneDial = new Dialogue(180,350,'eugeneDial',"Hey Charon vieille branche !\nT'inquiète pas j'ai tout pré...*fouille fouille*\n Oh non... non non non non non");
		var charonDial2 = new Dialogue(130,200,'charonDial',"J'attend ton tribut Eugène !\nSi tu n'as pas de quoi payer... TU NE PASSERA PAS !!!");
		var eugeneDial2 = new Dialogue(180,350,'eugeneDial',"SUPER ton imitation, j'adore, mais serieux\nj'ai oublié ma bourse au bureau !\n*Et je me vois mal y retourner*");
		var charonDial3 = new Dialogue(130,200,'charonDial',"Tu connais les règles faucheuse,\n je ne te laisserais pas passer");
		var eugeneDial3 = new Dialogue(180,350,'eugeneDial',"Si tu le prend comme ça,\nJe n'ai pas d'autre choix que de forcer le passage\na l'ancienne!");
		var charonDial4 = new Dialogue(130,200,'charonDial',"A nous deux !");
		var eugeneDial4 = new Dialogue(180,350,'eugeneDial',"Faux ! C'est toi contre moi et mes " + Application.nbrSouls + " nouveaux copains !" );
		
		MapLayers.DialAreas.firstDial.DialArray.push(charonDial, eugeneDial, charonDial2, eugeneDial2, charonDial3, eugeneDial3, charonDial4, eugeneDial4);
		MapLayers.DialAreas.firstDial.callbackFunction = function () {
			var BossWalls = MapLayers.BossWall;
			var wallToDestroy = Application.nbrSouls;
			var tweens = [];
			var bullets = [];
			for (var i = 0; i < Application.nbrSouls ; i++) {
				bullets[i] = this.game.add.sprite(MapLayers.Player.x, MapLayers.Player.y - 40, "SoulParticle");
				bullets[i].anchor.set(0.5);
			}
			var soul = new Soul(this.game, MapLayers.Player.x, MapLayers.Player.y - 40);
			for (var i = 0; i < Application.nbrSouls ; i++) 
			{
				var index = Math.Random.RangeInt(0, BossWalls.length - 1, true);
				var wall = BossWalls[index];
				
				if (wall == undefined) {
					i--;
					continue;
				}
				delete BossWalls[index];
	
				var indexBefore = index-1;
				var indexAfter = index+1;
	
				if (index == 0) {
					indexBefore = BossWalls.length-1;
				}
				else if (index == BossWalls.length-1) {
					indexAfter = 0;
				}

				var wallBefore = BossWalls[indexBefore];
				delete BossWalls[indexBefore];
				var wallAfter = BossWalls[indexAfter];
				delete BossWalls[indexAfter];
	
				
				tweens[i] = this.game.add.tween(bullets[i]).to( { x: wall.x , y: wall.y }, 1500, Phaser.Easing.Circular.In, true);
				tweens[i].onComplete.add(wall.DestroyBySoul);
				if (wallBefore) {
					tweens[i].onComplete.add(wallBefore.DestroyBySoul);
				}
				if (wallAfter) {
					tweens[i].onComplete.add(wallAfter.DestroyBySoul);
				}
				var index = i;
				tweens[i].onComplete.add(function() {
					wallToDestroy--;
					
					if (wallToDestroy == 0) {
						soul.emitter.on = false;
						soul.visible = false;
						Charon.Start();
						for (var i = 0; i < bullets.length; i++) 
						{
							bullets[i].kill();
						}
						for (el of invisibleWall) 
						{
							img.body.setCollisionGroup(MapLayers.blockCG);
							img.body.collides([MapLayers.playerCG, MapLayers.bossCG]);
							console.log(el);
						}
					}

				});
            	

			}
			
			console.log("callback ok");
		};
	},
	update : function()
	{
		Application.Timer.Update();
	},
	render : function(){
		this.game.debug.text('Time : ' + Application.Timer.Display() , 480, 32, "rgb(255, 255, 255)", "18px Lithos Pro");
		this.game.debug.text('Souls : ' + Application.nbrSouls, 32, 32, "rgb(255, 255, 255)", "18px Lithos Pro");
	}

}
