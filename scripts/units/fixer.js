
const fixerHeal = newEffect(15, e => {
	Draw.color(Color.valueOf("#00ff00"), Color.valueOf("#00bb77"), e.fin());
    const g = new Floatc2({get(x, y){
    Fill.rect(e.x + x, e.y + y, e.fout() * 4.5, e.fout() * 1.5, 0);
    Fill.rect(e.x + x, e.y + y, e.fout() * 1.5, e.fout() * 4.5, 0);
    }})
    Angles.randLenVectors(e.id, 1, 6 + 6 * e.fin(), 0, 360,g);
});

const fixerHealFull = newEffect(18, e => {
	Draw.color(Color.valueOf("#00ff00"), Color.valueOf("#00bb77"), e.fin());
    const g = new Floatc2({get(x, y){
    Fill.rect(e.x + x, e.y + y, e.fout() * 6, e.fout() * 2, 0);
    Fill.rect(e.x + x, e.y + y, e.fout() * 2, e.fout() * 6, 0);
    }})
    Angles.randLenVectors(e.id, 5, 12 + 6 * e.fin(), 0, 360,g);
});

const fixerUnit = new JavaAdapter(UnitType, {}, "fixer",  prov(() => new JavaAdapter(GroundUnit, {
	draw(){
		this.super$draw();
		try{
			if(this.targetIsBeingRepaired == true){
				clr = Mathf.random(50, 100) / 75
				if(this.targetIsBeingRepaired > 1){
					clr = 1
				}				
				Draw.color(Color.white, this.getTeam().color, clr)
				Drawf.laser(Core.atlas.find("diamond-ore-fixer-laser"),Core.atlas.find("diamond-ore-fixer-laser-end"), this.x, this.y, this.healTarget.x, this.healTarget.y, this.beamstrength);
			}
		}
		catch(wait){
			// Catch is empty because 
		}
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-fixer-cell");
    },
	move(x, y){
		try{
			if(this.targetIsBeingRepaired == false){
				this.super$move(x, y);
			}
		}
		catch(wait){
			this.super$move(x, y);
		}
        
    },
	update(){
		try{
			this.targetIsBeingRepaired = false;
			if(this.healTarget == null){
			this.healTarget = Units.closest(this.getTeam(), this.x, this.y, 96, boolf(unit => unit.health < unit.maxHealth() && unit != this));
			}
			else if (Mathf.chance(1 / 60)){// Randomly retarget if needed.
				this.healTarget = Units.closest(this.getTeam(), this.x, this.y, 96, boolf(unit => unit.health < unit.maxHealth() && unit != this));
			}
			else if (Mathf.chance(1 / 20)){// Randomly retarget to a more injured ally.
				this.currentHeal = this.healTarget.health / this.healTarget.maxHealth();
				this.potentialHeal = Units.closest(this.getTeam(), this.x, this.y, 96, boolf(unit => unit.health < unit.maxHealth() && unit != this));
				this.morehurt = this.potentialHeal.health / this.potentialHeal.maxHealth();
				if (this.morehurt < this.currentHeal){
					this.healTarget = this.potentialHeal;
				}

			}
			if(this.healTarget != null && (this.healTarget.isDead() || this.healTarget.dst(this) > 96 || this.healTarget.health >= this.healTarget.maxHealth())){
				this.healTarget = null;
			}
			else{
				vel = Vec2(this.x, this.y);
				if (this.healTarget.dst(this) > 20){
					this.velocity().add(vel.trns(this.angleTo(this.healTarget), 0.20 * Time.delta()));
				}
				this.avoidOthers();
			}
			if(this.hasEffect(StatusEffects.overdrive) == true){
				this.healRate = 90;
			}
			else{
				this.healRate = 40;
			}
			if(this.healTarget != null){
				this.target = this.healTarget;
				if (this.healTarget.dst(this) <= 56){
					this.targetIsBeingRepaired = true;
					//print(this.beamstrength);					
					this.healTarget.health += (this.healRate / 60) * this.beamstrength;
					this.healTarget.clampHealth();
					if (this.healTarget.health == this.healTarget.maxHealth()){
						Effects.effect(fixerHealFull, this.healTarget);
					}
					else if (Mathf.chance(0.075)){
						Effects.effect(fixerHeal, this.healTarget);
					}
				}
				if(this.targetIsBeingRepaired == true){
					this.beamstrength = Mathf.lerpDelta(this.beamstrength, 1, 0.025);
				}else{
					this.beamstrength = Mathf.lerpDelta(this.beamstrength, 0, -0.0125);
				}
			}

		}
		catch(initial){
			this.targetIsBeingRepaired = false;
			this.beamstrength = 0;
			//print(initial);
			//print("initialized");
			this.healTarget = null;
			this.healRate = 24;
		}
		this.super$update();
	},
})));
//fixerUnit.this.healRate = 24;