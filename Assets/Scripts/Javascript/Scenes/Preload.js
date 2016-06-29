Application.Preload = function(){}

Application.Preload.prototype = {
	preload: function(){ 
		this.game.stage.backgroundColor = "#000";
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
		this.game.load.tilemap('AnteBoss', 'Assets/Graphics/TilesMap/AnteBossV2.json', null, Phaser.Tilemap.TILED_JSON);
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
		this.game.load.image('Wood', 'Assets/Graphics/SFX/Player/wood.png');

		// Load SFX
		this.game.load.image('SoulParticle', 'Assets/Graphics/SFX/Souls/SoulParticle.png');
		this.game.load.image('SmokePuff', 'Assets/Graphics/SFX/Particles/smoke-puff.png');
		this.game.load.image('Leaf', 'Assets/Graphics/SFX/Particles/leaf1.png');
		this.game.load.image('CornerDL', 'Assets/Graphics/Interact/BossWall/CornerDL.png');
		this.game.load.image('CornerDR', 'Assets/Graphics/Interact/BossWall/CornerDR.png');
		this.game.load.image('CornerUL', 'Assets/Graphics/Interact/BossWall/CornerUL.png');
		this.game.load.image('CornerUR', 'Assets/Graphics/Interact/BossWall/CornerUR.png');
		this.game.load.image('Down', 'Assets/Graphics/Interact/BossWall/Down.png');
		this.game.load.image('Left', 'Assets/Graphics/Interact/BossWall/Left.png');
		this.game.load.image('Right', 'Assets/Graphics/Interact/BossWall/Right.png');
		this.game.load.image('Up', 'Assets/Graphics/Interact/BossWall/Up.png');
		this.game.load.image('StyxBarrier', 'Assets/Graphics/SFX/Particles/StyxBarrier.png');
		this.game.load.image('DropWater', 'Assets/Graphics/SFX/Particles/dropWater.png');
		this.game.load.image('RedStar', 'Assets/Graphics/SFX/Star.png');
		this.game.load.image('Exclamation', 'Assets/Graphics/SFX/Alarm.png');
		

		// Load Title
		this.game.load.image('background','Assets/Graphics/Title/Entered_Cave.jpg');
		this.game.load.image('title','Assets/Graphics/Title/Title.PNG');
		this.game.load.image('redParticles','Assets/Graphics/SFX/Particles/redParticles.png');
		this.game.load.image('blueParticles','Assets/Graphics/SFX/Particles/blueParticles.png');

		//Load Story
		this.game.load.image('bulle1','Assets/Graphics/Title/bulle1.png');
		this.game.load.image('bulle2','Assets/Graphics/Title/bulle2.png');
		this.game.load.image('bulle3','Assets/Graphics/Title/bulle3.png');
		this.game.load.image('bulle4','Assets/Graphics/Title/bulle4.png');
		this.game.load.image('text1','Assets/Graphics/Title/BulleText1.png');
		this.game.load.image('text2','Assets/Graphics/Title/BulleText2.png');
		this.game.load.image('text3','Assets/Graphics/Title/BulleText3.png');
		this.game.load.image('text4','Assets/Graphics/Title/BulleText4.png');

		//Load Credit-
		this.game.load.image('credit','Assets/Graphics/SFX/Credit/FullGravesCredit.png');
		this.game.load.image('logoCred','Assets/Graphics/SFX/Credit/Logo.jpg');

		//Dialogue
		this.game.load.image('eugeneDial','Assets/Graphics/CharacterDialogue/EugeneDial.png');
		this.game.load.image('medusaDial','Assets/Graphics/CharacterDialogue/MedusaDial.png');
		this.game.load.image('charonDial','Assets/Graphics/CharacterDialogue/CharonDial.png');
		this.game.load.image('luciferDial','Assets/Graphics/CharacterDialogue/LuciferDial.png');

		// Load GameOver
		this.game.load.image('gameOver','Assets/Graphics/GameOver/GameOver.png');

		// Load Menu
    	this.game.load.image('pauseMenu', 'Assets/Graphics/PauseMenu/pauseMenu_150_300.png');

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
		this.game.load.audio('gameOver', 'Assets/Audio/SFX/gameOver.mp3');
		this.game.load.audio('falling', 'Assets/Audio/SFX/falling.mp3');
		this.game.load.audio('snake', 'Assets/Audio/SFX/snake.mp3');
		this.game.load.audio('fly', 'Assets/Audio/SFX/fly.mp3');
		this.game.load.audio('BossSong', 'Assets/Audio/SFX/BossSong.mp3');
		this.game.load.audio('bossWall', 'Assets/Audio/SFX/bossWall.mp3');
		this.game.load.audio('bossWater', 'Assets/Audio/SFX/bossWater.mp3');
		this.game.load.audio('bossWaterHit', 'Assets/Audio/SFX/bossWaterHit.mp3');
		this.game.load.audio('BossWalking', 'Assets/Audio/SFX/BossWalking.mp3');
		this.game.load.audio('bossGrunt', 'Assets/Audio/SFX/bossGrunt.wav');

		// Create the Timer(_duration, _repeat, _callback, _game)
		Application.Timer = new Timer(300000000000000, false, this.updateCounter, Application.Game);
		console.log(Application.Timer)
		// Add the Juicy Plugins to Application.
		Application.Juicy = this.game.plugins.add(new Phaser.Plugin.Juicy(this.game));
	},
  	create: function(){
  		//console.log("Preload finished")
  		// go to title
		this.state.start("Title");
	},

	updateCounter : function() 
	{
		Application.Game.state.start('GameOver');
	},
}