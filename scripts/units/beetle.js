//const register = require("diamond-ore/units/unitReg");

const BeetleShard = extend(BasicBulletType, {
});
BeetleShard.damage = 10;
BeetleShard.width = 6;
BeetleShard.height = 12;
BeetleShard.shrinkY = 0.9;
BeetleShard.shrinkX = 0.9;
BeetleShard.speed = 8;
BeetleShard.lifetime = 45;
BeetleShard.drag = 0.085;
BeetleShard.pierce = true;
BeetleShard.pierceCap = 10;
BeetleShard.despawnEffect = Fx.shootBigSmoke2;
BeetleShard.hitEffect = Fx.mine;
BeetleShard.frontColor = Color.valueOf("#b28768");
BeetleShard.hitColor = Color.valueOf("#b28768");
BeetleShard.backColor = Color.valueOf("#eab678");
BeetleShard.sprite = "diamond-ore-diamondshard";

const SuiAirT3 = extend(UnitType, "beetle", {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			Fx.massiveExplosion.at(this.x, this.y)
			Sounds.explosionbig.at(this.x, this.y);
			for(var k = 0; k < 40; k++){
				BeetleShard.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1.25), Mathf.random(0.5, 1.0));
			}
			this.destroy();
		}
	},
});
/* SuiAirT3.constructor = () => extend(UnitType, {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			Fx.massiveExplosion.at(this.x, this.y)
			Sounds.explosionbig.at(this.x, this.y);
			for(var k = 0; k < 40; k++){
				BeetleShard.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1.25), Mathf.random(0.5, 1.0));
			}
			this.destroy();
		}
	},

	//classId: () => SuiAirT3.classId
}); */
//register(SuiAirT3);
//SuiAirT3.ammoType = AmmoType.PowerAmmoType;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-firefly"), Vars.content.getByName(ContentType.unit, "diamond-ore-beetle")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
