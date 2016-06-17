function Teleport( _game, _x, _y, _w, _h, _teleportX, _teleportY)
{
	
    var _self = _game.add.sprite(_x, _y, "");
    _game.physics.p2.enable(_self);
    _self.teleportPoint = {x: _teleportX, y: _teleportY};
    _self.body.static = true;
    _self.body.x = _x + _w * 0.5;
    _self.body.y = _y + _h * 0.5;
    _self.body.setRectangle(_w,_h,0,0,0);
    _self.body.fixedRotation = true;
   
    _self.body.debug = Application.debugMode;

    _self.teleportPlayer = function ( _teleportBody, _playerBody) {
        _playerBody.x = _self.teleportPoint.x;
        _playerBody.y = _self.teleportPoint.y;

    }

    return _self;

}