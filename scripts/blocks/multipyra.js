const multiPyra = extendContent(GenericCrafter, "multipyra", {
  load(){
	  this.super$load();
	  this.lightRegion = Core.atlas.find(this.name + "-top");
  },
	
	/* drawBase(tile){
		this.super$drawBase(tile);
		Draw.rect(this.lightRegion, tile.drawx(), tile.drawy());
	}, */
});
multiPyra.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, multiPyra, {
	draw(){
        this.super$draw();
		Draw.alpha(this.warmup);
		Draw.rect(multiPyra.lightRegion, this.x, this.y);
		Draw.reset();
	},	
});