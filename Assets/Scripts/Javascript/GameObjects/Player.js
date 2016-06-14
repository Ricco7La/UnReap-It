function Player (game, x, y)
{

    var type = "Player";
    var _self = game.add.sprite(x, y, type);
    var currentDirection = null;

    _self.anchor.set(0.5);

    game.physics.p2.enable(_self);

    _self.animations.add('move_down', [0,1,2,3]);
    _self.animations.add('move_left', [4,5,6,7]);
    _self.animations.add('move_right', [8,9,10,11]);
    _self.animations.add('move_up', [12,13,14,15]);
    
    _self.body.thrust(0)
    _self.body.fixedRotation = true;
    _self.body.collideWorldBounds = true;

    _self.body.debug = Application.debugMode;

    

    _self.animations.play('move_down', 5, true);


    _self.Update = function()
    {
        if((game.input.keyboard.isDown(Phaser.Keyboard.UP) 
                    || game.input.keyboard.isDown(Phaser.Keyboard.Z) 
                    || game.input.keyboard.isDown(Phaser.Keyboard.W)) && (currentDirection == null || currentDirection == "UP"))
        {
            currentDirection = "UP";
            _self.animations.play('move_up', 5, true);
            _self.body.moveUp(100);
            _self.body.damping = 0.9;
        }
        else if((game.input.keyboard.isDown(Phaser.Keyboard.LEFT) 
                    || game.input.keyboard.isDown(Phaser.Keyboard.Q) 
                    || game.input.keyboard.isDown(Phaser.Keyboard.A)) && (currentDirection == null || currentDirection == "LEFT"))
        {
            currentDirection = "LEFT";
            _self.animations.play('move_left', 5, true);
            _self.body.moveLeft(100);
            _self.body.damping = 0.9;
        }
        else if((game.input.keyboard.isDown(Phaser.Keyboard.DOWN) 
                    || game.input.keyboard.isDown(Phaser.Keyboard.S)) && (currentDirection == null || currentDirection == "DOWN"))
        {
            currentDirection = "DOWN";
            _self.animations.play('move_down', 5, true);
            _self.body.moveDown(100);
            _self.body.damping = 0.9;
        }
        else if((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) 
                    || game.input.keyboard.isDown(Phaser.Keyboard.D)) && (currentDirection == null || currentDirection == "RIGHT"))
        {
            currentDirection = "RIGHT";
            _self.animations.play('move_right', 5, true);
            _self.body.moveRight(100);
            _self.body.damping = 0.9;
        }
        else
        {
            _self.body.damping = 1;
            _self.animations.stop();

            if(currentDirection == "UP")
            {
                _self.animations.frame = 12;
            }
            if(currentDirection == "LEFT")
            {
                _self.animations.frame = 4;
            }
            if(currentDirection == "DOWN")
            {
                _self.animations.frame = 0;
            }
            if(currentDirection == "RIGHT")
            {
                _self.animations.frame = 8;
            }
            currentDirection = null;
        }
    }
    return _self;
}

