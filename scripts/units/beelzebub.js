const beelzebubDrone = new JavaAdapter(UnitType, {}, "beelzebub-swarm-drone",  prov(() => new JavaAdapter(GroundUnit, {
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-beelzebub-swarm-drone-cell");
    },
	update(){
		this.super$update();
		try{ // Put in a "try"; keep a distance from enemies at all costs
			nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 250);
			if (nearestfoe != null){
				vel = Vec2(this.x, this.y);
				if (nearestfoe.dst(this) < 200){
					this.velocity().add(Mathf.random(-1,1), Mathf.random(-1,1));
				}
				this.avoidOthers();	
			}
		}
		catch(error){
			//print(error);
		}
	},
})));