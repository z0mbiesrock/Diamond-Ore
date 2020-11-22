const gemDissipator = extendContent(GenericCrafter, "cryogem-dissipator", {
	/* drawBase: function(tile){
        this.super$drawBase(tile);
        Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(this.liquids.total() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid"), tile.drawx(), tile.drawy());
		Draw.color();
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
        Draw.reset();
	}, */
});
gemDissipator.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, gemDissipator, {
	draw(){
		Draw.rect(this.region, this.x, this.y);
		Draw.color(gemDissipator.outputLiquid.liquid.color);
		Draw.alpha(gemDissipator.liquids.get(gemDissipator.outputLiquid.liquid) / gemDissipator.liquidCapacity);
		Draw.rect(Core.atlas.find(gemDissipator.name + "-liquid"), this.x, this.y);
		Draw.color();
		Draw.rect(Core.atlas.find(gemDissipator.name + "-top"), this.x, this.y);
	},	
});