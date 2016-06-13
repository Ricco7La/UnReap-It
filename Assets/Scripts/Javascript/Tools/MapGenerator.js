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
	console.log(_Game);
	_Map = _Game.add.tilemap(_tilemap);
	_Map.addTilesetImage(_tilesetName, _tilesetFile);
	
	console.log("Map");
	console.log(_Map);

	/***** Charge Tile Layer from Tiled *****/
	var Layers = {};
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
			_Game.physics.p2.convertTilemap(_Map, Layers[prop.layerName]);
			Layers[prop.layerName].enableBody = true;
		}
		console.log(prop.layerName);
		console.log(Layers[prop.layerName]);
		Layers[prop.layerName].alpha = 1;
	}

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