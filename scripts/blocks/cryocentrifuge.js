const cryoCent = extendContent(GenericCrafter, "cryocentrifuge", {
    icons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-rotator"),
            Core.atlas.find(this.name + "-top"),
        ];
    }
});
const cryoLiquid = Liquids.cryofluid;
cryoCent.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, cryoCent, {
	draw(){
		Draw.rect(cryoCent.region, this.x, this.y);
		Draw.color(cryoLiquid.color);
		Draw.alpha(this.liquids.get(cryoLiquid) / cryoCent.liquidCapacity);
		Draw.rect(Core.atlas.find(cryoCent.name + "-liquid"), this.x, this.y);
		Draw.color();
        Draw.rect(Core.atlas.find(cryoCent.name + "-rotator"), this.x, this.y, this.totalProgress);
		Draw.rect(Core.atlas.find(cryoCent.name + "-top"), this.x, this.y);
		Draw.reset();
	},
});