function Switch( _game, _x, _y, _type, _isInTuto)
{
	var type = _type || "Silver_Lever";
    var _self = _game.add.sprite(_x, _y, type);
    var isInTuto = _isInTuto || false;

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
        if (isInTuto) {
            _self.letter.visible = true;
            _self.redStar.visible = true;
        }
    });

    _self.body.onEndContact.add(function(){
        _self.canActivate = false;
        if (isInTuto) {
            _self.letter.visible = false;
            _self.redStar.visible = false;
        }
        

    });

    // E
    if (isInTuto) {
        _self.letter = _game.add.text(_self.x - 3,_self.y - _self.height, "E ", { font: "bold 14px Consolas", fill: "#F00", boundsAlignH: "center",boundsAlignH: "center" });
        _self.redStar = _game.add.sprite(_self.x, _self.y - _self.height * 0.75, "RedStar");
        _self.redStar.anchor.set(0.5);
        _self.redStar.scale.set(0.5);
        _self.letter.alpha = 0.5;
        _self.letter.visible = false;
        _self.redStar.visible = false;
    
        var tween = _game.add.tween(_self.redStar).to( { alpha: 0 }, 750, "Linear", true, 0, -1);
        tween.yoyo(true, 0);
        var tween2 = _game.add.tween(_self.letter).to( { alpha: 1 }, 150, "Linear", true, 0, -1);
        tween2.yoyo(true, 0);
    }


    _self.update = function()
    {
        if( _self.canActivate && Application.Layers.Player.isActivated)
        {
            if (_self.lastActivation + 50 < _game.time.now )
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

    };
    return _self;
}