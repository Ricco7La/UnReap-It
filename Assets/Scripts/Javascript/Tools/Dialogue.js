function Dialogue(_x,_y,_charaDial,_text)
{
	
	var boxDialogue = Application.Game.add.image(0,0,_charaDial);
 	boxDialogue.dialogue = Application.Game.add.text(_x,_y, _text, { font: "14px Lithos Pro", fill: "#000", align: "left" });
 	boxDialogue.dialogue.setShadow(3, 3, 'rgba(0,0,0,0.2)', 5);
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

