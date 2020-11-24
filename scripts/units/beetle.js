const SuiAirT3 = extendContent(UnitType, "beetle", {
});
SuiAirT3.constructor = () => extend(UnitEntity, {
	
	
	
});
SuiAirT3.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-firefly"), Vars.content.getByName(ContentType.unit, "diamond-ore-beetle")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
