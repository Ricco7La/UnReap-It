function BossWall( _game, _x, _y, _w, _h, _type)
{
    var x = _x + _w * 0.5;
    var y = _y + _h * 0.5;
    var _self = _game.add.sprite(x, y, _type);

    _game.physics.p2.enable(_self);

    _self.body.fixedRotation = true;
    _self.body.static = true;

    switch(_type) 
    {
        case 'CornerDL':
            _self.body.setRectangle(8, 32, -7, 0);
            break;
        case 'CornerDR':
            _self.body.setRectangle(8, 32, 8, 0);
            break;
        case 'CornerUL':
            _self.body.setRectangle(8, 64, -7, 0);
            break;
        case 'CornerUR':
            _self.body.setRectangle(8, 64, 8, 0);
            break;
        case 'Down':
            _self.body.setRectangle(32, 8, 0, 10);
            break;
        case 'Left':
            _self.body.setRectangle(8, 32, -7, 0);
            break;
        case 'Right':
            _self.body.setRectangle(8, 32, 8, 0);
            break;
        case 'Up':
            _self.body.setRectangle(32, 16, 0, -2);
            break;
    }

   
    _self.body.debug = Application.debugMode;
    _self.body.sprite = _self;

    return _self;

}