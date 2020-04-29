const beelzebubDrone = extendContent(UnitType, "beelzebub-swarm-drone", {
    
});
beelzebubDrone.create(prov(() => new JavaAdapter(flyingUnit, { 
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-beelzebub-swarm-drone-cell");
    },
	update(){
		this.super$update();
		if (this.target.dst(this) < 200){
			this.velocity().add(Mathf.random(-2,2), Mathf.random(-2,2));
			this.avoidOthers();
		}
	},
})));