
const crystalConveyor = extendContent(Conveyor, "crystal-conveyor", {
	
	drawLayer2: function(tile){
		Draw.rect(Core.atlas.find(this.name+"-top"), tile.drawx(), tile.drawy());
		//Draw.color();
    },
	
	drawBase(tile){
		this.super$drawBase(tile);
		this.drawLayer2(tile);
		//Draw.rect(Core.atlas.find("diamond-ore-crystal-conveyor-top"), tile.drawx(), tile.drawy());
		//Draw.color();
    },
});