const register = require("diamond-ore/units/unitReg");
const SpoNavT5 = extendContent(UnitType, "leviathan", {
});
SpoNavT5.constructor = () => extend(UnitWaterMove, {
	update(){
		this.super$update();
		if (this.healthf() < 1){
			this.health += 4.0;
			this.clampHealth();
		}
	},

	classId: () => SpoNavT5.classId
});
register(SpoNavT5);
SpoNavT5.abilities.add(new UnitSpawnAbility(UnitTypes.risso, 60 * 45, 0, -32));
//SpoNavT5.targetFlag = BlockFlag.rally;
SpoNavT5.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-charybdis"), Vars.content.getByName(ContentType.unit, "diamond-ore-leviathan")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
