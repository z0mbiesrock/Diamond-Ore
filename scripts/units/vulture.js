const vultureAI = prov(() => {
  var u = extend(GroundAI, {
    updateMovement(){
		this.super$updateMovement();
		var boost = false;
		var blocked = Vars.world.raycast(this.unit.tileX(), this.unit.tileY(), this.unit.tileX() + Angles.trnsx(this.unit.rotation, 1), this.unit.tileY() + Angles.trnsy(this.unit.rotation, 1), (x, y) => {
			var tile = Vars.world.tile(x, y);
			var floor = Vars.world.floor(x, y);
			return (tile.solid() || floor.isDeep());
		});
		if(blocked){
			boost = true;
		}
		else{
			boost = false;
		}
		this.unit.elevation = Mathf.approachDelta(this.unit.elevation, Mathf.num(boost || this.unit.onSolid()), 0.08);
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
	},

	classId: () => MleGndT5.classId
});
register(MleGndT5);
//MleGndT5.defaultController = sparrowMinerAI;
MleGndT5.abilities.add(new StatusFieldAbility(StatusEffects.shielded, 60 * 12, 60 * 13, 40));
MleGndT5.targetFlag = BlockFlag.core;
//MleGnd1.ammoType = AmmoTypes.power;
var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-falcon"), Vars.content.getByName(ContentType.unit, "diamond-ore-vulture")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));