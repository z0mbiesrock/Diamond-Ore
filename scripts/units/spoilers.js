// Special Boss units

const ancientAngelShoot = newEffect(24, e => {
	Draw.color(Color.valueOf("#e5fffc"), Color.valueOf("#9cb6f4"), Mathf.random());
	var w = 1 + 13 * e.fout();
	Drawf.tri(e.x, e.y, w, 33 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, w, 8 * e.fout(), e.rotation + 180);
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#aefffa"), Color.valueOf("#e5fffc"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 2 + 12 * e.fin(), e.rotation, 90,d);
    Angles.randLenVectors(e.id, 6, 2 + 18 * e.fin(), e.rotation, 60,d);
    Angles.randLenVectors(e.id, 7, 2 + 24 * e.fin(), e.rotation, 30,d);
});
const ancientAngelBulletDespawn = newEffect(14, e => {
    Draw.color(Color.valueOf("#9ecffa"), Color.valueOf("#9cb6f4"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 15 + 1);
    }}) 
    Angles.randLenVectors(e.id, 11, 80 * e.fin(), e.rotation, 15,d);
});
const ancientAngelBulletHit = newEffect(24, e => {
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#deeffa"), Color.valueOf("#e5fffc"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 5, 24 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 1.5);
    const ae = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decffa"), Color.valueOf("#e5fffc"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 5, 24 * e.fin(), e.rotation, 360,ae);
    Draw.color(Color.valueOf("#e5fffc"), Color.valueOf("#9cb6f4"), Mathf.random());
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 16);
});
const ancientAngelBullet = extend(BasicBulletType, {
	init(b){
		if (b != undefined) {
		this.super$init(b);
		Sounds.shootSnap.at(b.x, b.y);
		//Effects.effect(ancientAngelShoot, b.x, b.y, b.rot());
		}
	},
});
ancientAngelBullet.speed = 10;
ancientAngelBullet.lifetime = 25;
ancientAngelBullet.bulletWidth = 6;
ancientAngelBullet.bulletHeight = 17;
ancientAngelBullet.frontColor = Color.valueOf("#e5fffc");
ancientAngelBullet.backColor = Color.valueOf("#b2fff7");
ancientAngelBullet.damage = 45;
ancientAngelBullet.splashDamage = 100;
ancientAngelBullet.splashDamageRadius = 16;
ancientAngelBullet.despawnEffect = ancientAngelBulletDespawn;
ancientAngelBullet.hitEffect = ancientAngelBulletHit;
ancientAngelBullet.hitSound = Sounds.explosion;
ancientAngelBullet.shootEffect = ancientAngelShoot;
ancientAngelBullet.keepVelocity = false;
ancientAngelBullet.smokeEffect = Fx.none;
const ancientAngelWeapon = extendContent(Weapon, "ancient-angel-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-angel-equip");
	}
});
ancientAngelWeapon.width = 12;
ancientAngelWeapon.length = 24;
ancientAngelWeapon.recoil = 0;
ancientAngelWeapon.reload = 90;
ancientAngelWeapon.inaccuracy = 2;
ancientAngelWeapon.shots = 6;
ancientAngelWeapon.shotDelay = 2;
ancientAngelWeapon.spacing = 0;
ancientAngelWeapon.alternate = true;
ancientAngelWeapon.bullet = ancientAngelBullet;
ancientAngelWeapon.shootSound = Sounds.missile;
const ancientAngelBulletStrong = extend(BasicBulletType, {
	/* init(b){
		if (b != undefined) {
		this.super$init(b);
		Sounds.shootSnap.at(b.x, b.y);
		//Effects.effect(ancientAngelShoot, b.x, b.y, b.rot());
		}
	}, */
});
ancientAngelBulletStrong.speed = 11;
ancientAngelBulletStrong.lifetime = 25;
ancientAngelBulletStrong.bulletWidth = 9;
ancientAngelBulletStrong.bulletHeight = 22;
ancientAngelBulletStrong.frontColor = Color.valueOf("#e5fffc");
ancientAngelBulletStrong.backColor = Color.valueOf("#b2fff7");
ancientAngelBulletStrong.damage = 60;
ancientAngelBulletStrong.splashDamage = 125;
ancientAngelBulletStrong.splashDamageRadius = 25;
ancientAngelBulletStrong.despawnEffect = ancientAngelBulletDespawn;
ancientAngelBulletStrong.hitEffect = ancientAngelBulletHit;
ancientAngelBulletStrong.hitSound = Sounds.shootSnap;
ancientAngelBulletStrong.shootEffect = ancientAngelShoot;
ancientAngelBulletStrong.keepVelocity = false;
ancientAngelBulletStrong.smokeEffect = Fx.shootBig2;
const ancientAngelWeaponStrong = extendContent(Weapon, "ancient-angel-equip-strong", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-angel-equip");
	}
});
ancientAngelWeaponStrong.width = 13;
ancientAngelWeaponStrong.length = 24;
ancientAngelWeaponStrong.recoil = 0;
ancientAngelWeaponStrong.reload = 100;
ancientAngelWeaponStrong.inaccuracy = 0;
ancientAngelWeaponStrong.shots = 11;
ancientAngelWeaponStrong.shotDelay = 0;
ancientAngelWeaponStrong.spacing = 2;
ancientAngelWeaponStrong.shootCone = 100;
ancientAngelWeaponStrong.alternate = true;
ancientAngelWeaponStrong.bullet = ancientAngelBulletStrong;
ancientAngelWeaponStrong.shootSound = Sounds.shotgun;
ancientAngelWeaponStrong.velocityRnd = 0.075;

function angelWing(unit, wdth, scle){
	var lwx = Angles.trnsx(unit.rotation + 90, wdth);
	var lwy = Angles.trnsy(unit.rotation + 90, wdth);
	var rwx = Angles.trnsx(unit.rotation - 90, wdth);
	var rwy = Angles.trnsy(unit.rotation - 90, wdth);
	var wAng1 = Mathf.absin(Time.time(), 7, 90);
	var wAng2 = Mathf.absin(Time.time() + 29, 7, 90);
	var wAng3 = Mathf.absin(Time.time() + 53, 7, 90);
	Draw.rect(Core.atlas.find("diamond-ore-ancient-angel-wing1"), unit.x + lwx, unit.y + lwy, scle * -60, scle * 26, unit.rotation - wAng1 - 5);
	Draw.rect(Core.atlas.find("diamond-ore-ancient-angel-wing1"), unit.x + rwx, unit.y + rwy, scle * 60, scle * 26, unit.rotation + wAng1 - 175);
	Draw.rect(Core.atlas.find("diamond-ore-ancient-angel-wing2"), unit.x + lwx, unit.y + lwy, scle * -90, scle * 22, unit.rotation - wAng2 - 45);
	Draw.rect(Core.atlas.find("diamond-ore-ancient-angel-wing2"), unit.x + rwx, unit.y + rwy, scle * 90, scle * 22, unit.rotation + wAng2 - 135);
	Draw.rect(Core.atlas.find("diamond-ore-ancient-angel-wing3"), unit.x + lwx, unit.y + lwy, scle * -56, scle * 28, unit.rotation - wAng3 - 45);
	Draw.rect(Core.atlas.find("diamond-ore-ancient-angel-wing3"), unit.x + rwx, unit.y + rwy, scle * 56, scle * 28, unit.rotation + wAng3 - 135);
};
const angelBeamHit = newEffect(15, e => {
    Draw.color(Color.white, Color.valueOf("a9e8ff"), e.fin());
    Lines.stroke(e.fout() * 3);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 3);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 12 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 8, 1 + 24 * e.fin(), e.rotation, 36,d);
});
const angelBeamCharge = newEffect(26, e => {
    Draw.color(Color.valueOf("#9ecffa"), Color.valueOf("#9cb6f4"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 15 + 1);
    }}) 
    Angles.randLenVectors(e.id, 11, 40 * e.fout(), e.rotation, 90,d);
});


const urielUnit = new JavaAdapter(UnitType, {}, "angel-uriel",  prov(() => new JavaAdapter(HoverUnit, {
	/* load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	}, */
	invalidPos(x, y){
		return x < -Vars.worldBounds || y < -Vars.worldBounds || x >= Vars.world.width() * Vars.tilesize + Vars.worldBounds || y >= Vars.world.height() * Vars.tilesize + Vars.worldBounds
	},
	calculateDamage(amount){
		var dmgTkn = this.super$calculateDamage(amount);
		finalAmount = dmgTkn * (((75 * (this.health / this.maxHealth())) + 25)/ 100);
		return finalAmount;
	},
	drawEngine(){
		Draw.color(Color.valueOf("#98c6f0"));
		var ox = Angles.trnsx(this.rotation + 140, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 140, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 5);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var ix = Angles.trnsx(this.rotation + 140, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 140, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 4);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#98c6f0"));
		var gx = Angles.trnsx(this.rotation + 220, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 220, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 5);
		Fill.circle(this.x + gx, this.y + gy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var yx = Angles.trnsx(this.rotation + 220, this.type.engineOffset - 1);
		var yy = Angles.trnsy(this.rotation + 220, this.type.engineOffset - 1);
		var ySize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 4);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#98c6f0"));
		var tx = Angles.trnsx(this.rotation + 180, this.type.engineOffset + 1);
		var ty = Angles.trnsy(this.rotation + 180, this.type.engineOffset + 1);
		var tSize = Mathf.absin(Time.time(), 3, this.type.engineSize / 4);
		Fill.circle(this.x + tx, this.y + ty, this.type.engineSize + tSize + 3);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var ynx = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var yny = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var ynSize = Mathf.absin(Time.time(), 6, (this.type.engineSize + 1.5) / 7);
		Fill.circle(this.x + ynx, this.y + yny, (this.type.engineSize + ynSize + 2.25) / 2);
		Draw.color();
		
		angelWing(this, 7, 1);
	},
	drawWeapons(){
        for(var j = 0; j < Mathf.signs.length; j++){
			var i = Mathf.signs[j];
            var tra = this.rotation - 90;
			var trY = -this.type.weapon.getRecoil(this, i > 0) + this.type.weaponOffsetY;
            var w = -i * this.type.weapon.region.getWidth() * Draw.scl;
			var wi = j;
            Draw.rect(this.type.weapon.region, this.x + Angles.trnsx(tra, this.getWeapon().width * i, trY), this.y + Angles.trnsy(tra, this.getWeapon().width * i, trY), w, this.type.weapon.region.getHeight() * Draw.scl, this.weaponAngles[wi] - 90);
        }
	},
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.25);
		}
		if (Mathf.chance(0.125)){
			if (Mathf.chance(0.3)){
				if (this.target != null){
					vel = Vec2(this.x, this.y);
					if (Mathf.chance(0.5)){
						this.velocity().add(vel.trns(this.angleTo(this.target) + 90, 0.90 * Time.delta()));
					}
					else {
						this.velocity().add(vel.trns(this.angleTo(this.target) - 90, -0.90 * Time.delta()));
					}
					this.avoidOthers();
				}
			}
			else{
				this.attack(220);
			}
			/* else if (Mathf.chance(0.02)){
				this.applyEffect(urielAttack, 360);
			} */
		}
		try{
			Units.nearby(this.getTeam(), this.x, this.y, 56, cons(unit => {
				if(unit.isDead() == false && unit.id != this.id){
						var repf = Vec2(this.x, this.y);
						this.velocity().add(repf.trns(this.angleTo(unit), -0.125 * Time.delta()));
				}
			}));
		}
		catch(y){
			print(y);
		}
	},
})));
urielUnit.weapon = ancientAngelWeapon;

const gabrielUnit = new JavaAdapter(UnitType, {}, "angel-gabriel",  prov(() => new JavaAdapter(HoverUnit, {
	/* load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	}, */
	invalidPos(x, y){
		return x < -Vars.worldBounds || y < -Vars.worldBounds || x >= Vars.world.width() * Vars.tilesize + Vars.worldBounds || y >= Vars.world.height() * Vars.tilesize + Vars.worldBounds
	},
	calculateDamage(amount){
		var dmgTkn = this.super$calculateDamage(amount);
		finalAmount = dmgTkn * (((90 * (this.health / this.maxHealth())) + 10)/ 100);
		return finalAmount;
	},
	drawEngine(){
		Draw.color(Color.valueOf("#98c6f0"));
		var ox = Angles.trnsx(this.rotation + 140, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 140, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 5);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var ix = Angles.trnsx(this.rotation + 140, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 140, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 4);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#98c6f0"));
		var gx = Angles.trnsx(this.rotation + 220, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 220, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 5);
		Fill.circle(this.x + gx, this.y + gy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var yx = Angles.trnsx(this.rotation + 220, this.type.engineOffset - 1);
		var yy = Angles.trnsy(this.rotation + 220, this.type.engineOffset - 1);
		var ySize = Mathf.absin(Time.time(), 1.2, this.type.engineSize / 4);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#98c6f0"));
		var tx = Angles.trnsx(this.rotation + 180, this.type.engineOffset + 1);
		var ty = Angles.trnsy(this.rotation + 180, this.type.engineOffset + 1);
		var tSize = Mathf.absin(Time.time(), 3, this.type.engineSize / 4);
		Fill.circle(this.x + tx, this.y + ty, this.type.engineSize + tSize + 3);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var ynx = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var yny = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var ynSize = Mathf.absin(Time.time(), 6, (this.type.engineSize + 1.5) / 7);
		Fill.circle(this.x + ynx, this.y + yny, (this.type.engineSize + ynSize + 2.25) / 2);
		Draw.color();
		
		angelWing(this, 7, 1);
	},
	drawWeapons(){
        for(var j = 0; j < Mathf.signs.length; j++){
			var i = Mathf.signs[j];
            var tra = this.rotation - 90;
			var trY = -this.type.weapon.getRecoil(this, i > 0) + this.type.weaponOffsetY;
            var w = -i * this.type.weapon.region.getWidth() * Draw.scl;
			var wi = j;
            Draw.rect(this.type.weapon.region, this.x + Angles.trnsx(tra, this.getWeapon().width * i, trY), this.y + Angles.trnsy(tra, this.getWeapon().width * i, trY), w, this.type.weapon.region.getHeight() * Draw.scl, this.weaponAngles[wi] - 90);
        }
	},
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.25);
		}
		if (Mathf.chance(0.125)){
			if (Mathf.chance(0.3)){
				if (this.target != null){
					vel = Vec2(this.x, this.y);
					if (Mathf.chance(0.5)){
						this.velocity().add(vel.trns(this.angleTo(this.target) + 90, 0.90 * Time.delta()));
					}
					else {
						this.velocity().add(vel.trns(this.angleTo(this.target) - 90, -0.90 * Time.delta()));
					}
				}
			}
			else{
				this.attack(Mathf.random(130,240));
			}
			/* else if (Mathf.chance(0.02)){
				this.applyEffect(gabrielAttack, 360);
			} */
		}
		try{
			Units.nearby(this.getTeam(), this.x, this.y, 56, cons(unit => {
				if(unit.isDead() == false && unit.id != this.id){
						var repf = Vec2(this.x, this.y);
						this.velocity().add(repf.trns(this.angleTo(unit), -0.125 * Time.delta()));
				}
			}));
		}
		catch(y){
			print(y);
		}
	},
})));
gabrielUnit.weapon = ancientAngelWeaponStrong;