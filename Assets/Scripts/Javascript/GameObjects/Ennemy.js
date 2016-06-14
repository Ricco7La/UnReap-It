function Ennemy (_game, _path, _type) {

    var type = _type || "Vampire";
    var _self = _game.add.sprite(_path[0].x, _path[0].y, type);

    _self.anchor.set(0.5);

    _self.Path = _path;
    _self.pathIndex = 1;

    // speed in pixel/second
    _self.speed = 50;

    // time between rotation
    _self.timeRotation = 2500;

    _game.physics.p2.enable(_self);

    _self.animations.add('moveDown', [0,1,2,3]);
    _self.animations.add('moveLeft', [4,5,6,7]);
    _self.animations.add('moveRight', [8,9,10,11]);
    _self.animations.add('moveUp', [12,13,14,15]);
    
    _self.body.thrust(0);
    _self.body.fixedRotation = true;
    // clear collision so they don't collide with each other
    _self.body.clearCollision(true);
    _self.body.debug = Application.debugMode;

    _self.body.collideWorldBounds = true;

    _self.animations.play('moveDown', 7, true);

    console.log(_self.body);

    _self.tween = null;

    //Go to the next Point in the predifined path
    _self.MoveToPathPoint = function()
    {
        var previousX = _self.position.x;
        var previousY = _self.position.y;
        var nextX = _self.Path[_self.pathIndex].x;
        var nextY = _self.Path[_self.pathIndex].y;

        var length = Math.sqrt((nextX - previousX) * (nextX - previousX) + (nextY - previousY) * (nextY - previousY));
        var duration = length * 1000 / _self.speed;

        // Ennemy rotating
        if (Math.abs(nextX - previousX) == 0 && Math.abs(nextY - previousY) == 0) 
        {
            duration = _self.timeRotation;
            switch (_self.Path[_self.pathIndex].rotation) {
                case 0:
                    _self.animations.play('moveRight',7,true);
                    break;
                case 90:
                    _self.animations.play('moveDown',7,true);
                    break;
                case 180:
                    _self.animations.play('moveLeft',7,true);
                    break;
                case 270:
                    _self.animations.play('moveUp',7,true);
                    break;
            }
        }
        //Ennemy walking
        else if (Math.abs(nextX - previousX) > Math.abs(nextY - previousY)) 
        {
            if (nextX > previousX) 
            {
                _self.animations.play('moveRight',7,true);
            }
            else
            {
                _self.animations.play('moveLeft',7,true);
            }
        }
        else 
        {
            if (nextY > previousY) 
            {
                _self.animations.play('moveDown',7,true);
            }
            else
            {
                _self.animations.play('moveUp',7,true);
            }
        }

        _self.tween = _game.add.tween(_self.body).to( { x: nextX, y: nextY}, duration, Phaser.Easing.Linear.None, true);
        _self.tween.onComplete.add(function() {
            _self.pathIndex++;
            if (_self.pathIndex == _self.Path.length) _self.pathIndex = 0;
            _self.MoveToPathPoint();
        }, this);
        _self.tween.start();
    }

    

    _self.MoveToPathPoint();
    return _self;
}

