//const register = require("diamond-ore/units/unitReg");
const SuiAirT2 = extend(UnitType, "firefly", {
});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-gnat"), Vars.content.getByName(ContentType.unit, "diamond-ore-firefly")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
