const register = require("diamond-ore/units/unitReg");
const SpoNavT3 = extendContent(UnitType, "scylla", {
});
SpoNavT3.constructor = () => extend(UnitWaterMove, {
	update(){
		this.super$update();
		if (this.healthf() < 1){
			this.health += 0.25;
			this.clampHealth();
		}
	},

	classId: () => SpoNavT3.classId
});
register(SpoNavT3);
SpoNavT3.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-serpent"), Vars.content.getByName(ContentType.unit, "diamond-ore-scylla")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
