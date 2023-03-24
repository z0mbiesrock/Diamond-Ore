const heavyCoalProc = extendContent(GenericCrafter, "heavy-coal-processor", {
	load(){
		this.super$load();
		this.liquidRegion = Core.atlas.find(this.name + "-liquid");
		this.spinnerRegionA = Core.atlas.find(this.name + "-spinner-a");
		this.spinnerRegionB = Core.atlas.find(this.name + "-spinner-b");
	},
    icons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-spinner-a"),
            Core.atlas.find(this.name + "-spinner-b"),
        ];
    }
});
heavyCoalProc.buildType = () => extendContent(GenericCrafter.GenericCrafterBuild, heavyCoalProc, {
	draw(){
        this.super$draw();
		Draw.color(this.liquids.current().color);
		Draw.alpha(this.liquids.currentAmount() / heavyCoalProc.liquidCapacity);
		Draw.rect(heavyCoalProc.liquidRegion, this.x, this.y);
		Draw.reset();
		Draw.rect(heavyCoalProc.spinnerRegionA, this.x, this.y, -5.4 * this.totalProgress);
        Draw.rect(heavyCoalProc.spinnerRegionB, this.x, this.y, 5.7 * this.totalProgress);
		Draw.reset();
	},	
});