//require("effects")
const thorConcussAmmoflak = extend(BasicBulletType, {
});
thorConcussAmmoflak.speed = 4;
thorConcussAmmoflak.lifetime = 20;
thorConcussAmmoflak.damage = 3;
thorConcussAmmoflak.width = 2.4;
thorConcussAmmoflak.height = 24;
thorConcussAmmoflak.shrinkY = 0.9;
thorConcussAmmoflak.frontColor = Color.valueOf("#999999");
thorConcussAmmoflak.backColor = Color.valueOf("#888888");
thorConcussAmmoflak.trailColor = Color.valueOf("#bbbbbb");
thorConcussAmmoflak.despawnEffect = Fx.none;
thorConcussAmmoflak.hitEffect = Fx.none;
thorConcussAmmoflak.knockback = 666;
thorConcussAmmoflak.pierce = true;

const thorConcussAmmo = extend(MissileBulletType, {
	hit(b){
		try{
		for(var j = 0; j < 25; j++){
			Calls.createBullet(thorConcussAmmoflak, b.getTeam(), this.x, this.y, b.rot() + Mathf.random(-45,45), Mathf.random(0.35, 2.6), 1);
		}
		}
		catch(fck){
			//print(fck);
		}
        this.super$hit(b);
	},
});
thorConcussAmmo.speed = 4;
thorConcussAmmo.lifetime = 150;
thorConcussAmmo.knockback = 150;
thorConcussAmmo.width = 8;
thorConcussAmmo.height = 24;
thorConcussAmmo.shrinkY = 0;
thorConcussAmmo.frontColor = Color.valueOf("#999999");
thorConcussAmmo.backColor = Color.valueOf("#888888");
thorConcussAmmo.trailColor = Color.valueOf("#bbbbbb");
thorConcussAmmo.damage = 75;
thorConcussAmmo.splashDamage = 100;
thorConcussAmmo.splashDamageRadius = 16;
thorConcussAmmo.ammoMultiplier = 16;
thorConcussAmmo.homingPower = 3;
thorConcussAmmo.homingRange = 48;
thorConcussAmmo.reloadMultiplier = 1.06;
thorConcussAmmo.despawnEffect = Fx.hitMeltdown;
thorConcussAmmo.hitEffect = Fx.shockwave;
thorConcussAmmo.hitSound = Sounds.explosionbig;
thorConcussAmmo.shootEffect = Fx.shootBigSmoke2;
thorConcussAmmo.smokeEffect = Fx.hitFuse;

const thorTurret = extendContent(ItemTurret, "thor", {
	
    init(){
        this.super$init();
        //this.ammo(Items.silicon, thorConcussAmmo);
		//print(this.ammo);
    },
	
	icons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-thor-icon")
		];
	}
});
//thorTurret.ammo.add(Items.silicon, thorConcussAmmo);
//thorTurret.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1&&liquid.heatCapacity>0.5), 0.5)).update(false).boost();

const odinTurret = extendContent(ItemTurret, "odin", {
	
	icons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-odin-icon")
		];
	}
});
//odinTurret.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1&&liquid.heatCapacity>0.5), 0.314159)).update(false).boost();
const lokiTurret = extendContent(ItemTurret, "loki", {
	
	icons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-loki-icon")
		];
	}
});
//lokiTurret.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1&&liquid.heatCapacity>0.5), 0.2345)).update(false).boost();
const massdriverStrong = extendContent(MassDriver, "massdriver-strong", {
	
	icons: function(){
		return [
			Core.atlas.find("diamond-ore-massdriver-strong-icon-base"),
			Core.atlas.find("diamond-ore-massdriver-strong-icon")
		];
	},
});

const yggdrasilCharge = Effect(40, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 4);
    Lines.circle(e.x, e.y, e.fout() * 20);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 120 * e.fout(), e.rotation, 45,d);
});
const yggdrasilShoot = Effect(30, e => {
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
const yggdrasilPlasmaTrail = Effect(45, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 0.25 + e.fin() * 3);
    }})
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fin(), e.rotation + 180, 360 * e.fin(),d);
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fout());
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fout(), e.rotation, 360 * e.fout(),d);
});
const yggdrasilPlasmaExplosion = Effect(60, e => {
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
const yggdrasilPlasmaExplosionSpark = Effect(195, e => {
    Draw.color(Color.gold, Color.white, e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * Math.abs(2 + Mathf.random(-1,1) * 2), 45 + e.rotation);
    }}) 
    Angles.randLenVectors(e.id, 20, 10 + 391 * e.fin(), e.rotation, 360,d);
});
const yggdrasilPlasmaFragmentExplosion = Effect(40, e => {
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#999900"), e.fin());
    Lines.stroke(e.fout() * 4);
    Draw.alpha(e.fout());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 2.5 - Math.abs(2.5 - (e.fin() * 5)));
    }}) 
    Angles.randLenVectors(e.id, 3, -20 + 170 * e.fin(), e.rotation, 45,d);
});

const yggdrasilPlasmaFrag = extend(MissileBulletType, {});
yggdrasilPlasmaFrag.lifetime = 20;
yggdrasilPlasmaFrag.damage = 300;
yggdrasilPlasmaFrag.width = 25;
yggdrasilPlasmaFrag.height = 200;
yggdrasilPlasmaFrag.lightRadius = 200;
yggdrasilPlasmaFrag.shrinkY = 0.75;
yggdrasilPlasmaFrag.despawnEffect = yggdrasilPlasmaFragmentExplosion;
yggdrasilPlasmaFrag.hitEffect = Fx.none;
yggdrasilPlasmaFrag.frontColor = Color.valueOf("#ffff77");
yggdrasilPlasmaFrag.trailColor = Color.valueOf("#ffff00");
yggdrasilPlasmaFrag.backColor = Color.valueOf("#ffff77");
yggdrasilPlasmaFrag.pierce = true;
yggdrasilPlasmaFrag.pierceBuilding = true;
yggdrasilPlasmaFrag.status = StatusEffects.shocked;
yggdrasilPlasmaFrag.statusDuration = 300;
yggdrasilPlasmaFrag.sprite = "bullet";
yggdrasilPlasmaFrag.homingPower = 0;
yggdrasilPlasmaFrag.homingRange = 0;
yggdrasilPlasmaFrag.hitSound = Sounds.none;

const yggdrasilPlasmaSphere = Effect(24, e => {
    Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const g = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 9 - Math.abs(9 - (e.fin() * 18)));
    }})
    Angles.randLenVectors(e.id, 2, -10 + 20 * e.fin(), e.rotation + Mathf.random(-15,15), 360 * e.fin(),g);
    Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fout());
    Angles.randLenVectors(e.id + 2, 2, -10 + 20 * e.fin(), e.rotation + Mathf.random(-15,15), 360 * e.fin(),g);
});

const yggdrasilPlasma = extend(ArtilleryBulletType, {
    update(b){
        this.super$update(b);
        if(b.timer.get(0, 3 + b.fslope() * 2)){
            this.trailEffect.at(b.x, b.y);
        }
		yggdrasilPlasmaSphere.at(b.x + Mathf.random(-10,10), b.y + Mathf.random(-10,10));
		this.supressCollision = false;
    },
	hit(b, x, y){
		this.super$hit(b, b.x, b.y);
		yggdrasilPlasmaExplosionSpark.at(b.x, b.y);
	}
	
});
yggdrasilPlasma.collidesAir = true;
yggdrasilPlasma.collides = true;
yggdrasilPlasma.collidesTiles = true;
yggdrasilPlasma.speed = 6.5;
yggdrasilPlasma.damage = 1500;
yggdrasilPlasma.lifetime = 300;
yggdrasilPlasma.width = 40;
yggdrasilPlasma.height = 45;
yggdrasilPlasma.hitSize = 20;
yggdrasilPlasma.frontColor = Color.valueOf("#ffffbb");
yggdrasilPlasma.backColor = Color.valueOf("#ffff00");
yggdrasilPlasma.lightColor = Color.valueOf("#ffff00");
yggdrasilPlasma.trailEffect = yggdrasilPlasmaTrail;
yggdrasilPlasma.shootEffect = Fx.none;
yggdrasilPlasma.smokeEffect = Fx.none;
yggdrasilPlasma.scaleVelocity = false;
yggdrasilPlasma.hittable = false;
yggdrasilPlasma.absorbable = false;
yggdrasilPlasma.reflectable = false;
yggdrasilPlasma.splashDamage = 9000;
yggdrasilPlasma.splashDamageRadius = 200;
yggdrasilPlasma.lightRadius = 200;
yggdrasilPlasma.lightOpacity = 1.5;
yggdrasilPlasma.shrinkY = 0;
yggdrasilPlasma.hitShake = 20;
yggdrasilPlasma.hitEffect = yggdrasilPlasmaExplosion;
yggdrasilPlasma.despawnEffect = Fx.none;
yggdrasilPlasma.lightningLength = 40;
yggdrasilPlasma.lightningDamage = 400;
yggdrasilPlasma.lightningLengthRand = 40;
yggdrasilPlasma.lightning = 14;
yggdrasilPlasma.pierce = false;
yggdrasilPlasma.sprite = "diamond-ore-diamondbullet";
yggdrasilPlasma.homingPower = 0;
yggdrasilPlasma.homingRange = 0;
yggdrasilPlasma.fragBullets = 100;
yggdrasilPlasma.fragVelocityMin = 0.7;
yggdrasilPlasma.fragVelocityMax = 9;
yggdrasilPlasma.fragLifeMin = 0.75;
yggdrasilPlasma.fragLifeMax = 1.375;
yggdrasilPlasma.status = StatusEffects.shocked;
yggdrasilPlasma.statusDuration = 300;
yggdrasilPlasma.hitSound = loadSound("yggdrasilPlasmaExplode");;
yggdrasilPlasma.fragBullet = yggdrasilPlasmaFrag;
const yggdrasilTurret = extendContent(PowerTurret, "yggdrasil", {
	
	icons: function(){
		return [
			Core.atlas.find("diamond-ore-yggdrasil-icon-base"),
			Core.atlas.find("diamond-ore-yggdrasil-icon")
		];
	},
});
yggdrasilTurret.chargeEffect = yggdrasilCharge;
yggdrasilTurret.shootEffect = yggdrasilShoot;
yggdrasilTurret.shootType = yggdrasilPlasma;
yggdrasilTurret.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1&&liquid.heatCapacity>0.5), 0.375)).update(false).boost();
//yggdrasilTurret.shootSound = Sounds.yggdrasilfire;