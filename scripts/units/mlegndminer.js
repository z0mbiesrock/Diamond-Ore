//Don't ask where I stol-copied this code from.
/* First three tiers of the "mleGnd"



*/
const register = require("diamond-ore/units/unitReg");
const minerScaredStatus = new StatusEffect("ground-miner-scared");
minerScaredStatus.speedMultiplier = 6;
minerScaredStatus.healthMultiplier = 2;
minerScaredStatus.effect = Fx.none;
const minerAngeredStatus = new StatusEffect("ground-miner-angered");
minerScaredStatus.speedMultiplier = 9;
minerScaredStatus.healthMultiplier = 3;
minerScaredStatus.effect = Fx.none;
const mleGndMinerAI = prov(() => {
  var u = extend(MinerAI, {
    updateMovement(){
		if(this.unit.hasEffect(minerScaredStatus)){
			var nearestfoe = Units.closestTarget(this.unit.team, this.unit.x, this.unit.y, 400);
			var vec = Vec2(this.unit.x, this.unit.y);
			if(nearestfoe != null){
				this.unit.moveAt(vec.trns(this.unit.angleTo(nearestfoe) + 180 + Mathf.range(12), this.unit.speed()));
			}
			else{
				this.unit.moveAt(vec.trns(Mathf.lerp(this.unit.rotation, Mathf.random(360), 0.1275), this.unit.speed()));
			}
		}
		else if(this.unit.hasEffect(minerAngeredStatus)){
			var nearestfoe = Units.closestTarget(this.unit.team, this.unit.x, this.unit.y, 400);
			var vec = Vec2(this.unit.x, this.unit.y);
			if(nearestfoe != null){
				//this.unit.moveAt(vec.trns(this.unit.angleTo(nearestfoe), this.unit.speed()));
				this.moveTo(nearestfoe, 10);
			}
			else{
				this.super$updateMovement();
			}
		}
		else{
			this.super$updateMovement();
		}
		var boost = false;
		var lookCone = Mathf.range(60);
		var blocked = Vars.world.raycast(this.unit.tileX(), this.unit.tileY(), this.unit.tileX() + Angles.trnsx(this.unit.rotation + lookCone, 2), this.unit.tileY() + Angles.trnsy(this.unit.rotation + lookCone, 2), (x, y) => {
			var tile = Vars.world.tile(x, y);
			var floor = Vars.world.floor(x, y);
			if(tile != null){
				return (tile.solid() || floor.isDeep());
			}
			else{
				return false;
			}
		});
		if(blocked){
			boost = true;
		}
		else{
			boost = false;
		}
		this.unit.elevation = Mathf.approachDelta(this.unit.elevation, Mathf.num(boost || this.unit.onSolid() || this.unit.hasEffect(minerScaredStatus)), 0.08 + (Mathf.num(this.unit.hasEffect(minerScaredStatus)) * 0.16));
		if(this.unit.moving()){
            this.unit.lookAt(this.unit.vel.angle());
        }
    },
	
    updateTargeting(){
		if(this.unit.hasEffect(minerAngeredStatus)){
			  var ret = this.retarget();
			  if(ret){
				this.target = this.findTarget(this.unit.x, this.unit.y, this.unit.range(), this.unit.type.targetAir, this.unit.type.targetGround);
			  }
			  if(this.invalid(this.target)){
				this.target = null;
			  }
			if(this.unit.hasWeapons()){
				this.updateWeapons();
			}
		}		
	}
  });
  
  return u;
});
const mleGndT1 = extendContent(UnitType, "sparrow", {
});
mleGndT1.constructor = () => extend(MechUnit, {
	update(){
		this.super$update();
		if (this.hitTime > 0 && this.health > 0 && this.damaged() && this.hasEffect(minerScaredStatus) == false){
			Fx.shockwave.at(this.x, this.y);
			this.apply(minerScaredStatus, Mathf.random(140,440));
		}
	},

	classId: () => mleGndT1.classId
});
register(mleGndT1);
mleGndT1.defaultController = mleGndMinerAI;
mleGndT1.targetFlag = BlockFlag.reactor;
const mleGndT2 = extendContent(UnitType, "crow", {
});
mleGndT2.constructor = () => extend(MechUnit, {
	update(){
		this.super$update();
		if (this.hitTime > 0 && this.health > 0 && this.damaged() && this.hasEffect(minerScaredStatus) == false){
			Fx.shockwave.at(this.x, this.y);
			this.apply(minerScaredStatus, Mathf.random(60,240));
		}
	},

	classId: () => mleGndT2.classId
});
register(mleGndT2);
mleGndT2.defaultController = mleGndMinerAI;
mleGndT2.targetFlag = BlockFlag.reactor;
const mleGndT3 = extendContent(UnitType, "owl", {
});
mleGndT3.constructor = () => extend(MechUnit, {
	update(){
		this.super$update();
		if (this.hitTime > 0 && this.health > 0 && this.damaged()){
			if(this.hasEffect(minerAngeredStatus) == false){
				Fx.shockwave.at(this.x, this.y);
				Fx.formsmoke.at(this.x, this.y);
			}
			this.apply(minerAngeredStatus, Mathf.random(120,360));
		}
	},

	classId: () => mleGndT3.classId
});
register(mleGndT3);
mleGndT3.defaultController = mleGndMinerAI;
mleGndT3.targetFlag = BlockFlag.reactor;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
const cryogemItem = Vars.content.getByName(ContentType.item, "diamond-ore-cryogem");
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(mleGndT1, 60 * 25, ItemStack.with(Items.silicon, 60, cryogemItem, 5, diamondItem, 5)));

var upgradeA = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-sparrow"), Vars.content.getByName(ContentType.unit, "diamond-ore-crow")]);
Blocks.additiveReconstructor.upgrades.add(upgradeA.toArray(UnitType));

var upgradeB = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-crow"), Vars.content.getByName(ContentType.unit, "diamond-ore-owl")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgradeB.toArray(UnitType));