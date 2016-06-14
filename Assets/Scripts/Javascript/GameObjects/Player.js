function Player (game, path, type)
{

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

    _self.position.x = 60;

    return _self;

    _self.Update = function()
    {
         
    }
}

