Application.Title = function()
{

}



Application.Title.prototype = {

	preload : function()
	{
		
	},

	create: function()
	{ 
		console.log('Title Screen');
		var background = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'background');
		var title = this.game.add.tileSprite(400,30,206,60,'title');

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





	    emitterStart = this.game.add.emitter(60,this.game.world.centerY,500,200);
		emitterStart.makeParticles('redParticles');
	    emitterStart.setRotation(50, 50);
	    emitterStart.setAlpha(0.7, 0.8);
	    emitterStart.setScale(0.1, 0.1);
	    emitterStart.gravity = 0;

	    emitterCredit = this.game.add.emitter(60,this.game.world.centerY + 150,500,200);
		emitterCredit.makeParticles('redParticles');
	    emitterCredit.setRotation(50, 50);
	    emitterCredit.setAlpha(0.7, 0.8);
	    emitterCredit.setScale(0.1, 0.1);
	    emitterCredit.gravity = 0;

	    emitterExit = this.game.add.emitter(60,this.game.world.centerY + 200,500,200);
		emitterExit.makeParticles('redParticles');
	    emitterExit.setRotation(50, 50);
	    emitterExit.setAlpha(0.7, 0.8);
	    emitterExit.setScale(0.1, 0.1);
	    emitterExit.gravity = 0;
		


	 	this.start = this.game.add.text(30, this.game.world.centerY - 10, "Start", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		this.start.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.start.inputEnabled = true;
		this.start.events.onInputOver.add(over,this);
		console.log(this.game.input.mousePointer)
			
			

		var load = this.game.add.text(30, this.game.world.centerY + 40, "Load", { font: "20px Merriweather", fill: "#808DC1", align: "center" });
			load.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		var option = this.game.add.text(30, this.game.world.centerY + 90, "Option", { font: "20px Merriweather", fill: "#808DC1", align: "center" });
			option.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		this.credit = this.game.add.text(30, this.game.world.centerY + 140, "Credit", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		this.credit.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
		this.credit.inputEnabled = true;

		this.quit = this.game.add.text(30, this.game.world.centerY + 190, "Exit", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		this.quit.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);	


		
	},

	update : function()
	{


		if( !(( this.game.input.mousePointer.x |0) >= this.start.x && (this.game.input.mousePointer.y |0) >= this.start.y && (this.game.input.mousePointer.x |0) <= this.start.x + this.start.width && (this.game.input.mousePointer.y |0) <= this.start.y + this.start.height ))
		{
			emitterStart.start(false, 300, 200);	
		}
		
		if( !(( this.game.input.mousePointer.x |0) >= this.credit.x && (this.game.input.mousePointer.y |0) >= this.credit.y && (this.game.input.mousePointer.x |0) <= this.credit.x + this.credit.width && (this.game.input.mousePointer.y |0) <= this.credit.y + this.credit.height ))
		{
			emitterCredit.start(false, 300, 200);
		}

		if( !(( this.game.input.mousePointer.x |0) >= this.quit.x && (this.game.input.mousePointer.y |0) >= this.quit.y && (this.game.input.mousePointer.x |0) <= this.quit.x + this.quit.width && (this.game.input.mousePointer.y |0) <= this.quit.y + this.quit.height ))
		{
			emitterExit.start(false, 300, 200);
		}


		
			
	},

	render : function()
	{

	},

}


function over (item)
{
	this.state.start("Ante2");
}


