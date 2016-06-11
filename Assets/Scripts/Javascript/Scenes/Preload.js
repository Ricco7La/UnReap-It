Application.Preload = function(){}

Application.Preload.prototype = {
	preload: function(){ 
		console.log("Preload preload")

		// on crée un sprite pour la barre de chargement
        var loadingBar = this.add.sprite(Application.config.width / 2, Application.config.height / 2, "loading");
	        loadingBar.anchor.setTo(0.5,0.5);
	    // on défini la barre de chargement et phaser va gérer la bare tout seul
	        this.load.setPreloadSprite(loadingBar);

	    /* 
	    	chargement des assets
	    */


	},
  	create: function(){
  		console.log("Preload finished")
  		// go to title
		this.state.start("Level");	
	}
}