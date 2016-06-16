function Spike( _game, _x, _y, _w, _h, _switches, _type)
{
	var type = _type || "Spikes";
    var x = _x + _w * 0.5;
    var y = _y + _h * 0.5;
    var _self = _game.add.sprite(x, y, type);
    _self.SavedCollision = null;
    _self.isOpen = false;

    _self.Switches = _switches;

    _self.z = 1;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.animations.add("open", [3,2,1,0]);
    _self.animations.add("close", [0,1,2,3]);

   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    _self.animations.frame = 3;

    _self.update = function()
    {
        var switchesBool = _self.IsOpen();
        if ( switchesBool && !_self.isOpen ) 
        {
            _self.body.removeCollisionGroup(_self.SavedCollision)
            _self.animations.play("open", 10, false);
            _self.isOpen = true;
        }
        else if ( !switchesBool && _self.isOpen ) 
        {
            _self.body.collides(_self.SavedCollision);
            _self.animations.play("close", 10, false);
            _self.isOpen = false;
        }
    }
    _self.IsOpen = function()
    {
        for (s of _self.Switches) 
        {
            if (!s.isActivated) 
            {
                return false;
            }
        }
        return true;
    }

    return _self;

}