function Switch( _game, _x, _y, _type)
{
	var type = _type || "Silver_Lever";
    var _self = _game.add.sprite(_x, _y, type);


    _self.isActivated = false;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.body.fixedRotation = true;

    _self.animations.add("activate", [0,1,2]);
    _self.animations.add("desactivate", [2,1,0]);

    _self.body.setRectangle(48,48,0,0,0);
   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    _self.animations.frame = 0;

    //_self.animations.play("activate", 7, true);


    _self.Interact = function()
    {
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
    }

    return _self;

}