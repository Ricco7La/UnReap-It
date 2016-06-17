function Dialogue(_charaDial,_text)
{
	
	var boxDialogue = Application.Game.add.image(0,0,_charaDial);
 	boxDialogue.dialogue = Application.Game.add.text(180,350, _text, { font: "14px Merriweather", fill: "#ff1105", align: "center" });
	boxDialogue.fixedToCamera = true;
	boxDialogue.dialogue.fixedToCamera = true;


	boxDialogue.setVisible = function(bool)
	{
		this.visible = bool;
		this.dialogue.visible = bool;
	}

	boxDialogue.update = function() 
	{
		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
		{
			console.log("kill dial")
			boxDialogue.dialogue.destroy();
			boxDialogue.destroy();
		}
	}
	
	return boxDialogue;
}

