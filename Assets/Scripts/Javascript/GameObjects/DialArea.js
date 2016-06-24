function DialArea( _game, _x, _y)
{
	var type = "";
    var _self = _game.add.sprite(_x, _y, type);

    _self.lastActivation = _game.time.now;
    _self.isActivated = false;
    _self.canActivate = false;

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

    _self.body.onBeginContact.add(function(){
        _self.canActivate = true;
    });

    _self.body.onEndContact.add(function(){
        _self.canActivate = false;
    });

    _self.update = function()
    {
        if( _self.canActivate && Application.Layers.Player.isActivated)
        {
            if (_self.lastActivation + 50 < _game.time.now )
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
                _self.lastActivation = _game.time.now;
                
            }
        }
    };
    return _self;
}