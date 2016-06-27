function DialArea( _game, _name, _x, _y, _width, _height, _callback)
{
	var type = "";
    var _self = _game.add.sprite(_x, _y, type);
    _self.name = _name;

    _self.alreadyDid = false;

    _self.width = _width;
    _self.height = _height;
   
    _self.debug = Application.debugMode;

    _self.lastInput = Application.Game.time.now;
    _self.DialArray = [];
    _self.indexDial = 0;

    if(Application.debugMode)
    {
        var graphic = _game.add.graphics(0,0);
        graphic.lineStyle(2, 0x0000ff, .4);
        graphic.drawRect(_x, _y, _width, _height);
    }

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
        if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && ( _self.lastInput + 500) < Application.Game.time.now && _self.indexDial < _self.DialArray.length && _self.alreadyDid)
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

    _self.Callback = function()
    {
        if (_self.indexDial == _self.DialArray.length -1)
        {
            _callback();
            _self.indexDial ++;
        }
    }

    return _self;
}