
const ancientGuardianShoot = newEffect(24, e => {
	Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
	var w = 1 + 13 * e.fout();
	Drawf.tri(e.x, e.y, w, 33 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, w, 8 * e.fout(), e.rotation + 180);
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#dce664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 2 + 12 * e.fin(), e.rotation, 90,d);
    Angles.randLenVectors(e.id, 6, 2 + 18 * e.fin(), e.rotation, 60,d);
    Angles.randLenVectors(e.id, 7, 2 + 24 * e.fin(), e.rotation, 30,d);
});
const ancientGuardianBulletDespawn = newEffect(14, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 15 + 1);
    }}) 
    Angles.randLenVectors(e.id, 11, 80 * e.fin(), e.rotation, 15,d);
});
const ancientGuardianBulletHit = newEffect(24, e => {
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 5, 24 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 1.5);
    const ae = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 5, 24 * e.fin(), e.rotation, 360,ae);
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 16);
});
const ancientGuardianBullet = extend(BasicBulletType, {
	init(b){
		if (b != undefined) {
		this.super$init(b);
		Sounds.shootSnap.at(b.x, b.y);
		}
	},
});
ancientGuardianBullet.speed = 10;
ancientGuardianBullet.lifetime = 25;
ancientGuardianBullet.bulletWidth = 6;
ancientGuardianBullet.bulletHeight = 17;
ancientGuardianBullet.frontColor = Color.valueOf("#deef5a");
ancientGuardianBullet.backColor = Color.valueOf("#ddff00");
ancientGuardianBullet.damage = 45;
ancientGuardianBullet.splashDamage = 100;
ancientGuardianBullet.splashDamageRadius = 16;
ancientGuardianBullet.despawnEffect = ancientGuardianBulletDespawn;
ancientGuardianBullet.hitEffect = ancientGuardianBulletHit;
ancientGuardianBullet.hitSound = Sounds.explosion;
ancientGuardianBullet.shootEffect = ancientGuardianShoot;
ancientGuardianBullet.smokeEffect = Fx.none;
const ancientGuardianWeapon = extendContent(Weapon, "ancient-guardian-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-guardian-equip");
	}
});
ancientGuardianWeapon.width = 14.2;
ancientGuardianWeapon.length = 19;
ancientGuardianWeapon.recoil = 0;
ancientGuardianWeapon.reload = 20;
ancientGuardianWeapon.targetDistance = 150;
ancientGuardianWeapon.minPlayerDist = 9;
ancientGuardianWeapon.inaccuracy = 5;
ancientGuardianWeapon.shots = 6;
ancientGuardianWeapon.velocityRnd = 0.075;
ancientGuardianWeapon.spacing = 0;
ancientGuardianWeapon.shootCone = 100;
ancientGuardianWeapon.alternate = true;
ancientGuardianWeapon.ignoreRotation = true;
ancientGuardianWeapon.bullet = ancientGuardianBullet;
ancientGuardianWeapon.shootSound = Sounds.shotgun;
ancientGuardianWeapon.shootEffect = ancientGuardianShoot;
const ancientGuardianDeathBulletFx = newEffect(24, e => {
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 5, 24 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 1.5);
    const ae = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 5, 24 * e.fin(), e.rotation, 360,ae);
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 16);
});
const ancientGuardianDeathBullet = extend(ArtilleryBulletType, {
	despawned(b){
		try{
			for(var j = 0; j < 3; j++){
				var shockLen = Math.floor(Mathf.random(6,16));
				Lightning.create(b.getTeam(), Color.valueOf("#feef5a"), Mathf.random(45,125), b.x, b.y, b.rot() + Mathf.random(-4,4), shockLen);
			}
			for(var k = 0; k < 8; k++){
				Calls.createBullet(Bullets.flakSurge, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.35, 1.17), Mathf.random(0.6, 1.01));
			}
			this.super$despawned(b);
		}
		catch(fck){
			print(fck);
		}
	},
});
ancientGuardianDeathBullet.speed = 10;
ancientGuardianDeathBullet.lifetime = 25;
ancientGuardianDeathBullet.bulletWidth = 10;
ancientGuardianDeathBullet.bulletHeight = 30;
ancientGuardianDeathBullet.frontColor = Color.valueOf("#decf5a");
ancientGuardianDeathBullet.backColor = Color.valueOf("#ffee00");
ancientGuardianDeathBullet.damage = 45;
ancientGuardianDeathBullet.splashDamage = 320;
ancientGuardianDeathBullet.splashDamageRadius = 64;
ancientGuardianDeathBullet.despawnEffect = ancientGuardianDeathBulletFx;
ancientGuardianDeathBullet.hitEffect = ancientGuardianDeathBulletFx;
ancientGuardianDeathBullet.hitSound = Sounds.explosionbig;
ancientGuardianDeathBullet.shootEffect = Fx.none;
ancientGuardianDeathBullet.smokeEffect = Fx.none;
const ancientGuardianProtection = new StatusEffect("diamond-ore-ancientGuardianProtection");
ancientGuardianProtection.speedMultiplier = 1;
ancientGuardianProtection.armorMultiplier = 8;
ancientGuardianProtection.damageMultiplier = 1;
const ancientGuardianDeathFx = newEffect(40, e => {
    Draw.color(Color.valueOf("#fecf5a"), Color.valueOf("#fcb664"), Mathf.random());
    Lines.stroke(e.fout() * 6);
    Lines.circle(e.x, e.y, e.fin() * 40);
    Lines.stroke(e.fout() * 0.5);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#ffff5a"), Color.valueOf("#fc9624"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12);
    }}) 
    Angles.randLenVectors(e.id, 45, 72 * e.fin(), e.rotation, 360,d);
});
const ancientGuardian = new JavaAdapter(UnitType, {}, "ancient-guardian",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-guardian-cell");
    },
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 1.00);
		}
		Units.nearby(this.getTeam(), this.x, this.y, 80, cons(unit => {
			unit.applyEffect(ancientGuardianProtection, 5);
		}));
    },
    onDeath(){
        Sounds.explosionbig.at(this);
        for(var j = 0; j < 25; j++){
            Calls.createBullet(Bullets.flakSurge, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.35, 1.4), Mathf.random(0.6, 1.1));
		}
        for(var k = 0; k < 12; k++){
            Calls.createBullet(ancientGuardianDeathBullet, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1), Mathf.random(0.6, 1.6));
		}
		Effects.effect(ancientGuardianDeathFx, this.x, this.y, Mathf.random(-360,360));
		this.super$onDeath();
	}
})));
ancientGuardian.weapon = ancientGuardianWeapon;
ancientGuardian.immunities.add(ancientGuardianProtection);