const SpoNavT3 = extendContent(UnitType, "scylla", {
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.heal(Time.delta() * 0.7);
		}
	},	
});
SpoNavT3.constructor = () => extend(UnitWaterMove, {});
SpoNavT3.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-serpent"), Vars.content.getByName(ContentType.unit, "diamond-ore-scylla")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
