// on crée l'objet principal du jeu
var Application = {
	config : {
		width : 640, // meilleur taille pour le jeu
		height : 480
	},
	Game : null,
	debugMode: true,
	Timer : null,
	nbrSouls : 0,
	lvl : ['Tutorial','Ante1','Ante2','AnteBoss'],
	indexLevel : 0
}

