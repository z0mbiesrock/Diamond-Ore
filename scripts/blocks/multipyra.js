extendContent(GenericCrafter, "multipyra", {
	draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		if (tile.entity.cons.valid()) {
			Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
		};
		Draw.reset();
	}
});