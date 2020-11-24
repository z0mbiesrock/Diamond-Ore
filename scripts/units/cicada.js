const SuiAirT5 = extendContent(UnitType, "cicada", {
});
SuiAirT5.constructor = () => extend(UnitEntity, {
	
	
	
});
SuiAirT5.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-scarab"), Vars.content.getByName(ContentType.unit, "diamond-ore-cicada")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
