function Boss (_game, _x, _y, _callbackOnDeath) {


var _self = _game.add.sprite(_x, _y, "Charon");
    _self.animations.add('moveDown', [0,1,2,3]);
    _self.animations.add('moveLeft', [4,5,6,7]);
    _self.animations.add('moveRight', [8,9,10,11]);
    _self.animations.add('moveUp', [12,13,14,15]);
    // actual speed
    _self.speed = 0;
    //speed on move
    _self.SpeedWalking = 1;
    _self.life = 5;
    _self.lastCollision = (_game.time.now - 5000);
    _self.lastInput = _game.time.now;


    
    _self.animations.play('moveDown', 7, true);

    _game.physics.p2.enable(_self);
    _self.body.mass = 2.5;
    _self.body.fixedRotation = true;
    _self.body.thrust(0);
    _self.body.damping = 1;


    _self.body.setRectangle(50,60,0);

    _self.body.debug = Application.debugMode;

    _self.anchor.set(0.5);

    var player = Application.Layers.Player;


    _self.Start = function () 
    {
        _self.CanMove(true);
        setTimeout(function() 
        {
            _self.charge();
        },5000)
    }

    _self.update = function()
    {
        if (_self.position.y < player.position.y - 10) 
        {
            _self.body.y += _self.speed;
            _self.animations.play('moveDown',7,true);
            // _self.body.damping = 0.9;
        }
        else if (_self.position.y > player.position.y + 10)
        {
            _self.body.y -= _self.speed;
            _self.animations.play('moveUp',7,true);
        }
        else if (_self.position.x < player.position.x)
        {
            _self.body.x += _self.speed;
            _self.animations.play('moveRight',7,true);
        }
        else if (_self.position.x > player.position.x)
        {
            _self.body.x -= _self.speed;
            _self.animations.play('moveLeft',7,true);
        }
        if (Application.Game.input.keyboard.isDown(Phaser.Keyboard.K)  && ( _self.lastInput + 500) <_game.time.now )
        {
           _self.collisionWithWater();
        }

    }

    _self.charge = function()
    {
        _self.speed = 0; 
        _self.animations.stop();
        
        setTimeout(function() 
        {
            var px = player.position.x;
            var py = player.position.y;
            _self.tween = _game.add.tween(_self.body).to( { x: px, y: py}, 1000, Phaser.Easing.Circular.In, true);
            _self.tween.onComplete.add(function()
            {
                _self.tween = null
                _self.speed = _self.SpeedWalking;
                setTimeout(function() 
                {
                    _self.charge();

                },5000)

            })
        } ,1000);
    }

    _self.collisionWithWall = function()
    {
        if (_self.tween) {
                _self.tween.stop(true);
        }   
        if (_self.lastCollision + 2500 < _game.time.now) 
        {
            Application.Game.camera.shake(0.1,500);
            _self.lastCollision = _game.time.now;
            
        }
    }

    _self.CanMove = function(bool) 
    {
        if (bool) 
        {
            _self.speed = _self.SpeedWalking;
        }
        else
        {
            _self.speed = 0;
        }
    }

    _self.collisionWithWater = function()
    {

        if (_self.lastCollision + 2500 < _game.time.now) 
        {

            console.log("mouillé");
            _self.life -= 1;
            _self.tint = 0Xf00000;
            setTimeout(function(){
                _self.tint = 0Xffffff;
            },500); 
            if (_self.life == 0) 
            {
                if (_callbackOnDeath) 
                {
                    _callbackOnDeath();
                }
                _self.destroy();
            }
            _self.lastCollision = _game.time.now;
        }
    }
    return _self;

}




