function DialArea( _game, _name, _x, _y, _width, _height)
{
	var type = "";
    var _self = _game.add.sprite(_x, _y, type);
    _self.name = _name;

    _self.alreadyDid = false;

    _self.anchor.set(0.5);
    _game.physics.p2.enable(_self);
    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.body.setRectangle(_width, _height,0,0,0);
   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    _self.lastInput = Application.Game.time.now;
    _self.DialArray = [];
    _self.indexDial = 0;

    _self.update = function()
    {
        _self.LaunchDialogue();
        _self.NextDialogue();
    };

    _self.CheckOverlap = function()
    {
        var dialBounds = _self.getBounds();
        var playerBound =  Application.Layers.Player.getBounds();

        return Phaser.Rectangle.intersects( dialBounds, playerBound);
    };

    _self.LaunchDialogue = function()
    {
        if(!_self.alreadyDid)
        {
            if(_self.CheckOverlap())
            {
                Application.Layers.Player.canMove = false;
                Application.Layers.Player.body.setZeroVelocity();
                _self.DialArray[_self.indexDial].setVisible(true);
                _self.alreadyDid = true;
            }
        }
    };

    _self.NextDialogue = function()
    {
        if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.M) && ( _self.lastInput + 500) < Application.Game.time.now && _self.indexDial < _self.DialArray.length )
        {
            _self.lastInput = Application.Game.time.now;
            _self.DialArray[_self.indexDial].setVisible(false);
            _self.indexDial ++;
            if (_self.indexDial < _self.DialArray.length) 
            {
                _self.DialArray[_self.indexDial].setVisible(true);
            }
            else
            {
                Application.Layers.Player.canMove = true;
            }
        }   
    };

    return _self;
}