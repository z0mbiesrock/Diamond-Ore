const cryoCent = extendContent(GenericCrafter, "cryocentrifuge", {
    icons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-rotator"),
            Core.atlas.find(this.name + "-top"),
        ];
    }
});
cryoCent.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, cryoCent, {
	draw(){
		Draw.rect(this.region, this.x, this.y);

		Draw.color(this.outputLiquid.color);
		Draw.alpha(this.liquids.total() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(cryoCent.name + "-liquid"), this.x, this.y);
		Draw.color();
        Draw.rect(Core.atlas.find(cryoCent.name + "-rotator"),this.drawx(),this.drawy(), this.totalProgress);
		Draw.rect(Core.atlas.find(cryoCent.name + "-top"), this.x, this.y);
	},
});