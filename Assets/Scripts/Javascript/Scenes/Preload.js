Application.Preload = function(){}

Application.Preload.prototype = {
	preload: function(){ 
		//console.log("Preload preload")
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
		this.game.load.tilemap('Tuto', 'Assets/Graphics/TilesMap/Tuto.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('Ante1', 'Assets/Graphics/TilesMap/Ante1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('Ante2', 'Assets/Graphics/TilesMap/Ante2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('Ante3', 'Assets/Graphics/TilesMap/Ante3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('AnteBoss', 'Assets/Graphics/TilesMap/AnteBoss.json', null, Phaser.Tilemap.TILED_JSON);
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
		this.game.load.spritesheet('AnimeSoul', 'Assets/Graphics/SFX/Souls/Soul_96_128.png',96,128,8);
		this.game.load.spritesheet('Soul', 'Assets/Graphics/SFX/Souls/SoulAnimated_192_192.png', 192, 192, 26);
		// Load interact items
		this.game.load.spritesheet('Bronze_Lever', 'Assets/Graphics/Interact/Switch/Bronze_Lever_32_32.png', 32, 32, 4);
		this.game.load.spritesheet('Silver_Lever', 'Assets/Graphics/Interact/Switch/Silver_Lever_32_32.png', 32, 32, 4);
		this.game.load.spritesheet('Io_Switch', 'Assets/Graphics/Interact/Switch/Io_Switch_32_32.png', 32, 32, 4);
		this.game.load.spritesheet('Lr_Switch', 'Assets/Graphics/Interact/Switch/Lr_Switch.png', 32, 32, 4);
		this.game.load.spritesheet('CellLeft', 'Assets/Graphics/Interact/Door/CellLeft_96_64.png', 96, 64, 4);
		this.game.load.spritesheet('CellRight', 'Assets/Graphics/Interact/Door/CellRight_96_64.png', 96, 64, 4);
		this.game.load.spritesheet('RockDoorDark', 'Assets/Graphics/Interact/Door/RockDoorDark_96_64.png', 96, 64, 4);
		this.game.load.spritesheet('RockDoorLight', 'Assets/Graphics/Interact/Door/RockDoorLight_96_64.png', 96, 64, 4);
		this.game.load.spritesheet('Spikes', 'Assets/Graphics/Interact/Trap/Spike_32_32.png', 32, 32, 4);
		this.game.load.spritesheet('Hole', 'Assets/Graphics/Interact/Trap/Hole_32_32.png', 32, 32, 4);
		this.game.load.spritesheet('HiddenZone', 'Assets/Graphics/Interact/Door/HiddenZone_96_128.png', 96, 128, 4);
		// Load SFX
		this.game.load.spritesheet('SoulParticle', 'Assets/Graphics/SFX/Souls/SoulParticle.png');

		// Load Title
		this.game.load.image('background','Assets/Graphics/Title/Entered_Cave.jpg');
		this.game.load.image('title','Assets/Graphics/Title/Title.PNG');
		this.game.load.image('redParticles','Assets/Graphics/SFX/Particles/redParticles.png');
		this.game.load.image('blueParticles','Assets/Graphics/SFX/Particles/blueParticles.png');

		//Load Credit

		this.game.load.image('credit','Assets/Graphics/SFX/Credit/fullcredit.png');

		//Dialogue
		this.game.load.image('eugeneDial','Assets/Graphics/CharacterDialogue/EugeneDial.png');
		this.game.load.image('medusaDial','Assets/Graphics/CharacterDialogue/MedusaDial.png');
		this.game.load.image('charonDial','Assets/Graphics/CharacterDialogue/CharonDial.png');

		// Load GameOver
		this.game.load.image('gameOver','Assets/Graphics/GameOver/GameOver.png');

		// Load Sounds
		this.game.load.audio('title', 'Assets/Audio/Ambiant/Title.mp3');
		this.game.load.audio('ambiant', 'Assets/Audio/Ambiant/Ambiant.mp3');
		this.game.load.audio('playerWalking', 'Assets/Audio/Character/Player/walking.mp3');
		this.game.load.audio('switch', 'Assets/Audio/SFX/switch.mp3');
		this.game.load.audio('soul', 'Assets/Audio/SFX/soul.mp3');
		this.game.load.audio('doorOpening', 'Assets/Audio/SFX/DoorOpening.mp3');
		this.game.load.audio('doorClosing', 'Assets/Audio/SFX/DoorClosing.mp3');
		this.game.load.audio('hidden', 'Assets/Audio/SFX/hidden.mp3');
		this.game.load.audio('spikeOut', 'Assets/Audio/SFX/spikeOut.mp3');
		this.game.load.audio('spikeIn', 'Assets/Audio/SFX/spikeIn.mp3');
		this.game.load.audio('teleport', 'Assets/Audio/SFX/teleport.mp3');

		// Create the Timer(_duration, _repeat, _callback, _game)
		Application.Timer = new Timer(3000, false, this.updateCounter, Application.Game);
		// Add the Juicy Plugins to Application.
		Application.Juicy = this.game.plugins.add(new Phaser.Plugin.Juicy(this.game));
		
    	this.game.load.image('menu', 'Assets/Graphics/number-buttons-90x90.png', 270, 180);

		// Create the Timer(_duration, _repeat, _callback, _game)
		Application.Timer = new Timer(30000, false, this.updateCounter, Application.Game);
	},
  	create: function(){
  		//console.log("Preload finished")
  		// go to title
		this.state.start("Tuto");
	},

	updateCounter : function() 
	{
		Application.Timer.Clear();
	},
}