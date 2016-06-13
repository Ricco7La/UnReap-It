/*
*
*
*
*
*/
function GenerateMap(_tilemap, _tilesetName, _tilesetFile, tilesLayers ) 
{
	this.map = this.game.add.tilemap(_tilemap,);
	this.map.addTilesetImage(_tilesetName, _tilesetFile);
	
	console.log(this.map);
	this.layerBackGround = this.map.createLayer("BackGround");
	this.layerBackGround.resizeWorld();
	this.layerWall = this.map.createLayer("Wall");
	this.layerRoad = this.map.createLayer("Road");
	this.layerObject = this.map.createLayer("Object");
	
	this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
	this.layerWall.debug = true;
	this.layerWall.enableBody = true;
	
	//this.layerEnnemiesWalker = this.map.createLayer("EnnemiesWalker");
	console.log(this.map.objects.EnnemiesWalker);
	//this.map.setCollisionBetween(0,11,true,this.layerWall);
}