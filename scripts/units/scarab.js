const register = require("diamond-ore/units/unitReg");
const SuiAirT4 = extendContent(UnitType, "scarab", {
});
SuiAirT4.constructor = () => extend(UnitEntity, {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			Fx.massiveExplosion.at(this.x, this.y);
			Fx.massiveExplosion.at(this.x, this.y);
			Sounds.explosionbig.at(this.x, this.y);
			Sounds.explosionbig.at(this.x, this.y);
			for(var k = 0; k < 32; k++){
				Bullets.slagShot.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
				Bullets.heavySlagShot.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
				Bullets.oilShot.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
				Bullets.heavyOilShot.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
				Bullets.fragExplosive.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
			}
			this.destroy();
		}
	},

	classId: () => SuiAirT4.classId
});
register(SuiAirT4);
SuiAirT4.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-beetle"), Vars.content.getByName(ContentType.unit, "diamond-ore-scarab")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
