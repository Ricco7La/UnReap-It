function Boss (_game, _x,_y) {


var _self = _game.add.sprite(_x, _y, "Charon");
    _self.animations.add('moveDown', [0,1,2,3]);
    _self.animations.add('moveLeft', [4,5,6,7]);
    _self.animations.add('moveRight', [8,9,10,11]);
    _self.animations.add('moveUp', [12,13,14,15]);
    
    _self.animations.play('moveDown', 7, true);

    _game.physics.p2.enable(_self);

    _self.anchor.set(0.5);

var player = Application.Layers.Player;

    _self.update = function()
    {
        
    }

}

