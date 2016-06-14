Application.Preload = function(){}

Application.Preload.prototype = {
	preload: function(){ 
		console.log("Preload preload")

		// on crée un sprite pour la barre de chargement
        var loadingBar = this.add.sprite(Application.config.width / 2, Application.config.height / 2, "loading");
	        loadingBar.anchor.setTo(0.5,0.5);
	    // on défini la barre de chargement et phaser va gérer la bare tout seul
	        this.load.setPreloadSprite(loadingBar);

	    /*********************************** 
	    	chargement des assets
	    ************************************/

	    // Load TILEMAP
		this.game.load.tilemap('LevelTest', 'Assets/Graphics/TilesMap/LevelTest.json', null, Phaser.Tilemap.TILED_JSON);
		//Load Tiles
		this.game.load.image('Tiles', 'Assets/Graphics/Tiles/All_Tiles.png', 32, 32);
		// Load SpriteSheet Personnages
		this.game.load.spritesheet('Charon', 'Assets/Graphics/Character/Charon_80_96.png', 80, 96, 16);
		this.game.load.spritesheet('Player', 'Assets/Graphics/Character/Death_32_48.png', 32, 48, 16);
		this.game.load.spritesheet('Demon', 'Assets/Graphics/Character/Demon_96_96.png', 96, 96, 16);
		this.game.load.spritesheet('Devil', 'Assets/Graphics/Character/Devil_64_64.png', 64, 64, 16);
		this.game.load.spritesheet('Medusa', 'Assets/Graphics/Character/Medusa_48_48.png', 48, 48, 16);
		this.game.load.spritesheet('Octo', 'Assets/Graphics/Character/Octo_64_80.png', 64, 80, 16);
		this.game.load.spritesheet('Vampire', 'Assets/Graphics/Character/Vampire_48_48.png', 48, 48, 16);
		// Load Title
		this.game.load.image('background','Assets/Graphics/Title/Entered_Cave.jpg');
		this.game.load.image('title','Assets/Graphics/Title/Title.PNG')


	},
  	create: function(){
  		console.log("Preload finished")
  		// go to title
		this.state.start("Title");	
	}
}