const register = require("diamond-ore/units/unitReg");
const SuiAirT1 = extendContent(UnitType, "gnat", {
});
SuiAirT1.constructor = () => extend(UnitEntity, {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			this.destroy();
		}
	},

	classId: () => SuiAirT1.classId
});
register(SuiAirT1);
SuiAirT1.ammoType = AmmoTypes.power;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SuiAirT1, 60 * 5, ItemStack.with(Items.silicon, 5, Items.blastCompound, 1, Items.plastanium, 1, diamondItem, 1)));