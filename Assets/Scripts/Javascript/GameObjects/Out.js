function Out(game,x,y,w,h)
{

    var _self = game.add.sprite(x, y, "");
    game.physics.p2.enable(_self);
    _self.body.static = true;
    _self.body.x = x + w * 0.5;
    _self.body.y = y + h * 0.5;
    _self.body.setRectangle(w,h,0,0,0);
    _self.body.fixedRotation = true;
    _self.lastLvl = game.time.now;
    
    _self.body.debug = Application.debugMode;

   _self.Exit = function()
   {
        if (_self.lastLvl + 50 < game.time.now)
        {
          Application.Game.state.start(Application.lvl[Application.indexLevel], true);
          Application.indexLevel ++;
          _self.lastLvl = game.time.now;
        }
   }
   return _self;

}