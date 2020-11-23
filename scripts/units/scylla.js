const SpoNavT3 = extendContent(UnitType, "scylla", {
});
SpoNavT3.constructor = () => extend(UnitWaterMove, {
	update(){
		this.super$update();
		this.heal(0.9);
	},	
});
SpoNavT3.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-serpent"), Vars.content.getByName(ContentType.unit, "diamond-ore-scylla")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
