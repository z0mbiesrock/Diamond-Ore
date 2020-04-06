//require("effects")
const thorTurret = extendContent(DoubleTurret, "thor", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-thor-icon")
		];
	},
});
const odinTurret = extendContent(BurstTurret, "odin", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-odin-icon")
		];
	},
});
const lokiTurret = extendContent(ItemTurret, "loki", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-loki-icon")
		];
	},
});

const yggdrasilCharge = newEffect(40, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 4);
    Lines.circle(e.x, e.y, e.fout() * 20);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 120 * e.fout(), e.rotation, 45,d);
});
const yggdrasilShoot = newEffect(30, e => {
    Draw.color(Color.gold, Color.white, e.fin());
    Lines.stroke(e.fout() * 7);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 32, 1 + 140 * e.fin(), e.rotation, 20,d);
    Draw.color(Color.yellow, Color.white, e.fin());
    Lines.stroke(e.fout() * 9);
    Angles.randLenVectors(e.id, 32, 1 + 170 * e.fin(), e.rotation, 30,d);
    Draw.color(Color.goldenrod, Color.valueOf("#555555"), e.fin());
    Lines.stroke(e.fout() * 11);
    Angles.randLenVectors(e.id, 32, 1 + 200 * e.fin(), e.rotation, 40,d);
    Draw.color(Color.white, Color.white, e.fin());
    Lines.circle(e.x, e.y, e.fin() * 80);
});
const yggdrasilPlasmaTrail = newEffect(45, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 0.25 + e.fin() * 3);
    }})
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fin(), e.rotation + 180, 360 * e.fin(),d);
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fout());
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fout(), e.rotation, 360 * e.fout(),d);
});
const yggdrasilPlasmaExplosion = newEffect(60, e => {
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#999900"), e.fin());
    Lines.stroke(e.fout() * 12);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 12);
    }}) 
    Angles.randLenVectors(e.id, 150, -20 + 360 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), Math.abs(-0.4 + e.fin() * 1.4));
    const g = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 7.4);
    }}) 
    const h = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 12);
    Angles.randLenVectors(e.id, 3, -2 + 9 * e.fin(), e.rotation + Mathf.random(-180,180) * e.fin(), 360,g);
    }}) 
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#bbbb00"), e.fin());
    Angles.randLenVectors(e.id, 25, -20 + 250 * e.fin(), e.rotation, 360,h);
});
const yggdrasilPlasmaExplosionSpark = newEffect(120, e => {
    Draw.color(Color.gold, Color.white, e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * Math.abs(2 + Mathf.random(-1,1) * 2), 45 + e.rotation);
    }}) 
    Angles.randLenVectors(e.id, 20, 10 + 278 * e.fin(), e.rotation, 360,d);
});
const yggdrasilPlasmaFragmentExplosion = newEffect(40, e => {
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#999900"), e.fin());
    Lines.stroke(e.fout() * 4);
    Draw.alpha(e.fout());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 2.5 - Math.abs(2.5 - (e.fin() * 5)));
    }}) 
    Angles.randLenVectors(e.id, 3, -20 + 170 * e.fin(), e.rotation, 45,d);
});

const yggdrasilPlasmaFlakFrag = extend(MissileBulletType, {});
yggdrasilPlasmaFlakFrag.lifetime = 20;
yggdrasilPlasmaFlakFrag.damage = 300;
yggdrasilPlasmaFlakFrag.bulletWidth = 25;
yggdrasilPlasmaFlakFrag.bulletHeight = 200;
yggdrasilPlasmaFlakFrag.bulletShrink = 0.75;
yggdrasilPlasmaFlakFrag.despawnEffect = yggdrasilPlasmaFragmentExplosion;
yggdrasilPlasmaFlakFrag.hitEffect = Fx.none;
yggdrasilPlasmaFlakFrag.frontColor = Color.valueOf("#ffff77");
yggdrasilPlasmaFlakFrag.trailColor = Color.valueOf("#ffff00");
yggdrasilPlasmaFlakFrag.backColor = Color.valueOf("#ffff77");
yggdrasilPlasmaFlakFrag.pierce = true;
yggdrasilPlasmaFlakFrag.status = StatusEffects.shocked;
yggdrasilPlasmaFlakFrag.statusDuration = 300;
yggdrasilPlasmaFlakFrag.bulletSprite = "bullet";
yggdrasilPlasmaFlakFrag.homingPower = 0;
yggdrasilPlasmaFlakFrag.homingRange = 0;
yggdrasilPlasmaFlakFrag.hitSound = Sounds.none;

const yggdrasilPlasmaFlak = extend(BasicBulletType, {});
yggdrasilPlasmaFlak.instantDisappear = true;
yggdrasilPlasmaFlak.fragBullets = 20;
yggdrasilPlasmaFlak.fragVelocityMin = 0.72;
yggdrasilPlasmaFlak.fragVelocityMax = 12;
yggdrasilPlasmaFlak.bulletWidth = 0;
yggdrasilPlasmaFlak.bulletHeight = 0;
yggdrasilPlasmaFlak.hitSound = Sounds.none;
yggdrasilPlasmaFlak.despawnEffect = yggdrasilPlasmaExplosionSpark;
yggdrasilPlasmaFlak.hitEffect = Fx.nuclearShockwave;
yggdrasilPlasmaFlak.frontColor = Color.valueOf("#ffff77");
yggdrasilPlasmaFlak.backColor = Color.valueOf("#ffff77");
yggdrasilPlasmaFlak.pierce = false;
yggdrasilPlasmaFlak.lightningLength = 45;
yggdrasilPlasmaFlak.lightining = 1;
yggdrasilPlasmaFlak.status = StatusEffects.shocked;
yggdrasilPlasmaFlak.statusDuration = 300;
yggdrasilPlasmaFlak.fragBullet = yggdrasilPlasmaFlakFrag;

const yggdrasilPlasmaSphere = newEffect(24, e => {
    Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const g = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 9 - Math.abs(9 - (e.fin() * 18)));
    }})
    Angles.randLenVectors(e.id, 2, -10 + 20 * e.fin(), e.rotation + Mathf.random(-15,15), 360 * e.fin(),g);
    Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fout());
    Angles.randLenVectors(e.id, 2, -10 + 20 * e.fin(), e.rotation + Mathf.random(-15,15), 360 * e.fin(),g);
});

const yggdrasilPlasma = extend(ArtilleryBulletType, {
	
    update(b){
        this.super$update(b);
		Effects.effect(yggdrasilPlasmaSphere, b.x + Mathf.random(-10,10), b.y + Mathf.random(-10,10));
    },
	
});
yggdrasilPlasma.collidesAir = true;
yggdrasilPlasma.collides = true;
yggdrasilPlasma.collidesTiles = true;
yggdrasilPlasma.speed = 6.5;
yggdrasilPlasma.damage = 1500;
yggdrasilPlasma.lifetime = 300;
yggdrasilPlasma.bulletWidth = 40;
yggdrasilPlasma.bulletHeight = 45;
yggdrasilPlasma.hitSize = 20;
yggdrasilPlasma.frontColor = Color.valueOf("#ffffbb");
yggdrasilPlasma.backColor = Color.valueOf("#ffff00");
yggdrasilPlasma.trailEffect = yggdrasilPlasmaTrail;
yggdrasilPlasma.shootEffect = Fx.none;
yggdrasilPlasma.smokeEffect = Fx.none;
yggdrasilPlasma.splashDamage = 9000;
yggdrasilPlasma.splashDamageRadius = 120;
yggdrasilPlasma.bulletShrink = 0;
yggdrasilPlasma.hitShake = 15;
yggdrasilPlasma.hitEffect = yggdrasilPlasmaExplosion;
yggdrasilPlasma.despawnEffect = Fx.none;
yggdrasilPlasma.lightningLength = 150;
yggdrasilPlasma.lightining = 6;
yggdrasilPlasma.pierce = false;
yggdrasilPlasma.bulletSprite = "diamond-ore-diamondbullet";
yggdrasilPlasma.homingPower = 0;
yggdrasilPlasma.homingRange = 0;
yggdrasilPlasma.fragBullets = 10;
yggdrasilPlasma.fragVelocityMin = 1;
yggdrasilPlasma.fragVelocityMax = 1;
yggdrasilPlasma.status = StatusEffects.shocked;
yggdrasilPlasma.statusDuration = 300;
yggdrasilPlasma.hitSound = Sounds.explosionbig;
yggdrasilPlasma.fragBullet = yggdrasilPlasmaFlak;
const yggdrasilTurret = extendContent(ChargeTurret, "yggdrasil", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-yggdrasil-icon-base"),
			Core.atlas.find("diamond-ore-yggdrasil-icon")
		];
	},
});
yggdrasilTurret.chargeEffect = yggdrasilCharge;
yggdrasilTurret.shootEffect = yggdrasilShoot;
yggdrasilTurret.shootType = yggdrasilPlasma;
//yggdrasilTurret.shootSound = Sounds.yggdrasilfire;