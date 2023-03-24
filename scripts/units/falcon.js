// Falcon does not require unit I/O scripting
//const register = require("diamond-ore/units/unitReg");
const falconAI = prov(() => {
  var u = extend(GroundAI, {
    updateMovement(){
		var nearestfoe = Units.closestTarget(this.unit.team, this.unit.x, this.unit.y, 200);
		var vec = Vec2(this.unit.x, this.unit.y);
		if(nearestfoe != null){
			this.target = nearestfoe;
			this.moveTo(nearestfoe, 16);
		}
		else{
			this.super$updateMovement();
		}
		var boost = false;
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
const MleGndT4 = extendContent(UnitType, "falcon", {
});

MleGndT4.constructor = () => extend(MechUnit, {
});
MleGndT4.defaultController = falconAI;
MleGndT4.targetFlag = BlockFlag.reactor;
//MleGnd1.ammoType = AmmoTypes.power;
var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-owl"), Vars.content.getByName(ContentType.unit, "diamond-ore-falcon")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));