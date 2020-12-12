//Don't ask where I stol-copied this code from.
/* First three tiers of the "spcAir"



*/
const register = require("diamond-ore/units/unitReg");
const spcAirAI = prov(() => {
  var u = extend(FlyingAI, {
    updateMovement(){
		this.super$updateMovement();
		if(this.unit.moving()){
			var thrustvec = Vec2(this.unit.x, this.unit.y);
			this.unit.moveAt(thrustvec.trns(this.unit.rotation, this.unit.speed()));
            this.unit.lookAt(this.unit.vel.angle());
        }
    }
  });
  
  return u;
});
const spcAirT1 = extendContent(UnitType, "scout", {
});
spcAirT1.constructor = () => extend(UnitEntity, {
});
register(spcAirT1);
spcAirT1.defaultController = spcAirAI;
const spcAirT2 = extendContent(UnitType, "fighter", {
});
spcAirT2.constructor = () => extend(UnitEntity, {});
register(spcAirT2);
spcAirT2.defaultController = spcAirAI;
const spcAirT3 = extendContent(UnitType, "destroyer", {
});
spcAirT3.constructor = () => extend(UnitEntity, {});
register(spcAirT3);
spcAirT3.abilities.add(new ShieldRegenFieldAbility(30, 600, 60 * 12, 88));
spcAirT3.defaultController = spcAirAI;
const spcAirT4 = extendContent(UnitType, "cruiser", {
});
spcAirT4.constructor = () => extend(UnitEntity, {});
register(spcAirT4);
spcAirT4.defaultController = spcAirAI;
const spcAirT5 = extendContent(UnitType, "battleship", {
});
spcAirT5.constructor = () => extend(UnitEntity, {});
register(spcAirT5);
spcAirT5.defaultController = spcAirAI;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
const cryogemItem = Vars.content.getByName(ContentType.item, "diamond-ore-cryogem");
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(spcAirT1, 60 * 25, ItemStack.with(Items.silicon, 60, cryogemItem, 5, diamondItem, 5)));

var upgradeA = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-scout"), Vars.content.getByName(ContentType.unit, "diamond-ore-fighter")]);
Blocks.additiveReconstructor.upgrades.add(upgradeA.toArray(UnitType));

var upgradeB = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-fighter"), Vars.content.getByName(ContentType.unit, "diamond-ore-destroyer")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgradeB.toArray(UnitType));

var upgradeC = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-destroyer"), Vars.content.getByName(ContentType.unit, "diamond-ore-cruiser")]);
Blocks.exponentialReconstructor.upgrades.add(upgradeC.toArray(UnitType));

var upgradeD = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-cruiser"), Vars.content.getByName(ContentType.unit, "diamond-ore-battleship")]);
Blocks.tetrativeReconstructor.upgrades.add(upgradeD.toArray(UnitType));