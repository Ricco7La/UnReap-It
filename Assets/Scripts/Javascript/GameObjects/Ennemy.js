function Ennemy (_game, _path, _type, _speed, _timeRotation, _rangeView, _amplitude, _areaDetection)
{
    //console.log("CG",_path);
    var type = _type || "Vampire";
    var _self = _game.add.sprite(_path[0].x, _path[0].y, type);
    var areaDetection = _areaDetection || .85;
    _self.rangeView = _rangeView || 150;
    _self.amplitude = _amplitude || 30;
    _self.lastViewed = _game.time.now - 10000;

    _self.playerCG = null;
    _self.fovCG = null;
    _self.FunctionOnSeeing = function() {};

    // speed in pixel/second
    _self.speed = _speed || 50;

    _self.anchor.set(0.5);

    _self.Path = _path;
    _self.pathIndex = 1;

    // Vision angle
    _self.angleOfView = 0;

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

    _self.tween = null;

    _self.FOV = _game.add.graphics(0, 0);
    _self.bringToTop()
    _self.FOVCollider = _game.add.sprite(0, 0);
    _self.FOVCollider.active = true;
    
    _game.physics.p2.enable(_self.FOVCollider);
    _self.FOVCollider.body.debug = Application.debugMode;
    _self.FOVCollider.body.fixedRotation = true;

    //var r = _game.physics.p2.hitTest(_self.position);
    //console.log(r);

    _self.update = function()
    {
        if (_self.FOVCollider.active) 
        {
            _self.FOV.clear();
            _self.FOV.beginFill(0xFBFE00, .5);
            _self.FOV.lineStyle(0, 0xffffff, 0);
            _self.FOV.alpha = 0.5;
            //_self.FOV.moveTo(_self.x, _self.y);
            var poly = _self.CheckVision();
            poly.unshift([_self.x, _self.y]);
            poly.push([_self.x, _self.y]);
    
            var minX = 9000000000000000;
            var maxX = 0;
            var minY = 9000000000000000;
            var maxY = 0;
            for (p of poly) 
            {
                //console.log(p[0]);
                if (p[0] < minX) 
                {
                    //console.log("minX");
                    minX = p[0];
                }
                if (p[0] > maxX) 
                {
                    //console.log("maxX");
                    maxX = p[0];
                }
                if (p[1] < minY) 
                {
                    //console.log("minY");
                    minY = p[1];
                }
                if (p[1]> maxY) 
                {
                    //console.log("maxY");
                    maxY = p[1];
                }
            }
            var h = maxY - minY;
            var w = maxX - minX;
            var offsetH =  (_self.y - maxY) + (_self.y - minY) ;
            var offsetW = (_self.x - maxX) + (_self.x - minX) ;
    
            //_self.FOV.lineTo(_self.x, _self.y);
    
            _self.FOV.drawPolygon(poly);
    
            //_self.FOVCollider.body.clearShapes();
            _self.FOVCollider.body.addPolygon({}, poly);
    
            //console.log("w",w,"h",h)
            var angleRad = Phaser.Math.degToRad(_self.angleOfView);
            
            //console.log(offsetW,offsetH);
            var orientation = 1;
            if (_self.angleOfView == 180 || _self.angleOfView == 270)
            {
                orientation = -1;
            }
            _self.FOVCollider.body.x = _self.x - offsetW * 1/3 * orientation * Math.sin(angleRad) + w * 2/3 * Math.cos(angleRad) ;
            _self.FOVCollider.body.y = _self.y - offsetH * 1/3 * orientation * Math.cos(angleRad) + h * 2/3 * Math.sin(angleRad) ;
            _self.FOVCollider.body.collideWorldBounds = false;
            _self.FOVCollider.body.setCollisionGroup(_self.fovCG);
            _self.FOVCollider.body.collides([_self.playerCG],function()
            {
                _self.FunctionOnSeeing();
            });
    
            _self.FOV.endFill(); 

        }

    }
    _self.CheckVision = function () 
    {
        var startAngle = _self.angleOfView - (_self.amplitude * 0.5);
        var endAngle = _self.angleOfView + (_self.amplitude * 0.5);
        var points = [];
        for (var i = startAngle; i <= endAngle; i += 3) 
        {
            var p = _self.ShotRaycast(i);
            if (p) 
            {   
                points.push([p.x,p.y])
                _self.FOV.lineTo(p.x, p.y);
            }
        }
        return points;
    }
    _self.ShotRaycast = function (_angle) 
    {   
        var p = {x: 0, y: 0};
        p.x = _self.x + Math.cos(Phaser.Math.degToRad(_angle)) * _self.rangeView;
        p.y = _self.y + Math.sin(Phaser.Math.degToRad(_angle)) * _self.rangeView;

        var ray = new Phaser.Line();
        ray.start.set(_self.x, _self.y);
        ray.end.set(p.x, p.y);
        
        var tiles = []
        for (var i = 0; i < Application.Layers["BlockVision"].length; i++) {
            tiles = tiles.concat(Application.Layers[Application.Layers["BlockVision"][i]].getRayCastTiles(ray, 4, false, false));
        }
        
        var lines = [];
        for (var i = 0; i < tiles.length; i++) 
        {
            if (tiles[i].index != -1)
            {   
                // convert tiles position in pixel
                var wall = {
                    x: tiles[i].x * tiles[i].width,
                    y: tiles[i].y * tiles[i].height,
                    width: tiles[i].width,
                    height: tiles[i].height
                };
                var lines = lines.concat([
                    new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
                    new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
                    new Phaser.Line(wall.x + wall.width, wall.y,
                        wall.x + wall.width, wall.y + wall.height),
                    new Phaser.Line(wall.x, wall.y + wall.height,
                        wall.x + wall.width, wall.y + wall.height)
                ]);   
            }
        }
        if (lines.length == 0) return p; 

        var distanceToWall = Number.POSITIVE_INFINITY;
        var closestIntersection = null;
        for (var j = 0; j < lines.length; j++) 
        {
            var intersect = lines[j].intersects(ray, true);
            if (intersect) 
            {
                // Find the closest intersection
                var distance = this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                if (distance < distanceToWall) 
                {
                    distanceToWall = distance;
                    closestIntersection = intersect;
                }
            }
        }
        return closestIntersection;

        
         
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
            _self.angleOfView = _self.Path[_self.pathIndex].rotation;  
        }
        //Ennemy walking
        else if (Math.abs(nextX - previousX) > Math.abs(nextY - previousY)) 
        {
            if (nextX > previousX) 
            {
                _self.animations.play('moveRight',7,true);
                _self.angleOfView = 0;
            }
            else
            {
                _self.animations.play('moveLeft',7,true);
                _self.angleOfView = 180;
            }
        }
        else 
        {
            if (nextY > previousY) 
            {
                _self.animations.play('moveDown',7,true);
                _self.angleOfView = 90;
            }
            else
            {
                _self.animations.play('moveUp',7,true);
                _self.angleOfView = 270;
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

    
    _self.Kill = function()
    {
        var unscale = _game.add.tween(_self.scale).to( { x : 0, y : 0}, 2000, Phaser.Easing.Linear.None, true);
        var rotationScale = _game.add.tween(_self).to( { angle : 60000 }, 1800, Phaser.Easing.Linear.None, true );
        _self.FOV.visible = false;

        _self.FOVCollider.active = false;
        _self.FOVCollider.body.removeCollisionGroup([_self.playerCG],true);
        unscale.onComplete.add(function()
        {
            _self.FOV.destroy();
            _self.FOVCollider.destroy();
            _self.destroy();
            Math.Random.InArray(Application.Layers.Player.Afflictions)();
        })
    }
    _self.MoveToPathPoint();
    return _self;
}

