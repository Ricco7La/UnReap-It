function Player (_game, _x, _y)
{

    var _self = _game.add.sprite(_x, _y, "Player");
    var currentDirection = null;
    _self.nbrSouls = 0;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.animations.add('move_down', [0,1,2,3]);
    _self.animations.add('move_left', [4,5,6,7]);
    _self.animations.add('move_right', [8,9,10,11]);
    _self.animations.add('move_up', [12,13,14,15]);
    
    _self.body.thrust(0)
    _self.body.fixedRotation = true;
    _self.body.collideWorldBounds = true;


    _game.camera.follow(_self);

    _self.body.debug = Application.debugMode;

    _self.scoreSouls = _game.add.text(50, 50, "Souls : 0", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
    _self.scoreSouls.fixedToCamera = true;

    _self.animations.play('move_down', 5, true);


    _self.Update = function()
    {
        _self.scoreSouls.setText("Souls : " + _self.nbrSouls);

        if((_game.input.keyboard.isDown(Phaser.Keyboard.UP) 
                    || _game.input.keyboard.isDown(Phaser.Keyboard.Z) 
                    || _game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.currentDirection == null || this.currentDirection == "UP"))
        {
            this.currentDirection = "UP";
            _self.animations.play('move_up', 5, true);
            _self.body.moveUp(300);
            _self.body.damping = 0.9;
        }
        else if((_game.input.keyboard.isDown(Phaser.Keyboard.LEFT) 
                    || _game.input.keyboard.isDown(Phaser.Keyboard.Q) 
                    || _game.input.keyboard.isDown(Phaser.Keyboard.A)) && (this.currentDirection == null || this.currentDirection == "LEFT"))
        {
            this.currentDirection = "LEFT";
            _self.animations.play('move_left', 5, true);
            _self.body.moveLeft(300);
            _self.body.damping = 0.9;
        }
        else if((_game.input.keyboard.isDown(Phaser.Keyboard.DOWN) 
                    || _game.input.keyboard.isDown(Phaser.Keyboard.S)) && (this.currentDirection == null || this.currentDirection == "DOWN"))
        {
            this.currentDirection = "DOWN";
            _self.animations.play('move_down', 5, true);
            _self.body.moveDown(300);
            _self.body.damping = 0.9;
        }
        else if((_game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) 
                    || _game.input.keyboard.isDown(Phaser.Keyboard.D)) && (this.currentDirection == null || this.currentDirection == "RIGHT"))
        {
            this.currentDirection = "RIGHT";
            _self.animations.play('move_right', 5, true);
            _self.body.moveRight(300);
            _self.body.damping = 0.9;
        }
        else
        {
            _self.body.damping = 1;
            _self.animations.stop();

            if(this.currentDirection == "UP")
            {
                _self.animations.frame = 12;
            }
            if(this.currentDirection == "LEFT")
            {
                _self.animations.frame = 4;
            }
            if(this.currentDirection == "DOWN")
            {
                _self.animations.frame = 0;
            }
            if(this.currentDirection == "RIGHT")
            {
                _self.animations.frame = 8;
            }
            this.currentDirection = null;
        }
    };

    _self.GetSoul = function(_body1, _body2)
    {
        _self.nbrSouls +=1;
    }
    return _self;
}

