const multiMelter = extendContent(AttributeSmelter, "multi-melter", {
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
const slagLiquid = Liquids.slag;
multiMelter.buildType = () => extendContent(AttributeSmelter.AttributeSmelterBuild, multiMelter, {
	draw(){
		Draw.rect(multiMelter.region, this.x, this.y);
		Draw.color(slagLiquid.color);
		Draw.alpha(this.liquids.get(slagLiquid) / multiMelter.liquidCapacity);
		Draw.rect(Core.atlas.find(multiMelter.name + "-liquid"), this.x, this.y);
		Draw.reset();
	},	
});