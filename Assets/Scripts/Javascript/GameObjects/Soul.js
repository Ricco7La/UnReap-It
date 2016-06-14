function Soul(game,x,y)
{
	
    var _self = game.add.sprite(x, y, "Soul");

    console.log(_self)

    _self.anchor.set(0.5);


    game.physics.p2.enable(_self);
   

    _self.Kill = function()
    {
    	console.log("destroy")
    	_self.loadTexture('AnimeSoul',[0]);
    	var deathAnim = _self.animations.add('take');
        deathAnim.killOnComplete = true;
    	_self.animations.play('take',12,false);
    	 // _self.destroy();

    }

    return _self;

}