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
			
			//tilesBodies = tilesBodies.concat(bodies);
		}
		//console.log(prop.layerName);
		//console.log(Layers[prop.layerName]);
		Layers[prop.layerName].debug = true;

	}


	var bodies = _Game.physics.p2.convertTilemap(_Map, Layers["Wall"]);

	for (prop of bodies) 
	{
		if (Application.debugMode) 
		{
			prop.debug = true;
		}
		prop.setCollisionGroup(tilesCG);
	}
	console.log("bodies");
	console.log(bodies);

	/***** Charge Object Layer from Tiled *****/
	
	/* Player Start */
	console.log("StartPosition");
	//console.log(_Map.objects.StartPosition[0]);
	var StartPosition = _Map.objects.StartPosition[0];
	console.dir(StartPosition);

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
		console.log('CG',tilesCG);
		var ennemy = new Ennemy(_Game, p, tilesCG,p[0].type);
	}
	Layers["Ennemies"] = Ennemies;
	console.dir(EnnemiesPaths);

	/* Souls */
	console.log("Souls");
	var SoulsPositions = _Map.objects.Souls
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