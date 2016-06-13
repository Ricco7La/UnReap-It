function Ennemy (game, path, type) {

    var type = type || "Vampire"
    var _self = game.add.sprite(path[0].x, path[0].y, type);;

    _self.anchor.set(0.5);

    _self.path = path;
    game.physics.p2.enable(_self);

    _self.animations.add('move');
    
    _self.body.setZeroVelocity();
    //_self.body.damping= 0;
    _self.body.mass= 10000000000000000000000000000;
    _self.body.thrust(200)

    _self.body.collideWorldBounds = true;

    _self.animations.play('move', 10, true);

    _self.position.x = 60;

    return _self;
}

