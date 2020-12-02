const sparrowScaredStatus = new StatusEffect("sparrow-scared");
sparrowScaredStatus.speedMultiplier = 2;
sparrowScaredStatus.effect = Fx.none;
const sparrowMinerAI = prov(() => {
  var u = extend(MinerAI, {
    setEffectsC(){
		this.attacked = false;
    },
    updateMovement(){
		if(this.unit.hasEffect(sparrowScaredStatus)){
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
  u.setEffectsC();
  
  return u;
});
const MleGnd1 = extendContent(UnitType, "sparrow", {
});
MleGnd1.constructor = () => extend(MechUnit, {});
MleGnd1.defaultController = sparrowMinerAI;
//SpoNavT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
//MleGnd1.ammoType = AmmoTypes.power;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
const cryogemItem = Vars.content.getByName(ContentType.item, "diamond-ore-cryogem");
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(MleGnd1, 60 * 25, ItemStack.with(Items.silicon, 60, cryogemItem, 5, diamondItem, 5)));