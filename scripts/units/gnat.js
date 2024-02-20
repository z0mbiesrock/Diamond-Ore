//const register = require("diamond-ore/units/unitReg");
const SuiAirT1 = extend(UnitType, "gnat", {
});
//register(SuiAirT1);
//SuiAirT1.ammoType = AmmoType.PowerAmmoType;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SuiAirT1, 60 * 5, ItemStack.with(Items.silicon, 5, Items.blastCompound, 1, Items.plastanium, 1, diamondItem, 1)));