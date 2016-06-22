// on crée l'objet principal du jeu
var Application = {
	config : {
		width : 640, // meilleur taille pour le jeu
		height : 480
	},
	Game : null,
	debugMode: true,
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
		//Application.EscapeAnimation[0]();
		var RndGen = new Phaser.RandomDataGenerator();
		Application.EscapeAnimation[RndGen.integerInRange(0,Application.EscapeAnimation.length - 1)]();
	},
	nextLevel : function() {
		Application.indexLevel ++;
		Application.nbrSoulsBeforeLvl = Application.nbrSouls;
        Application.Game.state.start(Application.lvl[Application.indexLevel], true);
	}
}

var Anim0 = function () 
{
	var flash = Application.Juicy.createScreenFlash('rgba(255,255,255,1)');
	Application.Game.add.existing(flash);
	eugeneDial = new Dialogue(180,350,'eugeneDial',"FIRE IN THE HOLE !");
	flash.flash(1,200,1,function () {
		setTimeout(function() {
			Application.Game.state.start(Application.lvl[Application.indexLevel], true);
		},1000);
	});
}
Application.EscapeAnimation.push(Anim0);

var Anim1 = function()
{
	Application.Game.camera.follow(null);
	Application.Layers.Player.animations.play('move_right', 5, true);
	var newPos = Application.Layers.Player.x - Application.config.width * 1.5;
	var tween = Application.Game.add.tween(Application.Layers.Player.body).to( { x: newPos }, 3000, Phaser.Easing.Quadratic.In, true);
	tween.onComplete.add(function() {
		Application.Game.state.start(Application.lvl[Application.indexLevel], true);
	});
}
Application.EscapeAnimation.push(Anim1);