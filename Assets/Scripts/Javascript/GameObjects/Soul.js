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
    	_self.animations.add('take');
    	_self.animations.play('take',10,false);
    	 // _self.destroy();

    }

    _self.Update = function()
    {
    	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	    //console.log(spaceKey)
	    if(spaceKey.isDown)
	    {
	    	_self.Kill();
	    	//console.log('ig space')
	    }
    }
    return _self;

}