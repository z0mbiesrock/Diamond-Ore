const SuiAirT4 = extendContent(UnitType, "scarab", {
});
SuiAirT4.constructor = () => extend(UnitEntity, {
	
	
	
});
SuiAirT4.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-beetle"), Vars.content.getByName(ContentType.unit, "diamond-ore-scarab")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
