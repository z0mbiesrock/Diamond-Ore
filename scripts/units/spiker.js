const spikerUnit = extendContent(UnitType, "spiker", {
    
});
spikerUnit.create(prov(() => new JavaAdapter(GroundUnit, { 
	update(){
		this.super$update();
		// Make nearest enemy the movement target
		this.target = Units.closestTarget(this.getTeam(), this.x, this.y, 300)
		if (this.target != null){
		tile = world.tileWorld(this.target.x, this.target.y);
		targetTile = Pathfinder.getTargetTile(tile, this.getTeam(), this.target)
		}
	},
})));