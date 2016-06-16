function Soul(game,x,y)
{
	
    var emitter = game.add.emitter(x, y, 100);

    emitter.makeParticles('SoulParticle');
    emitter.minParticleScale = 0.001;
    emitter.maxParticleScale = 0.005;

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.4, 0.4);
    emitter.setScale(0.00001, 0.00001);
    emitter.gravity = -200;

    var _self = game.add.sprite(x, y, "Soul");

    console.log(_self)

    _self.anchor.set(0.5);
    _self.emitter = emitter;
    

    console.log(emitter);

    game.physics.p2.enable(_self);


    _self.animations.add('animate');
    _self.animations.play('animate',10,true);
   
   _self.body.debug = Application.debugMode;
   _self.body.sprite = _self;

   _self.emitter.start(false, 5000, 100);
    _self.Kill = function()
    {   
        _self.body.destroy();
    	console.log("destroy")
    	_self.loadTexture('AnimeSoul',[0]);
    	var deathAnim = _self.animations.add('take');
        _self.emitter.kill();
        deathAnim.killOnComplete = true;
    	_self.animations.play('take',12,false);
    	// _self.destroy();
    }

    return _self;

}