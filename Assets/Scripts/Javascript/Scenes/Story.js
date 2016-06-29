Application.Story = function()
{

}

// var content = 
// [
//     "L’Âge sombre, le monde n’était encore qu’une ébauche noyée dans les ténèbres.",
// 	"Vint l’ère des humains, ces créatures mortelles créée de la main d’un dieu mystérieux",
// 	"dont Lucifer, son fils, avait le devoir de punition.",
// 	"",
// 	"Des pêchers des hommes, Lucifer en fît son royaume composé de 9 cercles et",
// 	"peuplé par Eugène, la Faucheuse.",
// 	"Son travail, récolter les âmes des humains déchus et les emmener vers les cercles qui", 
// 	"correspondaient le mieux aux pêchers commit lors de leur vivant.",
// 	"",
// 	"Tout allait bien jusqu’au jour où Lucifer lui-même fut touché par la paresse,",
// 	" l’envie et l’avarice… « DES ÂMES ! ENCORE ! » Déclarait-il !",
// 	"« Si Eugène n’est pas capable de nous en rapporter beaucoup plus,", 
// 	"il est l’heure de… SOUS-TRAITER ! »",
// 	"",
// 	"Et c’est ainsi qu’Eugène se retrouva relégué au simple rang de fonctionnaire",
// 	"dans les bureaux de l’enfer", 
// 	"pendant que les CHINE-Igami étaient employés par Lucifer pour rapporter", 
// 	"bon nombres d’âmes en enfer…",
// 	"",
// 	"Sauf qu’Eugène n’était pas du genre à vouloir rester assis devant un bureau,",
// 	"lui qui a perdu l’envie de tuer",
// 	" décida que si Lucifer n’avait plus besoin de lui, il allait se rallier aux humains,",
// 	"leur rendre leurs âmes et",
// 	"détruire ce que Lucifer avait mis tant de temps à créer.", 
// 	"",
// 	"Mais pour ça, encore fallait-il réussir à s’introduire dans le cœur des enfers",
// 	"sans se faire repérer avant que ",
// 	"Lucifer ne signe l’accord final cédant l’enfer entier aux Chine-Igami." 
// ];


Application.Story.prototype = {

	preload : function()
	{

	},

	create: function()
	{ 

		// Image
		this.bulle1 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle1');
		this.bulle3 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle3');
		this.text3 = this.game.add.tileSprite(0,0,Application.config.width, Application.config.height, 'text3');
		this.bulle2 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle2');
		this.bulle4 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle4');

		// Text 
		this.text1 = this.game.add.tileSprite(200,20,334,200,'text1');
   		this.text1.scale.setTo(0.7);
   		this.text2 = this.game.add.tileSprite(50,180,347,142,'text2');
		this.text2.scale.setTo(0.6);
		// this.text3 = this.game.add.tileSprite(0,0,Application.config.width, Application.config.height, 'text3');
		this.text4 = this.game.add.tileSprite(50,300,347,142,'text4');
		this.text4.scale.setTo(0.6);

		this.pressSpaceBar = this.game.add.text(550, Application.config.height - 20, "Press Space", { font: "12px Consolas", fill: "#fff", align: "left" });
        var tween = this.game.add.tween(this.pressSpaceBar).to( { alpha: 0 }, 750, "Linear", true, 0, -1);
        tween.yoyo(true, 0);
		
		this.lastInput = this.game.time.now;

		//make alpha 0

		this.text1.alpha = 0;
		this.text2.alpha = 0;
		this.text3.alpha = 0;
		this.text4.alpha = 0;
		this.bulle2.alpha = 0;
		this.bulle3.alpha = 0;
		this.bulle4.alpha = 0;

		// array

		this.bulleArray = [this.bulle1,this.text1,this.bulle2,this.text2,this.bulle3,this.text3,this.bulle4,this.text4];
		this.indexBulle = 1;
   		
	},

	update : function()
	{
		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)  && ( this.lastInput + 500) < this.game.time.now )
		{
    		this.nextBulle();
    	}

	},

	render : function()
	{


	},

	nextBulle : function()
	{
		this.lastInput = this.game.time.now;
		
		if (this.indexBulle < this.bulleArray.length) 
		{
			Application.Game.add.tween(this.bulleArray[this.indexBulle]).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None,true);
		}
		else
		{
			Application.startLevel0();
		}
		this.indexBulle++;
	
	}

}




