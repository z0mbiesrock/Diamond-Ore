
const SuiAirT1 = extendContent(UnitType, "gnat", {
});
SuiAirT1.constructor = () => extend(UnitEntity, {});
SuiAirT1.ammoType = AmmoTypes.power;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SuiAirT1, 60 * 5, ItemStack.with(Items.silicon, 5, Items.blastCompound, 1, Items.plastanium, 1, diamondItem, 1)));