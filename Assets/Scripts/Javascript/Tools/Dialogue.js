function Dialogue(_x, _y, _charaDial, _text)
{
	
	var _self = Application.Game.add.image(0,0,_charaDial);
 	_self.dialogue = Application.Game.add.text(_x,_y, _text, { font: "13px Lithos Pro", fill: "#000", align: "left" });
 	_self.dialogue.setShadow(3, 3, 'rgba(0,0,0,0.2)', 5);
	_self.fixedToCamera = true;
	_self.dialogue.fixedToCamera = true;

	_self.visible = false;
	_self.dialogue.visible = false;

	_self.update = function() 
	{
		//_self.EndDialogue();
	};
	
	_self.setVisible = function(_bool)
	{
		_self.visible = _bool;
		_self.dialogue.visible = _bool;
	};

	_self.EndDialogue = function()
	{
		if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.M)) 
		{
			_self.dialogue.destroy();
			_self.destroy();
            Application.Layers.Player.canMove = true;
		}
	};

	return _self;
}

