const register = require("diamond-ore/units/unitReg");
const SuiAirT3 = extendContent(UnitType, "beetle", {
});
SuiAirT3.constructor = () => extend(UnitEntity, {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			Fx.massiveExplosion.at(this.x, this.y)
			Sounds.explosionbig.at(this.x, this.y);
			for(var k = 0; k < 40; k++){
				Bullets.standardThorium.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 0.75), Mathf.random(0.5, 1.0));
			}
			for(var nm = 0; nm < 20; nm++){
				Bullets.standardThoriumBig.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 0.75), Mathf.random(0.5, 1.0));
			}
			this.destroy();
		}
	},

	classId: () => SuiAirT3.classId
});
register(SuiAirT3);
SuiAirT3.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-firefly"), Vars.content.getByName(ContentType.unit, "diamond-ore-beetle")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
