extendContent(GenericCrafter, "multipyra", {
	drawBase(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		if (this.tile.cons.valid()) {
			Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
		};
		Draw.reset();
	}
});