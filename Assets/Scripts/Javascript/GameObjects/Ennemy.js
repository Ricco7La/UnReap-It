function Ennemy (_game, _path, _type, _speed, _timeRotation, _rangeView, _amplitude, _areaDetection, _switchKill) {

    //console.log("CG",_path);
    var type = _type || "Vampire";
    var _self = _game.add.sprite(_path[0].x, _path[0].y, type);
    var areaDetection = _areaDetection || .85;
    var switchKill = _switchKill || false;

    _self.anchor.set(0.5);

    _self.Path = _path;
    _self.pathIndex = 1;

    // speed in pixel/second
    _self.speed = _speed || 50;

    // time between rotation
    _self.timeRotation = _timeRotation || 2500;

    _game.physics.p2.enable(_self);

    _self.body.setCircle( _self.width * areaDetection);

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

    _self.fieldOfSight = _game.add.graphics(0, 0);

    _self.fieldOfSight.beginFill(0xFFFF0B, 0.3);
    _self.fieldOfSight.lineStyle(1, 0x0000FF);
    _self.rangeView = _rangeView || 150;
    _self.amplitude = _amplitude || 30;
    var midValue = _self.rangeView * Math.tan(Phaser.Math.degToRad(_self.amplitude * 0.5));
    _self.thirdOfSprite = _self.rangeView * 0.666666666666666;
    _self.fieldOfSight.moveTo(0 - _self.thirdOfSprite, 0);
    _self.fieldOfSight.lineTo(_self.rangeView - _self.thirdOfSprite, - midValue);
    _self.fieldOfSight.lineTo(_self.rangeView - _self.thirdOfSprite, midValue);
    _self.fieldOfSight.lineTo(0 - _self.thirdOfSprite, 0);
    _self.fieldOfSight.endFill();

    _game.physics.p2.enable(_self.fieldOfSight);
    _self.fieldOfSight.body.addPolygon({}, 0, 0, _self.rangeView, - midValue, _self.rangeView, midValue);
    
    _self.fieldOfSight.body.clearCollision();
    _self.fieldOfSight.body.fixedRotation = true;

    _self.fieldOfSight.body.debug = Application.debugMode;

    _self.update = function()
    {
        _self.fieldOfSight.body.x = _self.x + _self.thirdOfSprite * Math.cos(Phaser.Math.degToRad(_self.fieldOfSight.body.angle));
        _self.fieldOfSight.body.y = _self.y + _self.thirdOfSprite * Math.sin(Phaser.Math.degToRad(_self.fieldOfSight.body.angle));
        //_self.fieldOfSight.body.updateCollisionMask();
    }


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
        if (Math.abs(nextX - previousX) <= 16 && Math.abs(nextY - previousY) <= 16) 
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
            _self.fieldOfSight.body.angle = _self.Path[_self.pathIndex].rotation;
            _self.fieldOfSight.angle = _self.Path[_self.pathIndex].rotation;  
        }
        //Ennemy walking
        else if (Math.abs(nextX - previousX) > Math.abs(nextY - previousY)) 
        {
            if (nextX > previousX) 
            {
                _self.animations.play('moveRight',7,true);
                _self.fieldOfSight.body.angle = 0;
                _self.fieldOfSight.angle = 0;
            }
            else
            {
                _self.animations.play('moveLeft',7,true);
                _self.fieldOfSight.body.angle = 180;
                _self.fieldOfSight.angle = 180;
            }
        }
        else 
        {
            if (nextY > previousY) 
            {
                _self.animations.play('moveDown',7,true);
                _self.fieldOfSight.body.angle = 90;
                _self.fieldOfSight.angle = 90;
            }
            else
            {
                _self.animations.play('moveUp',7,true);
                _self.fieldOfSight.body.angle = 270;
                _self.fieldOfSight.angle = 270;
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

