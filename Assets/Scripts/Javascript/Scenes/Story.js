Application.Story = function()
{

}

var content = 
[
    "The sky above the port was the color of television, tuned to a dead channel.",
 
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

Application.Story.prototype = {

	preload : function()
	{
		this.game.load.image('background','Assets/Graphics/Title/Entered_Cave.jpg');
		this.game.load.image('title','Assets/Graphics/Title/Title.PNG')
	},

	create: function()
	{ 
		console.log('Story Screen');
		background = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'background');
		title = this.game.add.tileSprite(400,30,206,60,'title');

    	text = this.game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });

    	nextLine(this.game);


	},

	update : function()
	{


	},

	render : function()
	{


	}
}

function nextLine() {

    if (lineIndex === content.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    console.log(Application)
    Application.Game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        Application.Game.time.events.add(lineDelay, nextLine, this);
    }

  	}



