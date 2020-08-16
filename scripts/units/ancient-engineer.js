
const engineerBulletHit = newEffect(12, e => {
    Draw.color(Color.valueOf("#efca98"), Color.valueOf("#9cf664"), Mathf.random());
    Lines.stroke(e.fout() * 0.5);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 3 + 1);
    }}) 
    Angles.randLenVectors(e.id, 4, 8 * e.fin(), e.rotation, 90,d);
});
const engineerBulletShoot = newEffect(30, e => {
    Draw.color(Color.valueOf("#ffba98"), Color.valueOf("#9cf6b4"), e.fin());
    Lines.stroke(e.fout() * 0.75);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 3 + 1);
    }}) 
    Angles.randLenVectors(e.id, 2, 15 * e.fin(), e.rotation, 15,d);
    Angles.randLenVectors(e.id, 2, 10 * e.fin(), e.rotation, 30,d);
    Angles.randLenVectors(e.id, 2, 5 * e.fin(), e.rotation, 45,d);
    const dg = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#efca98").shiftHue(Mathf.random(-6,6)), Color.valueOf("#9cf664").shiftHue(Mathf.random(-6,6)), Mathf.random());
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }}) 
    Angles.randLenVectors(e.id, 5, 38 * e.fin(), e.rotation, 15,dg);
    Angles.randLenVectors(e.id, 5, 28.5 * e.fin(), e.rotation, 22.5,dg);
    Angles.randLenVectors(e.id, 5, 17 * e.fin(), e.rotation, 30,dg);
});
const engineerBullet = extend(HealBulletType, {
	draw(b){
	},
	range(){
		return 32
	}
});
engineerBullet.lifetime = 10;
engineerBullet.speed = 3;
engineerBullet.damage = 5;
engineerBullet.hitSize = 12;
engineerBullet.bulletWidth = 4;
engineerBullet.bulletHeight = 12;
engineerBullet.despawnEffect = Fx.none;
engineerBullet.keepVelocity = false;
engineerBullet.hitEffect = engineerBulletHit;
engineerBullet.hitSound = Sounds.place;
engineerBullet.shootEffect = engineerBulletShoot;
engineerBullet.smokeEffect = Fx.none;
engineerBullet.healPercent = 0.75;
const engineerBase = prov(() => extend(RepairDrone, {
	drawEngine(){
		var tailRegion = Core.atlas.find("diamond-ore-ancient-engineer-tail");
		var randeng = Mathf.randomSeed(this.id) * 240;
		Draw.rect(tailRegion, this.x, this.y, tailRegion.getWidth() * Draw.scl, tailRegion.getHeight() * Draw.scl, this.rotation - 90);
		
		Draw.color(Color.valueOf("#efca98"));
		var ox = Angles.trnsx(this.rotation + 180, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 180, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time() + randeng, 4, this.type.engineSize / 2);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#f7f2c9"));
		var ix = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1.1);
		var iy = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1.1);
		var iSize = Mathf.absin(Time.time() + randeng, 4, this.type.engineSize / 2.5);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-engineer-cell");
    },
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 1.00);
			this.healBy(Time.delta() * Mathf.random(0.2,0.4));
			this.healBy(Time.delta() * Mathf.random(0.4,0.7));
			this.healBy(Time.delta() * Mathf.random(-0.4,0.7));
		}
	}
}));
const ancientEngineerWeapon = extendContent(Weapon, "ancient-engineer-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-engineer-equip");
	}
});
ancientEngineerWeapon.width = 6;
ancientEngineerWeapon.length = 3;
ancientEngineerWeapon.recoil = 1;
ancientEngineerWeapon.reload = 12;
ancientEngineerWeapon.shots = 3;
ancientEngineerWeapon.inaccuracy = 5;
ancientEngineerWeapon.shotDelay = 6;
ancientEngineerWeapon.alternate = true;
ancientEngineerWeapon.bullet = engineerBullet;
ancientEngineerWeapon.shootSound = Sounds.flame;
ancientEngineerWeapon.shootEffect = Fx.none;
ancientEngineerWeapon.smokeEffect = Fx.none;
const ancientEngineer = extendContent(UnitType, "ancient-engineer", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
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
			this.healBy(Time.delta() * 1.00);
			this.healBy(Time.delta() * Mathf.random(0.2,0.4));
			this.healBy(Time.delta() * Mathf.random(0.4,0.7));
			this.healBy(Time.delta() * Mathf.random(-0.4,0.7));
		}
	}
});
ancientEngineer.weapon = ancientEngineerWeapon;
ancientEngineer.create(engineerBase);