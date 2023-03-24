const register = require("diamond-ore/units/unitReg");
const cicadaExplosion = Effect(75, e => {
	Draw.color(Color.valueOf("#b28768"), Color.valueOf("#eab678"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 4, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 30, 40 * e.fin(), e.rotation + Mathf.random(-5,5), 360, d);
	Draw.color(Color.valueOf("#eab678"), Color.valueOf("#b28768"), e.fin());
    const fg = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 32 + 1);
    }})
    Angles.randLenVectors(e.id, 100, 240 * e.fin(), e.rotation + Mathf.random(-5,5), 360, fg);
});

const cicadaExplosionShard = extend(BasicBulletType, {
});
cicadaExplosionShard.damage = 40;
cicadaExplosionShard.width = 9;
cicadaExplosionShard.height = 18;
cicadaExplosionShard.shrinkY = 0.5;
cicadaExplosionShard.shrinkX = 0.5;
cicadaExplosionShard.speed = 10;
cicadaExplosionShard.lifetime = 45;
cicadaExplosionShard.drag = 0.085;
cicadaExplosionShard.pierce = true;
cicadaExplosionShard.pierceCap = 10;
cicadaExplosionShard.despawnEffect = Fx.shootBigSmoke2;
cicadaExplosionShard.hitEffect = Fx.mine;
cicadaExplosionShard.frontColor = Color.valueOf("#b28768");
cicadaExplosionShard.hitColor = Color.valueOf("#b28768");
cicadaExplosionShard.backColor = Color.valueOf("#eab678");
cicadaExplosionShard.sprite = "diamond-ore-diamondshard";

const SuiAirT5 = extendContent(UnitType, "cicada", {
});
SuiAirT5.constructor = () => extend(PayloadUnit, {
	update(){
		this.super$update();
		if (this.dead || this.health <= 0){
			cicadaExplosion.at(this.x, this.y)
			Effect.shake(15, 15, this.x, this.y);
			Fx.bigShockwave.at(this.x, this.y);
			for(var i = 0; i < 16; i++){
				cicadaExplosionShard.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.0), 1);
			}
			for(var j = 0; j < 32; j++){
				Bullets.standardIncendiaryBig.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
			}
			for(var k = 0; k < 48; k++){
				Bullets.standardIncendiary.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.5, 1.5), Mathf.random(0.5, 1.0));
			}
			for(var kr = 0; kr < 60; kr++){
				Bullets.standardThorium.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1.25), Mathf.random(0.5, 1.0));
			}
			for(var nm = 0; nm < 40; nm++){
				Bullets.standardThoriumBig.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1.25), Mathf.random(0.5, 1.0));
			}
			this.destroy();
		}
	},

	classId: () => SuiAirT5.classId
});
register(SuiAirT5);
SuiAirT5.ammoType = AmmoTypes.powerHigh;
SuiAirT5.targetFlag = BlockFlag.reactor;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-scarab"), Vars.content.getByName(ContentType.unit, "diamond-ore-cicada")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
