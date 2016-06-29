function Player (_game, _x, _y)
{
    var _self = _game.add.sprite(_x, _y, "Player");
    _self.soundWalking = _game.add.audio('playerWalking');
    _self.soundWalking.volume = 0.1;
    _self.scale.setTo(0.75);
    var canPlay = true;
    var currentDirection = null;

    _self.isActivated = false;
    _self.lastSoul = _game.time.now;
    _self.speed = 150;
    _self.canMove = true;

    _self.anchor.set(0.5);

    _game.physics.p2.enable(_self);

    _self.body.setRectangle(_self.width,_self.width,0,(_self.height - _self.width) * 0.5);

    _self.animations.add('move_down', [0,1,2,3]);
    _self.animations.add('move_left', [4,5,6,7]);
    _self.animations.add('move_right', [8,9,10,11]);
    _self.animations.add('move_up', [12,13,14,15]);
    
    _self.body.thrust(0);
    _self.body.fixedRotation = true;
    _self.body.collideWorldBounds = true;
    _self.body.mass = 2;

    _game.camera.follow(_self);

    _self.body.debug = Application.debugMode;

    _self.animations.play('move_down', 5, true);

    _self.actionKey = _game.input.keyboard.addKey(Phaser.Keyboard.E);

    _self.keys =  {};
    _self.keys.up = [Phaser.Keyboard.UP, Phaser.Keyboard.Z, Phaser.Keyboard.W];
    _self.keys.left = [Phaser.Keyboard.LEFT, Phaser.Keyboard.Q, Phaser.Keyboard.A];
    _self.keys.down = [Phaser.Keyboard.DOWN, Phaser.Keyboard.S, Phaser.Keyboard.S];
    _self.keys.right = [Phaser.Keyboard.RIGHT, Phaser.Keyboard.D, Phaser.Keyboard.D];

    _self.bmd = Application.Game.make.bitmapData(Application.Game.world.width, Application.Game.world.height);
    _self.bmd.addToWorld();

    _self.innerCircle = new Phaser.Circle(_self.body.x, _self.body.y, 100);
    _self.outerCircle = new Phaser.Circle(_self.body.x, _self.body.y, Application.config.width * 3.5);
    _self.circleLimit = _self.innerCircle.radius / _self.outerCircle.radius;

    _self.lastAffliction = _game.time.now;
    _self.isBlind = false;
    _self.Afflictions = [];

    _self.update = function()
    {
        // _self.scoreSouls.setText("Souls : " + Application.nbrSouls);

        if (_self.canMove)
        {

            if((_game.input.keyboard.isDown(_self.keys.up[0]) 
                        || _game.input.keyboard.isDown(_self.keys.up[1]) 
                        || _game.input.keyboard.isDown(_self.keys.up[2])) && (this.currentDirection == null || this.currentDirection == "UP"))
            {
                this.currentDirection = "UP";
                _self.animations.play('move_up', 5, true);
                _self.body.moveUp(_self.speed);
                _self.body.damping = 0.9;
                if(canPlay)
                {
                    canPlay = false;
                     _self.soundWalking.play();
                    setTimeout(function(){ canPlay = true; }, 400);
                }

            }
            else if((_game.input.keyboard.isDown(_self.keys.left[0]) 
                        || _game.input.keyboard.isDown(_self.keys.left[1]) 
                        || _game.input.keyboard.isDown(_self.keys.left[2])) && (this.currentDirection == null || this.currentDirection == "LEFT"))
            {
                this.currentDirection = "LEFT";
                _self.animations.play('move_left', 5, true);
                _self.body.moveLeft(_self.speed);
                _self.body.damping = 0.9;
                if(canPlay)
                {
                    canPlay = false;
                    _self.soundWalking.play();
                    setTimeout(function(){ canPlay = true; }, 400);
                }
            }
            else if((_game.input.keyboard.isDown(_self.keys.down[0]) 
                        || _game.input.keyboard.isDown(_self.keys.down[1])
                        || _game.input.keyboard.isDown(_self.keys.down[2])) && (this.currentDirection == null || this.currentDirection == "DOWN"))
            {
                this.currentDirection = "DOWN";
                _self.animations.play('move_down', 5, true);

                /** TO DO 
                Problem with P2 physics (issue on phaser) with collideworld bound
                **/

                if(_self.y < Application.Game.world.height - _self.width * .75)
                {
                    _self.body.moveDown(_self.speed);
                    _self.body.damping = 0.9;  
                }
                else
                {
                    _self.body.damping = 1;
                }
                if(canPlay)
                {
                    canPlay = false;
                    _self.soundWalking.play();
                    setTimeout(function(){ canPlay = true; }, 400);
                }
            }
            else if((_game.input.keyboard.isDown(_self.keys.right[0]) 
                        || _game.input.keyboard.isDown(_self.keys.right[1])
                        || _game.input.keyboard.isDown(_self.keys.right[2])) && (this.currentDirection == null || this.currentDirection == "RIGHT"))
            {
                this.currentDirection = "RIGHT";
                _self.animations.play('move_right', 5, true);
                _self.body.moveRight(_self.speed);
                _self.body.damping = 0.9;
                if(canPlay)
                {
                    canPlay = false;
                    _self.soundWalking.play();
                    setTimeout(function(){ canPlay = true; }, 400);
                }
            }
            else
            {
                //_self.body.setZeroVelocity();
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
        }

        if(_self.actionKey.downDuration(5))
        {
            _self.isActivated = true;
        }
        else
        {
            _self.isActivated = false;
        }

        if(_self.isBlind)
        {
            _self.BlindnessView();
        }
    };

    _self.GetSoul = function()
    {
        if (_self.lastSoul + 50 < _game.time.now)
        {
            Application.nbrSouls += 1;
            _self.lastSoul = _game.time.now;
        }
        
    };

    _self.Blindness = function()
    {
        if(_self.lastAffliction + 2500 < _game.time.now)
        {
            var eugeneDial = new AfflictionDialogue(180,350,'eugeneDial',"Oh mon Dieu, j'ai tué quelqu'un! \nJe ne veux plus voir ça!");
            eugeneDial.SetVisible(true);
            
            Application.Game.time.events.add( Phaser.Timer.SECOND * 1.5, function(){
                            eugeneDial.SetVisible(false);
                            _self.BlindnessView();
                            _self.isBlind = true;
                        });
            _self.lastAffliction = _game.time.now;
        }
    };

    _self.BlindnessView = function()
    {
        _self.innerCircle.x = _self.body.x;
        _self.innerCircle.y = _self.body.y;
        _self.outerCircle.x = _self.body.x;
        _self.outerCircle.y = _self.body.y;
        _self.grd = _self.bmd.context.createRadialGradient(_self.innerCircle.x, _self.innerCircle.y, _self.innerCircle.radius, _self.outerCircle.x, _self.outerCircle.y, _self.outerCircle.radius);

        _self.grd.addColorStop(0, 'rgba(0,0,0,0)');
        _self.grd.addColorStop(_self.circleLimit, 'rgba(0,0,0,1)');
        _self.grd.addColorStop(1, 'rgba(0,0,0,1)');

        _self.bmd.cls();
        _self.bmd.circle(_self.outerCircle.x, _self.outerCircle.y, _self.outerCircle.radius, _self.grd);
    }

    _self.ShuffleKeys = function()
    {
        if(_self.lastAffliction + 2500 < _game.time.now)
        {
            var eugeneDial = new AfflictionDialogue(180,350,'eugeneDial',"Vu que tu ne fais pas comme je veux. \nMoi, non plus!");
            eugeneDial.SetVisible(true);

            Application.Game.time.events.add( Phaser.Timer.SECOND * 1.5, function(){
                    eugeneDial.SetVisible(false);
                    Application.Game.camera.shake(0.02);
                });

            var up = _self.keys.up;
            var down = _self.keys.down;
            var left = _self.keys.left;
            var right = _self.keys.right;

            var keys = [up, down, left, right];

            _self.keys.up = Phaser.ArrayUtils.removeRandomItem(keys, 0, keys.length);
            _self.keys.down = Phaser.ArrayUtils.removeRandomItem(keys, 0, keys.length);
            _self.keys.left = Phaser.ArrayUtils.removeRandomItem(keys, 0, keys.length);
            _self.keys.right = Phaser.ArrayUtils.removeRandomItem(keys, 0, keys.length);
            _self.lastAffliction = _game.time.now;
        }
    }

    _self.Afflictions.push(_self.Blindness, _self.ShuffleKeys);

    return _self;
}

