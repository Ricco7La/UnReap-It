Application.EndDemo = function()
{

}



Application.EndDemo.prototype = {

	preload : function()
	{
		
	},

	create: function()
	{ 
		//console.log('EndDemo Screen');
		Application.Game.sound.stopAll();
		var background = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'background');
		var title = this.game.add.tileSprite(400,30,206,60,'title');
		this.game.sound.play('title');
		Application.Game.world.width = Application.config.width;
		Application.Game.world.height = Application.config.height;
		Application.Game.camera.x = 0;
		Application.Game.camera.y = 0;

		emitterBack = this.game.add.emitter(this.game.world.centerX + 100, 200, 200);
		emitterBack.makeParticles('blueParticles');

	    // emitterBack.minParticleSpeed.set(0, 300);
	    // emitterBack.maxParticleSpeed.set(0, 600);

		// emitterBack.setRotation(100, 100000);
		emitterBack.setAlpha(0.1, 1, 3000);
		emitterBack.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);
		emitterBack.gravity = 2;
		emitterBack.setXspeed = 50;
		emitterBack.start(false, 1000, 100);

		this.Text = this.game.add.text(this.game.world.centerX , this.game.world.centerY, "Félicitation, vous venez de finir la démo d'UnReap-it\nle premier jeu de la Yamate Team", { font: "20px Lithos Pro", fill: "#fff", align: "center" });
		this.Text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.Text.anchor.x = 0.5;
		this.Text.inputEnabled = true;

		this.back = this.game.add.text(this.game.world.centerX , this.game.world.centerY + 160, "Back to menu", { font: "20px Lithos Pro", fill: "#fff", align: "center" });
		this.back.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.back.anchor.x = 0.5;
		this.back.inputEnabled = true;
		this.back.events.onInputOver.add(backMenu,this);     


	},

	update : function()
	{
		
	},

	render : function()
	{

	},

}

function backMenu (item)
{
	this.state.start("Title");
}



