function Out(game,x,y,w,h)
{

    var _self = game.add.sprite(x, y, "");
    game.physics.p2.enable(_self);
        _self.body.x = x;
        _self.body.y = y;
        _self.body.setRectangle(w,h,10,20,0);

        _self.body.fixedRotation = true;
    
    _self.body.debug = Application.debugMode;

   _self.Exit = function()
   {
        console.log("switch");
        Application.Game.state.start("Title");
   }
   return _self;

}