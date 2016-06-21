// on crée l'objet principal du jeu
var Application = {
	config : {
		width : 640, // meilleur taille pour le jeu
		height : 480
	},
	Game : null,
	debugMode: true,
	Timer : null,
	Juicy : null,
	nbrSoulsBeforeLvl : 0,
	nbrSouls : 0,
	lvl : ['Tuto','Ante1','Ante2','Ante3','AnteBoss'],
	indexLevel : 0,
	startLevel0 : function () {
		indexLevel = 0;
		this.Game.state.start(this.lvl[this.indexLevel], true);
	},
	resetLevel : function () {
		this.nbrSouls = this.nbrSoulsBeforeLvl;
		this.Game.state.start(this.lvl[this.indexLevel], true);
	},
	nextLevel : function() {
		this.indexLevel ++;
		this.nbrSoulsBeforeLvl = this.nbrSouls;
        this.Game.state.start(this.lvl[this.indexLevel], true);
	}
}

