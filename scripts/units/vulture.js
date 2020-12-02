const register = require("diamond-ore/units/unitReg");
const sparrowScaredStatus = new StatusEffect("sparrow-scared");
sparrowScaredStatus.speedMultiplier = 2;
sparrowScaredStatus.healthMultiplier = 2;
sparrowScaredStatus.effect = Fx.none;
const sparrowMinerAI = prov(() => {
  var u = extend(MinerAI, {
    updateMovement(){
		if(this.unit.hasEffect(sparrowScaredStatus)){
			var nearestfoe = Units.closestTarget(this.unit.getTeam(), this.unit.x, this.unit.y, 160);
			var vec = Vec2(this.unit.x, this.unit.y);
			this.unit.moveAt(vec.trns(this.unit.angleTo(nearestfoe) + 180 + Mathf.range(120), this.unit.speed()));
		}
		else{
			this.super$updateMovement();
			if(this.unit.calculateDamage(sparrowScaredStatus)){
				this.unit.apply(sparrowScaredStatus, Mathf.random(60,240));
			}
		}
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
		this.unit.elevation = Mathf.approachDelta(this.unit.elevation, Mathf.num(boost || this.unit.onSolid() || this.unit.hasEffect(sparrowScaredStatus)), 0.08 + (Mathf.num(this.unit.hasEffect(sparrowScaredStatus)) * 0.16));
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
		if (this.health < currentHealth || this.health > 0){
			this.apply(sparrowScaredStatus, Mathf.random(60,240));
		}
		var currentHealth = this.health;
	},

	classId: () => MleGndT5.classId});
register(MleGndT5);
MleGndT5.defaultController = sparrowMinerAI;
SpoNavT4.abilities.add(new StatusFieldAbility(StatusEffects.shielded, 60 * 6, 60 * 9, 64));
//MleGnd1.ammoType = AmmoTypes.power;
var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-falcon"), Vars.content.getByName(ContentType.unit, "diamond-ore-vulture")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));