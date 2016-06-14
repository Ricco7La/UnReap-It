/*
*
* a MapGenerator to use with .json files from Tiled Editor
* 
*
* Parameters :
* --------------
* _Game: reference to the game
* _Map : reference to the level map
* _tilemap: .json file 
* _tilesetName: name of the tileset in Tiled Editor
* _tilesetFile: .png file
* _tilesLayers: array of litterals objects 
*							=> layerName: name of the layer in Tiled Editor
*							=> worldSize: true if the layer is the base of the world
*							=> collide: true if the layer have to collide with other object
*
* Return :
* ----------
* a litteral object with the layer + an array the Ennemies + an array the Souls + an array of Items(switch)
*
*/
function GenerateMap(_Game, _Map, _tilemap, _tilesetName, _tilesetFile, _tilesLayers ) 
{
	//console.log(_Game);
	_Map = _Game.add.tilemap(_tilemap);
	_Map.addTilesetImage(_tilesetName, _tilesetFile);
	
	//console.log("Map");
	//console.log(_Map);
	var tilesCG = _Game.physics.p2.createCollisionGroup();
	var ennemyCG = _Game.physics.p2.createCollisionGroup();
	var playerCG = _Game.physics.p2.createCollisionGroup();
	var soulCG = _Game.physics.p2.createCollisionGroup();

	_Game.physics.p2.updateBoundsCollisionGroup();

	/***** Charge Tile Layer from Tiled *****/
	var Layers = {};
	var tilesBodies = [];
	for (prop of _tilesLayers) 
	{
		Layers[prop.layerName] = _Map.createLayer(prop.layerName);
		if (prop.worldSize) 
		{
			Layers[prop.layerName].resizeWorld();
			_Game.physics.p2.setBoundsToWorld(true, true, true, true, false);

		}
		if (prop.collide) 
		{
			_Map.setCollisionBetween(1, 800, true, Layers[prop.layerName]);
			var bodies = _Game.physics.p2.convertTilemap(_Map, Layers[prop.layerName]);
			tilesBodies = tilesBodies.concat(bodies);
		}
		//console.log(prop.layerName);
		//console.log(Layers[prop.layerName]);
		Layers[prop.layerName].debug = true;

	}

	//_Map.setCollisionBetween(1, 500, true, Layers["Wall"]);
	//var bodies = _Game.physics.p2.convertTilemap(_Map, Layers["Wall"]);

	for (prop of tilesBodies) 
	{
		if (Application.debugMode) 
		{
			//prop.debug = true;
		}
		prop.setCollisionGroup(tilesCG);
		prop.collides([playerCG,ennemyCG]);
	}


	/***** Charge Object Layer from Tiled *****/

	/* Ennemies */
	console.log("Ennemies");
	//console.log(_Map.objects.Ennemies);
	var EnnemiesPaths = [];
	for (el of _Map.objects.Ennemies) 
	{
		var array = el.name.split('-');
		var ennemiIndex = array[0];
		var pathIndex = array[1];
		if (EnnemiesPaths[ennemiIndex] == undefined) 
		{
			EnnemiesPaths[ennemiIndex] = []
		}
		EnnemiesPaths[ennemiIndex][pathIndex] = el;
	}
	var Ennemies = [];
	for (p of EnnemiesPaths) 
	{
		var ennemy = new Ennemy(_Game, p, p[0].type);
		ennemy.body.setCollisionGroup(ennemyCG);
		ennemy.body.collides([tilesCG, playerCG]);
	}
	Layers["Ennemies"] = Ennemies;
	console.dir(EnnemiesPaths);

	
	/* Player Start */
	console.log("StartPosition");
	//console.log(_Map.objects.StartPosition[0]);
	var StartPosition = _Map.objects.StartPosition[0];
	console.dir(StartPosition);
	var myPlayer = new Player(_Game, StartPosition.x, StartPosition.y);
	myPlayer.body.setCollisionGroup(playerCG);
	myPlayer.body.collides([tilesCG, ennemyCG]);
	myPlayer.body.collides([soulCG], myPlayer.GetSoul);


	Layers["Player"] = myPlayer;


	/* Souls */
	console.log("Souls");
	var SoulsPositions = _Map.objects.Souls;
	var Souls = [];
	for (p of SoulsPositions) 
	{
		var soul = new Soul(_Game, p.x, p.y);
		soul.body.setCollisionGroup(soulCG);
		soul.body.collides([playerCG],soul.Kill);
	}
	console.dir(SoulsPositions);

	/* Interractions */
	console.log("Interractions");
	var Interractions = [];
	for (el of _Map.objects.Interractions) 
	{
		var array = el.name.split('-');
		var type = array[0];
		var index = array[1];
		if (Interractions[index] == undefined) 
		{
			Interractions[index] = []
		}
		Interractions[index].push(el);
	}
	console.log(Interractions);
	



	return Layers;
}