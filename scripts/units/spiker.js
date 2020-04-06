const spikerUnit = extendContent(UnitType, "spiker", {
    
});
spikerUnit.create(prov(() => new JavaAdapter(GroundUnit, { 
	update(){
		this.super$update();
		// Make nearest enemy the movement target
		this.meleeTarget = Units.closestTarget(this.getTeam(), this.x, this.y, 300);
		if(this.meleeTarget != null && (this.meleeTarget.isDead() || this.meleeTarget.dst(this) > 300)){
            this.meleeTarget = null;
        }
		if (this.meleeTarget != null){
			vel = Vec2(this.x, this.y);
			try{
				this.velocity().add(vel.trns(this.angleTo(this.meleeTarget), 0.25 * Time.delta()));
				//this.target = this.meleeTarget
				this.rotation = Mathf.slerpDelta(rotation, this.angleTo(this.meleeTarget), type.rotatespeed);
			}
			catch(error){
				print(error);
				this.target = this.meleeTarget;
			}
		}
	},
})));