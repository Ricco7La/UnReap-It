function Door( _game, _x, _y, _w, _h, _switches, _type)
{
	var type = _type || "Cell";
    var x = _x + _w * 0.5;
    var y = _y + _h * 0.5;
    var _self = _game.add.sprite(x, y, type);
    _self.SavedCollision = null;
    _self.isOpen = false;

    _self.Switches = _switches;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.body.fixedRotation = true;
    _self.body.static = true;

    //_self.animations.add("open", [0,1,2]);
    //_self.animations.add("close", [2,1,0]);

    //_self.body.setRectangle(16,16,0,5,0);
   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    _self.animations.frame = 0;

    //_self.animations.play("activate", 7, true);


    _self.Update = function()
    {
        var switchesBool = _self.IsOpen();
        if ( switchesBool && !_self.isOpen ) 
        {
            _self.body.removeCollisionGroup(_self.SavedCollision)
            _self.animations.frame = 1;
            _self.isOpen = true;
        }
        else if ( !switchesBool && _self.isOpen ) 
        {
            /*for (el of sprite.body.data.shapes) 
            {
                // TODO
                console.log(el);
            }*/
            _self.body.collides(_self.SavedCollision);
            _self.animations.frame = 0;
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