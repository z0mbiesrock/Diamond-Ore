
const crystalConveyor = extendContent(Conveyor, "crystal-conveyor", {
	
	drawLayer: function(tile){
		Blocks.conveyor.drawLayer(tile);
		Draw.rect(Core.atlas.find("diamond-ore-crystal-conveyor-top"), tile.drawx(), tile.drawy());
		//Draw.color();
    },
});