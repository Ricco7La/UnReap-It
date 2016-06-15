function Out(game,x,y,w,h)
{
	
   game.physics.p2.enable(_self);
   _self.body.debug = Application.debugMode;

   _self.Exit = function()
   {
        this.state.start("Title");
   }
   return _self;

}