const beelzebubDrone = extendContent(UnitType, "beelzebub-swarm-drone", {
    
});
beelzebubDrone.create(prov(() => new JavaAdapter(flyingUnit, { 
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-beelzebub-swarm-drone-cell");
    },
	update(){
		this.super$update();
		if (this.target.dst(this) < 200){
			this.velocity().add(Mathf.random(-1,1), Mathf.random(-1,1));
			this.avoidOthers();
		}
	},
})));