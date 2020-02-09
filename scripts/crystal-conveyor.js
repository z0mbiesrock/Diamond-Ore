
const crystalConveyor = extendContent(Conveyor, "crystal-conveyor", {
	
	drawLayer2: function(tile){
		Draw.rect(Core.atlas.find("diamond-ore-crystal-conveyor-top"), tile.drawx(), tile.drawy());
		//Draw.color();
    },
	
	drawLayer: function(tile){
		Blocks.conveyor.drawLayer(tile);
		this.drawLayer2(tile);
		//Draw.rect(Core.atlas.find("diamond-ore-crystal-conveyor-top"), tile.drawx(), tile.drawy());
		//Draw.color();
    },
});