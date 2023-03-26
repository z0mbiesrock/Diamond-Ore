
const SpoNavT1 = extend(UnitType, "siren", {
});
SpoNavT1.constructor = () => extend(WaterMoveUnit, {});
//SpoNavT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SpoNavT1.ammoType = new ItemAmmoType(Items.sporePod);;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SpoNavT1, 60 * 25, ItemStack.with(Items.silicon, 15, Items.sporePod, 15, Items.thorium, 5, diamondItem, 5)));