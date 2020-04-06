const fixerUnit = extendContent(UnitType, "fixer", {
    
});
fixerUnit.create(prov(() => new JavaAdapter(GroundUnit, { 
	update(){
		this.super$update();
		targetIsBeingRepaired = false;
		this.healTarget = Units.closest(this.getTeam(), this.x, this.y, 240, unit => unit.health < unit.maxHealth())
		if(this.healTarget != null && (this.healTarget.isDead() || entity.target.dst(tile) > 240 || this.healTarget.health >= this.healTarget.maxHealth())){
            this.healTarget = null;
        }
		else if(this.healTarget != null){
			this.target = this.healTarget;
			if (this.healTarget.dst(tile) <= 56){
				targetIsBeingRepaired = true;
				this.healTarget.health += this.healRate * Time.delta()
				this.healTarget.clampHealth();
				if (this.healTarget.health == this.healTarget.maxHealth()){
					Effects.effect(Fx.heal, this.healTarget)
				}
				Drawf.laser(Core.atlas.find("diamond-ore-fixer-laser"),Core.atlas.find("diamond-ore-fixer-laser-end"), this.x, this.y, this.healTarget.x, this.healTarget.y, this.beamstrength);
			}
		}

        if(this.healTarget != null && targetIsBeingRepaired){
            this.beamstrength = Mathf.lerpDelta(this.beamstrength, 1, 0.08 * Time.delta());
        }else{
            this.beamstrength = Mathf.lerpDelta(this.beamstrength, 0, 0.07 * Time.delta());
        }
	},
})));

fixerUnit.beamstrength = 0;
fixerUnit.healRate = 24;
fixerUnit.healTarget = null;