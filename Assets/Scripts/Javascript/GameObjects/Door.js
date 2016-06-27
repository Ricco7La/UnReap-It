function Door( _game, _x, _y, _w, _h, _switches, _type)
{
	var type = _type || "CellLeft";
    var x = _x + _w * 0.5;
    var y = _y + _h * 0.5;
    var _self = _game.add.sprite(x, y, type);

    // to Improve
    _self.upperPart = _game.add.sprite(x, y, type, 3);
    _self.upperPart.anchor.set(0.5);
    var cropRect = new Phaser.Rectangle(0, 0, _self.width, _self.height * 0.5);
    _self.upperPart.crop(cropRect);
    _self.addChild(_self.upperPart);
    _self.upperPart.y -= _self.height * 0.25;
    _self.upperPart.visible = false;

    _self.SavedCollision = null;
    _self.isOpen = false;
    _self.doorType = type;
    _self.Switches = _switches;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.body.fixedRotation = true;
    _self.body.static = true;

    _self.animations.add("open", [0,1,2,3]);
    _self.animations.add("close", [3,2,1,0]);

   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    //_self.animations.frame = 0;

    _self.update = function()
    {
        var switchesBool = _self.IsOpen();
        if ( switchesBool && !_self.isOpen ) 
        {
            if(_self.doorType == 'CellLeft')
            {
                Application.Game.sound.play('doorOpening', .3);
            }
            else if (_self.doorType == 'HiddenZone')
            {
                Application.Game.sound.play('hidden', .3);
            }
            _self.body.removeCollisionGroup(_self.SavedCollision)
            _self.animations.play("open", 10, false);
            _self.animations.currentAnim.onComplete.add(function () { _self.upperPart.visible = true;});
            _self.isOpen = true;
            
        }
        else if ( !switchesBool && _self.isOpen ) 
        {
            if(_self.doorType == 'CellLeft')
            {
                Application.Game.sound.play('doorClosing', .3);
            }
            else if (_self.doorType == 'HiddenZone')
            {
                Application.Game.sound.play('hidden', .3);
            }
            _self.body.collides(_self.SavedCollision);
            _self.animations.play("close", 10, false);
            _self.isOpen = false;
            _self.upperPart.visible = false;
        }
    }
    _self.IsOpen = function()
    {
        // debugger;
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