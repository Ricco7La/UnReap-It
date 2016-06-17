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
*							
*
* Return :
* ----------
* a litteral object with the layer + an array the Ennemies + an array the Souls + an array of Items(switch)
*
*/
function GenerateMap(_Game, _Map, _tilemap, _tilesetName, _tilesetFile ) 
{
	//console.log(_Game);
	_Map = _Game.add.tilemap(_tilemap);
	_Map.addTilesetImage(_tilesetName, _tilesetFile);
	
	console.log("Map");
	console.log(_Map);

	//Collision Group
	var tilesCG = _Game.physics.p2.createCollisionGroup();
	var ennemyCG = _Game.physics.p2.createCollisionGroup();
	var playerCG = _Game.physics.p2.createCollisionGroup();
	var soulCG = _Game.physics.p2.createCollisionGroup();
	var switchCG = _Game.physics.p2.createCollisionGroup();
	var exitCG = _Game.physics.p2.createCollisionGroup();
	var fovCG = _Game.physics.p2.createCollisionGroup();
	var doorCG = _Game.physics.p2.createCollisionGroup();
	var spikeCG = _Game.physics.p2.createCollisionGroup();

	_Game.physics.p2.updateBoundsCollisionGroup();

	/***** Charge Tile Layer from Tiled *****/
	var Layers = {};
	var tilesBodies = [];
	for (prop of _Map.layers) 
	{
		if (prop.visible) 
		{
			Layers[prop.name] = _Map.createLayer(prop.name);
			if (prop.properties.worldSize) 
			{
				Layers[prop.name].resizeWorld();
				_Game.physics.p2.setBoundsToWorld(true, true, true, true, false);
			}
			if (prop.properties.collide) 
			{
				_Map.setCollisionBetween(1, 10000, true, Layers[prop.name]);
				var bodies = _Game.physics.p2.convertTilemap(_Map, Layers[prop.name]);
				tilesBodies = tilesBodies.concat(bodies);
			}
			//console.log(prop.name);
			//console.log(Layers[prop.name]);
			Layers[prop.name].debug = Application.debugMode;
		}

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
		if (el.visible) 
		{
			var array = el.name.split('-');
			var ennemiIndex = array[0];
			var pathIndex = array[1];
			if (EnnemiesPaths[ennemiIndex] == undefined) 
			{
				EnnemiesPaths[ennemiIndex] = [];
			}
			EnnemiesPaths[ennemiIndex][pathIndex] = el;
		}
	}
	var Ennemies = [];
	for (p of EnnemiesPaths) 
	{
		var ennemy = new Ennemy(_Game, p, p[0].type, p[0].properties.speed, p[0].properties.timeRotation);
		ennemy.body.setCollisionGroup(ennemyCG);
		ennemy.body.collides([playerCG]);
		Ennemies.push(ennemy);
		ennemy.fieldOfSight.body.setCollisionGroup(fovCG);
		ennemy.fieldOfSight.body.collides([playerCG], function(){
			console.log("bisous");
		});
	}
	Layers["Ennemies"] = Ennemies;
	console.dir(EnnemiesPaths);

	/* Souls */
	console.log("Souls");
	var SoulsPositions = _Map.objects.Souls;
	var Souls = [];
	for (p of SoulsPositions) 
	{
		if (p.visible) 
		{
			var soul = new Soul(_Game, p.x, p.y);
			soul.body.setCollisionGroup(soulCG);
			soul.body.collides([playerCG],soul.Kill);
		}
	}
	console.dir(SoulsPositions);

	/* Interractions */
	console.log("Interractions");
	var Switches = [];
	var Objects = [];
	for (el of _Map.objects.Interractions) 
	{
		if (el.visible) 
		{
			if(el.name == "Switch")
			{
				var s = new Switch(_Game, el.x, el.y, el.type);
				s.body.setCollisionGroup(switchCG);
				s.body.collides(playerCG, s.Interact);
				Switches[el.properties.index] = s;
			}
		}
	}
	for (el of _Map.objects.Interractions) 
	{
		if (el.visible) 
		{
			switch (el.name)
			{
				case "Door":
					var array = [];
					for (prop of el.properties.switchesIndex.split(",")) 
					{
						array.push(Switches[prop]);
					}
					var s = new Door(_Game, el.x, el.y,el.width,el.height, array, el.type);
					var arrayCollision = [playerCG]
					s.body.setCollisionGroup(doorCG);
					s.SavedCollision = arrayCollision;
					s.body.collides(s.SavedCollision);
					
					Objects.push(s);
					break;
				case 'Spike':
					var array = [];
					for (prop of el.properties.switchesIndex.split(",")) 
					{
						array.push(Switches[prop]);
					}
					var s = new Spike(_Game, el.x, el.y,el.width,el.height, array, el.type);
					var arrayCollision = [playerCG]
					s.body.setCollisionGroup(spikeCG);
					s.SavedCollision = arrayCollision;
					s.body.collides(s.SavedCollision);
					
					Objects.push(s);
					break;
			}
		}
	}
	Layers["InteractObjects"] = Objects;

	/*  Exit  */
	console.log("Exit");
	var Exit = _Map.objects.Exit[0]; //(x,y,width,height);
	var out = new Out(_Game,Exit.x,Exit.y,Exit.width,Exit.height);
		out.body.setCollisionGroup(exitCG);
		out.body.static = true;
		out.body.collides([playerCG], out.Exit);

	console.dir(Exit);

	/* Player Start */
	console.log("StartPosition");
	//console.log(_Map.objects.StartPosition[0]);
	var StartPosition = _Map.objects.StartPosition[0];
	console.dir(StartPosition);
	var myPlayer = new Player(_Game, StartPosition.x, StartPosition.y);
	myPlayer.body.setCollisionGroup(playerCG);
	myPlayer.body.collides([tilesCG, ennemyCG, exitCG, switchCG, doorCG, spikeCG, fovCG]);
	myPlayer.body.collides([soulCG],myPlayer.GetSoul);

	Layers["Player"] = myPlayer;

	return Layers;
}