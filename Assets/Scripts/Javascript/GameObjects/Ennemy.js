function Ennemy (game, path, type) {

    var type = type || "Vampire"
    var _self = game.add.sprite(0, 0, type);;

    _self.anchor.set(0.5);

    _self.path = path;
    game.physics.p2.enable(_self);

    _self.animations.add('move');
    
    _self.body.collideWorldBounds = true;

    _self.animations.play('move', 10, true);

    return _self;
}

