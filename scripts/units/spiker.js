const spikerUnit = extendContent(UnitType, "spiker", {
    
});
spikerUnit.create(prov(() => new JavaAdapter(GroundUnit, { 
	update(){
		this.super$update();
		// Make nearest enemy the movement target
		if(this.meleeTarget == null){
			this.meleeTarget = Units.closestTarget(this.getTeam(), this.x, this.y, 40);
		}
		if(this.meleeTarget != null && (this.meleeTarget.isDead() || this.meleeTarget.dst(this) > 40)){
            this.meleeTarget = null;
        }
		this.closestcore = Vars.state.teams.closestEnemyCore(this.x, this.y, this.getTeam())
		if(this.closestcore != null && (this.closestcore.dst(this) < 40)){
            this.meleeTarget = this.closestcore;
        }
		if (this.meleeTarget != null){
			vel = Vec2(this.x, this.y);
			try{
				//Move slightly faster than the speed of 0.25 to reduce pull from the original pathfinding.
				this.velocity().add(vel.trns(this.angleTo(this.meleeTarget), 0.45 * Time.delta()));
				this.target = this.meleeTarget
				//this.rotation = Mathf.slerpDelta(rotation, this.angleTo(this.meleeTarget), type.rotatespeed);
			}
			catch(error){
				print(error);
				this.target = this.meleeTarget;
			}
		}
		//also avoid clustering
		this.avoidOthers();
	},
})));
//Override BulletType's "range" so the Spiker can start firing
const spikerPierce = extend(BasicBulletType, {
	//OVERRIDE
	range(){
		return 44
	}
	
});
spikerPierce.speed = 2;
spikerPierce.lifetime = 6;
spikerPierce.damage = 25;
spikerPierce.bulletWidth = 0;
spikerPierce.bulletHeight = 0;
spikerPierce.bulletShrink = 0;
spikerPierce.pierce = false;
spikerPierce.despawnEffect = Fx.shootSmall;
spikerPierce.hitEffect = Fx.shootBig;
const spikerWeapon = extendContent(Weapon, "spiker-spike",{});
spikerWeapon.alternate = false;
spikerWeapon.shots = 5;
spikerWeapon.reload = 30;
spikerWeapon.recoil = -3;
spikerWeapon.spacing = 0;
spikerWeapon.inaccuracy = 0;
spikerWeapon.bullet = spikerPierce;
spikerWeapon.shootEffect = Fx.shootBig;

spikerUnit.weapon = spikerWeapon;