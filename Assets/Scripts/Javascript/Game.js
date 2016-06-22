// on crée l'objet principal du jeu
var Application = {
	config : {
		width : 640, // meilleur taille pour le jeu
		height : 480
	},
	Game : null,
	debugMode: false,
	Layers: null,
	Timer : null,
	Juicy : null,
	nbrSoulsBeforeLvl : 0,
	nbrSouls : 0,
	lvl : ['Tuto','Ante1','Ante2','Ante3','AnteBoss'],
	indexLevel : 0,
	EscapeAnimation : [],
	startLevel0 : function () {
		Application.indexLevel = 0;
		Application.Game.state.start(Application.lvl[Application.indexLevel], true);
	},
	resetLevel : function () {
		Application.nbrSouls = Application.nbrSoulsBeforeLvl;
		Application.EscapeAnimation[3]();
		//Application.EscapeAnimation[Math.Random.RangeInt(0,Application.EscapeAnimation.length - 1,true)]();
	},
	nextLevel : function() {
		Application.indexLevel ++;
		Application.nbrSoulsBeforeLvl = Application.nbrSouls;
        Application.Game.state.start(Application.lvl[Application.indexLevel], true);
	}
}

var Anim0 = function () 
{
	Application.Layers.Player.canMove = false;
	Application.Layers.Player.animations.play('move_down', 7, true);
	var flash = Application.Juicy.createScreenFlash('rgba(255,255,255,1)');
	Application.Game.add.existing(flash);
	eugeneDial = new Dialogue(180,350,'eugeneDial',"FIRE IN THE HOLE !");
	flash.flash(1,200,1,function () {
		Application.Game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
			Application.Game.state.start(Application.lvl[Application.indexLevel], true);
		});
	});
}
Application.EscapeAnimation.push(Anim0);

var Anim1 = function()
{
	Application.Game.camera.follow(null);
	Application.Layers.Player.animations.play('move_left',7,true);
	var newPos = Application.Layers.Player.x - Application.config.width * 1.5;
	Application.Layers.Player.canMove = false;
	eugeneDial = new Dialogue(180,350,'eugeneDial',"Oups ... Je crois que j'ai oublié d'eteindre mon four.");
	
	var tween = Application.Game.add.tween(Application.Layers.Player.body).to( { x: newPos }, 2500, Phaser.Easing.Quadratic.In, true);
	tween.onComplete.add(function() {
		Application.Game.state.start(Application.lvl[Application.indexLevel], true);
	});
}
Application.EscapeAnimation.push(Anim1);

var Anim2 = function() {
	emitter = Application.Game.add.emitter(Application.Layers.Player.x, Application.Layers.Player.y, 100);
	Application.Layers.Player.canMove = false;
	Application.Layers.Player.body.damping = 1;
	eugeneDial = new Dialogue(180,350,'eugeneDial',"Kof, Kof, Kof! La fumée me pique les yeux ... \n \n Ah non, c'est vrai, je n'en ai plus.");
	Application.Game.camera.unfollow();
	
	emitter.minParticleScale = 0.005;
    emitter.maxParticleScale = 0.05;

    emitter.setRotation(0, 360);
    emitter.setAlpha(0.6);
    emitter.setScale(0.3, 0, 0.3, 0, 2000);
    emitter.gravity = 0;
    emitter.setXSpeed(-75,75);
    emitter.setYSpeed(-75,75);
    emitter.makeParticles('SmokePuff');

    Application.Game.camera.shake(0.03,350,true);
    emitter.start(false, 500, 10);

    Application.Layers.Player.visible = false;
    Application.Layers.Player.body.clearCollision();

    Application.Game.time.events.add(1500, function (argument) {
    	emitter.on = false;
    });
    Application.Game.time.events.add(2250, function (argument) {
    	Application.Game.state.start(Application.lvl[Application.indexLevel], true);
    });
    console.log(emitter);

}
Application.EscapeAnimation.push(Anim2);

var Anim3 = function() 
{
	Application.Layers.Player.canMove = false;
	var wood = Application.Game.add.sprite(Application.Layers.Player.x,Application.Layers.Player.y,"Wood");
	wood.visible = false;
	wood.anchor.set(0.5);
	wood.scale.set(0.65);
	emitterLeaf = Application.Game.add.emitter(Application.Layers.Player.x, Application.Layers.Player.y, 5000);
	Application.Layers.Player.body.damping = 1;
	Application.Layers.Player.animations.stop();
	Application.Layers.Player.animations.frame = 0;
	eugeneDial = new Dialogue(180,350,'eugeneDial',"Shiniton : Henge Kawarimi no Jutsu");
	Application.Game.camera.unfollow();
	
	emitterLeaf.minParticleScale = 0.005;
    emitterLeaf.maxParticleScale = 0.05;
    emitterLeaf.setRotation(0, 360);
    emitterLeaf.setAlpha(0.6);
    emitterLeaf.setScale(0.07, 0.05, 0.07, 0.05, 10000);
    emitterLeaf.gravity = -25;
    emitterLeaf.setXSpeed(-3,3);
    emitterLeaf.setYSpeed(0,0);
    emitterLeaf.makeParticles('Leaf');

    emitterLeaf.start(false, 2000, 1);

    var start = Application.Layers.Player.x - Application.Layers.Player.width;
    var end = Application.Layers.Player.x + Application.Layers.Player.width;

    emitterLeaf.emitY = Application.Layers.Player.y + Application.Layers.Player.height * 0.6;
    emitterLeaf.emitX = start;
    Application.Game.add.tween(emitterLeaf).to( { emitX: end }, 250, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);

    Application.Layers.Player.body.clearCollision();

    Application.Game.time.events.add(1500, function (argument) {
    	emitterLeaf.on = false;
    	Application.Layers.Player.visible = false;

    });
    Application.Game.time.events.add(1600, function (argument) {
    	wood.visible = true;

    });
    Application.Game.time.events.add(2500, function (argument) {
    	Application.Game.state.start(Application.lvl[Application.indexLevel], true);
    });

}
Application.EscapeAnimation.push(Anim3);