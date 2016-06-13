// la fonction anonyme protège la variable Game
(function() {
	var Game = new Phaser.Game(
			Application.config.width, 
			Application.config.height, 
			Phaser.AUTO, 
			Application.name
		);
	Application.Game = Game;

	/*
		le premier argument est le nom de l'état,
		le deuxième est le nom de la fonction pour appeler cet état
	*/
	Game.state.add("Splash", Application.Splash);
	Game.state.add("Preload", Application.Preload);
	Game.state.add("LevelTest", Application.LevelTest);
	Game.state.add("Title", Application.Title);
	Game.state.add("Story", Application.Story);

	// lancer l'ecran de lancement du jeu
	Game.state.start("Splash");
})();    