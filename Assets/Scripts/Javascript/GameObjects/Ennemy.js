function Ennemy (game, path, type) {

    var type = type || "Vampire"
    var _self = game.add.sprite(path[0].x, path[0].y, type);;

    _self.anchor.set(0.5);

    _self.path = path;
    game.physics.p2.enable(_self);

    _self.animations.add('move_down', [0,1,2,3]);
    _self.animations.add('move_left', [4,5,6,7]);
    _self.animations.add('move_right', [8,9,10,11]);
    _self.animations.add('move_up', [12,13,14,15]);
    
    _self.body.thrust(0)

    _self.body.collideWorldBounds = true;

    _self.animations.play('move_down', 10, true);

    console.log(_self.position.x);

    _self.tween = game.add.tween(_self).to( { x: 300 }, 2000, "Linear", true);
    _self.tween.onComplete.add(function() {
        console.log("Done", _self.x);
    }, this);
    _self.tween.start();

    return _self;
}

