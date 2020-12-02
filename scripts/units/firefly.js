const register = require("diamond-ore/units/unitReg");
const SuiAirT2 = extendContent(UnitType, "firefly", {
});
SuiAirT2.constructor = () => extend(UnitEntity, {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			this.destroy();
		}
	},

	classId: () => SuiAirT2.classId
});
register(SuiAirT2);
SuiAirT2.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-gnat"), Vars.content.getByName(ContentType.unit, "diamond-ore-firefly")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
