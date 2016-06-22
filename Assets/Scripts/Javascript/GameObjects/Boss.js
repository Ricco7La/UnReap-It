function Boss (_game, _x,_y) {


var _self = _game.add.sprite(_x, _y, "Charon");
    _self.animations.add('moveDown', [0,1,2,3]);
    _self.animations.add('moveLeft', [4,5,6,7]);
    _self.animations.add('moveRight', [8,9,10,11]);
    _self.animations.add('moveUp', [12,13,14,15]);
    _self.speed = 1;
    
    _self.animations.play('moveDown', 7, true);

    _game.physics.p2.enable(_self);

    _self.body.setRectangle(70,75,0);

    _self.body.debug = Application.debugMode;

    _self.anchor.set(0.5);

    var player = Application.Layers.Player;

    setTimeout(function() 
    {
        _self.charge();

    },9000)

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

        
    }

    _self.charge = function()
    {
        _self.speed = 0; 
        _self.animations.stop();
        
        setTimeout(function() 
        {
            var px = player.position.x;
            var py = player.position.y;
            _self.tween = _game.add.tween(_self.body).to( { x: px, y: py}, 2000, Phaser.Easing.Sinusoidal.In, true);
            _self.tween.onComplete.add(_self.speed = 1)
        },2000);
    }

}



