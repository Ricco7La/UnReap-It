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
		this.game.load.image('background','Assets/Graphics/Title/StoryLine.jpg');
		this.game.load.image('title','Assets/Graphics/Title/Title.PNG');
		this.game.load.spritesheet('button', 'Assets/Graphics/Title/skip.png', 90, 43);
	},

	create: function()
	{ 
		//console.log('Story Screen');
		this.bulle1 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle1');
		this.bulle2 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle2');
		this.bulle3 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle3');
		this.bulle4 = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'bulle4');
		this.title = this.game.add.tileSprite(400,30,206,60,'title');
		this.button = this.game.add.button(500, 400, 'button',actionOnClick,this);
		this.lastInput = this.game.time.now;


		this.bulle2.alpha = 0;
		this.bulle3.alpha = 0;
		this.bulle4.alpha = 0;

		this.bulleArray = [this.bulle1,this.bulle2,this.bulle3,this.bulle4];
		this.indexBulle = 1;

    	// text = this.game.add.text(32, 350, '', { font: "13px Lithos Pro", fill: "#D6E7FF" });
    	// text.stroke = "#000";
    	// text.strokeThickness = 4;
    	// //  Apply the shadow to the Fill only
   		// text.setShadow(2, 2, "#333333", 2, false, true);

   		


	},

	update : function()
	{
		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.M)  && ( this.lastInput + 500) < this.game.time.now )
		{
			console.log('function')
    		this.nextBulle();
    	}

	},

	render : function()
	{


	},

	nextBulle : function()
	{		
		// Application.Game.add.tween(this.bulleArray[this.indexBulle]).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None,true);
		this.lastInput = this.game.time.now;
		
		if (this.indexBulle < this.bulleArray.length) 
		{
			Application.Game.add.tween(this.bulleArray[this.indexBulle]).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None,true);
		}
		this.indexBulle++;
	
	}

}


// function nextLine() {

//     if (lineIndex === content.length)
//     {
//         //  We're finished
//         return;
//     }

//     //  Split the current line on spaces, so one word per array element
//     line = content[lineIndex].split(' ');

//     //  Reset the word index to zero (the first word in the line)
//     wordIndex = 0;

//     //  Call the 'nextWord' function once for each word in the line (line.length)
//     //console.log(Application)
//     Application.Game.time.events.repeat(wordDelay, line.length, nextWord, this);

//     //  Advance to the next line
//     lineIndex++;

// }

// function nextWord() 
// {

//     //  Add the next word onto the text string, followed by a space
//     text.text = text.text.concat(line[wordIndex] + " ");

//     //  Advance the word index to the next word in the line
//     wordIndex++;

//     //  Last word?
//     if (wordIndex === line.length)
//     {
//         //  Add a carriage return
//         text.text = text.text.concat("\n");

//         //  Get the next line after the lineDelay amount of ms has elapsed
//         Application.Game.time.events.add(lineDelay, nextLine, this);
//     }

// }

function actionOnClick () 
{
    Application.startLevel0();
}



