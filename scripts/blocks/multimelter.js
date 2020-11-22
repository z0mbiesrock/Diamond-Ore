const multiMelter = extendContent(GenericCrafter, "multimelter", {
    //OVERRIDE
	load(){
		this.super$load();
		this.liquidRegion = Core.atlas.find(this.name + "-liquid");
	},
	/* drawBase: function(tile){
        this.super$drawBase(tile);
        Draw.color();
		Draw.alpha(this.liquids.total() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid"), tile.drawx(), tile.drawy());
        Draw.reset();
	}, */
});
multiMelter.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, multiMelter, {
	draw(){
        this.super$draw();
		Draw.rect(this.region, this.x, this.y);
		Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(this.liquids.total() / this.liquidCapacity);
		Draw.rect(multiMelter.liquidRegion, this.x, this.y);
		Draw.reset()
	},	
});