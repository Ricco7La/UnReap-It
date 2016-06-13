Application.LevelTest = function(){}



Application.LevelTest.prototype = {
	create: function(){ 
		console.log('Game Screen');
		//this.game.physics.startSystem(Phaser.Physics.P2JS);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.map = this.game.add.tilemap('LevelTest');
		this.map.addTilesetImage('map','Tiles');
		
		console.log(this.map);

		this.layerBackGround = this.map.createLayer("BackGround");
		this.layerWall = this.map.createLayer("Wall");
		this.layerRoad = this.map.createLayer("Road");
		this.layerObject = this.map.createLayer("Object");
		
		this.game.physics.enable(this.layerWall, Phaser.Physics.ARCADE);
		this.layerWall.debug = true;
		this.layerWall.enableBody = true;

		this.layerBackGround.resizeWorld();

		//this.layerEnnemiesWalker = this.map.createLayer("EnnemiesWalker");
		console.log(this.map.objects.EnnemiesWalker);

		//this.map.setCollisionBetween(0,11,true,this.layerWall);
	},
	update : function(){


	},
	render : function(){


	}
}

