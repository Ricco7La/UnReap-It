function Switch( _game, _x, _y, _type)
{
	var type = _type || "Silver_Lever";
    var _self = _game.add.sprite(_x, _y, type);

    _self.lastActivation = _game.time.now;
    _self.isActivated = false;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.animations.add("activate", [0,1,2]);
    _self.animations.add("desactivate", [2,1,0]);

    _self.body.setRectangle(16,16,0,5,0);
   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    _self.animations.frame = 0;

    //_self.animations.play("activate", 7, true);


    _self.Interact = function()
    {
        if (_self.lastActivation + 50 < _game.time.now)
        {
            Application.Game.sound.play('switch');
            if(_self.isActivated)
            {
                _self.animations.play("desactivate", 7, false);
                _self.isActivated = false;
            }
            else
            {
                _self.animations.play("activate", 7, false);
                _self.isActivated = true;
            }
            _self.lastActivation = _game.time.now;
            
        }
    }

    return _self;

}