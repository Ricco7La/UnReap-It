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
		background = this.game.add.tileSprite(0, 0, Application.config.width, Application.config.height, 'background');
		title = this.game.add.tileSprite(400,30,206,60,'title');

		var start = this.game.add.text(30, this.game.world.centerY - 10, "Start", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
			start.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
			start.inputEnabled = true;
			start.events.onInputOver.add(over,this);

		load = this.game.add.text(30, this.game.world.centerY + 40, "Load", { font: "20px Merriweather", fill: "#808DC1", align: "center" });
		load.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		option = this.game.add.text(30, this.game.world.centerY + 90, "Option", { font: "20px Merriweather", fill: "#808DC1", align: "center" });
		option.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		credit = this.game.add.text(30, this.game.world.centerY + 140, "Credit", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		credit.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		quit = this.game.add.text(30, this.game.world.centerY + 190, "Exit", { font: "20px Merriweather", fill: "#ff1105", align: "center" });
		quit.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

		// start.events.onInputOver.add(this.over, this);
	},

	update : function()
	{


	},

	render : function()
	{


	}
}


function over (item)
{
    item.fill = "#ffff44";
    console.log("ici");
	this.state.start("Story");
}

