function Player (game, x, y)
{

    var type = type || "Vampire";
    var _self = game.add.sprite(x, y, type);

    _self.anchor.set(0.5);

    game.physics.p2.enable(_self);

    _self.animations.add('move_down', [0,1,2,3]);
    _self.animations.add('move_left', [4,5,6,7]);
    _self.animations.add('move_right', [8,9,10,11]);
    _self.animations.add('move_up', [12,13,14,15]);
    
    _self.body.thrust(0)

    _self.body.collideWorldBounds = true;

    _self.body.fixedRotation = true;
    

    _self.animations.play('move_down', 7, true);


    _self.Update = function()
    {
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP) 
            || game.input.keyboard.isDown(Phaser.Keyboard.Z) 
            || game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            _self.animations.play('move_up', 7, true);
            _self.body.moveUp(100);
            _self.body.damping = 0.9;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) 
            || game.input.keyboard.isDown(Phaser.Keyboard.Q) 
            || game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            _self.animations.play('move_left', 7, true);
            _self.body.moveLeft(100);
            _self.body.damping = 0.9;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) 
            || game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            _self.animations.play('move_down', 7, true);
            _self.body.moveDown(100);
            _self.body.damping = 0.9;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) 
            || game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            _self.animations.play('move_right', 7, true);
            _self.body.moveRight(100);
            _self.body.damping = 0.9;
        }
        else
        {
            _self.body.damping = 1;
        }
    }
    return _self;
}

