extendContent(GenericCrafter, "cryogem-dissipator", {
	draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());

		Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find("diamond-ore-cryogem-dissipator-liquid"), tile.drawx(), tile.drawy());
		Draw.color();
		Draw.rect(Core.atlas.find("diamond-ore-cryogem-dissipator-top"), tile.drawx(), tile.drawy());
	}
});