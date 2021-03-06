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
    _self.sound = Application.Game.add.audio('soul');
    _self.sound.volume = .3;
    _self.scale.setTo(0.75);

    _self.anchor.set(0.5);
    _self.emitter = emitter;

    game.physics.p2.enable(_self);


    _self.animations.add('animate');
    _self.animations.play('animate',7,true);
   
    _self.body.debug = Application.debugMode;
    _self.body.static = true;
    _self.body.sprite = _self;
    _self.body.setRectangle(16, 32);
    
    _self.emitter.start(false, 3000, 40);

    _self.update = function() 
    {
        _self.emitter.on = _self.inCamera && _self.visible ;
    }

    _self.Kill = function()
    {   
        _self.body.destroy();
        _self.loadTexture('AnimeSoul');
        var deathAnim = _self.animations.add('take');
        //_self.emitter.on = false;
        deathAnim.killOnComplete = true;
        _self.animations.play('take',12,false);
        var endPos = _self.y - 250;
        game.add.tween(_self).to( { y: endPos }, 1000, Phaser.Easing.Linear.Out, true);
        _self.sound.play();
        // _self.destroy();
    }

    return _self;

}