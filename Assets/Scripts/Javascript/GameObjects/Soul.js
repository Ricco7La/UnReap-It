function Soul(game,x,y)
{
	
    var emitter = game.add.emitter(x, y, 200);

    emitter.makeParticles('SoulParticle');
    emitter.minParticleScale = 0.005;
    emitter.maxParticleScale = 0.0075;

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.6);
    emitter.setScale(0.4, 0, 0.4, 0, 2000);
    emitter.gravity = -400;
    emitter.setXSpeed(-75,75);

    var _self = game.add.sprite(x, y, "Soul");
    _self.scale.setTo(0.75);
    console.log(_self)

    _self.anchor.set(0.5);
    _self.emitter = emitter;
    

    console.log(emitter);

    game.physics.p2.enable(_self);


    _self.animations.add('animate');
    _self.animations.play('animate',7,true);
   
   _self.body.debug = Application.debugMode;
   _self.body.sprite = _self;
   _self.body.setRectangle(_self.with * 0.5, _self.height * 0.75);

   _self.emitter.start(false, 3000, 50);
    _self.Kill = function()
    {   
        _self.body.destroy();
    	console.log("destroy")
    	_self.loadTexture('AnimeSoul',[0]);
    	var deathAnim = _self.animations.add('take');
        _self.emitter.on = false;
        deathAnim.killOnComplete = true;
    	_self.animations.play('take',12,false);
    	// _self.destroy();
    }

    return _self;

}