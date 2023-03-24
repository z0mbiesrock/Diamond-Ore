const register = require("diamond-ore/units/unitReg");
const vultureRageStatus = new StatusEffect("vulture-enraged");
vultureRageStatus.speedMultiplier = 1.7;
vultureRageStatus.healthMultiplier = 2;
vultureRageStatus.damageMultiplier = 2;
vultureRageStatus.reloadMultiplier = 1.52;
const vultureAI = prov(() => {
  var u = extend(GroundAI, {
    updateMovement(){
		var nearestfoe = Units.closestTarget(this.unit.team, this.unit.x, this.unit.y, 280);
		var vec = Vec2(this.unit.x, this.unit.y);
		var boost = false;
		if(nearestfoe != null){
			this.target = nearestfoe;
			this.moveTo(nearestfoe, 3);
		}
		else{
			this.super$updateMovement();
		}
		var lookCone = Mathf.range(60);
		var blocked = Vars.world.raycast(this.unit.tileX(), this.unit.tileY(), this.unit.tileX() + Angles.trnsx(this.unit.rotation + lookCone, 2), this.unit.tileY() + Angles.trnsy(this.unit.rotation + lookCone, 2), (x, y) => {
			var tile = Vars.world.tile(x, y);
			var floor = Vars.world.floor(x, y);
			return (tile.solid());
		});
		if(blocked){
			boost = true;
		}
		else{
			boost = false;
		}
		this.unit.elevation = Mathf.approachDelta(this.unit.elevation, Mathf.num((boost || this.unit.onSolid()) && (nearestfoe == null || this.unit.dst(this.target) > 40)), 0.08);
		if(this.unit.moving()){
            this.unit.lookAt(this.unit.vel.angle());
        }
    }
  });
  
  return u;
});
const MleGndT5 = extendContent(UnitType, "vulture", {
});

MleGndT5.constructor = () => extend(MechUnit, {
	update(){
		this.super$update();
		if (this.hitTime > 0 && this.health > 0 && this.healthf() < 0.25 && this.hasEffect(vultureRageStatus) == false){
			if (this.hasEffect(vultureRageStatus) == false){
				Fx.bigShockwave.at(this.x, this.y);
				Fx.impactsmoke.at(this.x, this.y);
				Fx.nuclearsmoke.at(this.x, this.y);
			}
			this.apply(vultureRageStatus, Mathf.random(120,480));
		}
	},

	classId: () => MleGndT5.classId
});
register(MleGndT5);
MleGndT5.defaultController = vultureAI;
MleGndT5.abilities.add(new StatusFieldAbility(StatusEffects.shielded, 60 * 12, 60 * 13, 40));
MleGndT5.targetFlag = BlockFlag.core;
//MleGnd1.ammoType = AmmoTypes.power;
var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-falcon"), Vars.content.getByName(ContentType.unit, "diamond-ore-vulture")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));