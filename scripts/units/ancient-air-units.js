//const lib = require("funclib");
const ancientFlying = prov(() => extend(FlyingUnit, {
	drawEngine(){
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 180, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 180, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 7);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 6);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
	},
}));

const ancientHover = prov(() => extend(HoverUnit, {
	drawEngine(){
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 180, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 180, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 7);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 6);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
	},
}));

/* 
const insomniaFighterWeapon = extendContent(Weapon, "insomnia-fighter-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-insomnia-fighter-equip");
	}
});
insomniaFighterWeapon.width = 6.3;
insomniaFighterWeapon.length = 3;
insomniaFighterWeapon.recoil = 0;
insomniaFighterWeapon.reload = 30;
insomniaFighterWeapon.shotDelay = 6;
insomniaFighterWeapon.shots = 3;
insomniaFighterWeapon.targetDistance = 150;
insomniaFighterWeapon.minPlayerDist = 6;
insomniaFighterWeapon.inaccuracy = 2;
insomniaFighterWeapon.spacing = 0;
insomniaFighterWeapon.shootCone = 100; */

const insomniaFighter = new JavaAdapter(UnitType, {}, "insomnia-fighter",  prov(() => new JavaAdapter(FlyingUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-insomnia-fighter-cell");
    },
	drawEngine(){
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 180, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 180, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 3, this.type.engineSize / 7);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 3, this.type.engineSize / 6);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
	},
	calculateDamage(amount){
		if (Mathf.chance(1 - (this.health / this.maxHealth()))){
			var vel = Vec2(this.x, this.y);
			this.velocity().add(vel.trns(Mathf.random(360), Mathf.random(0.5,1.5) * Time.delta()));
		}
		return this.super$calculateDamage(amount);
	},
	update(){
		this.super$update();
		try{ // Put in a "try"; move unpredictably
			this.nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 300);
			if (this.nearestfoe != null && !this.state.is(this.retreat) && Mathf.chance(0.055)){
				var vel = Vec2(this.x, this.y);
				this.velocity().add(vel.trns(Mathf.random(360), Mathf.random(0.25,1.25) * Time.delta()));
			}
		}
		catch(error){
			print(error);
		}
	}
})));

const paranoiaTeleportEnter = newEffect(15, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#33a8e0"), e.fout());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fin() * 2);
    }})
    Angles.randLenVectors(e.id, 15, 60 * e.fout(), e.rotation, 360,d);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fout() * 13);
});
const paranoiaTeleportExit = newEffect(15, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#33a8e0"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }})
    Angles.randLenVectors(e.id, 15, 60 * e.fin(), e.rotation, 360,d);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 13);
});
const paranoiaFragExplode = newEffect(15, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#73a8f0"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }})
    Angles.randLenVectors(e.id, 15, 60 * e.fout(), e.rotation, 360,d);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 13);
});
const paranoiaTeleportRecent = newEffect(10, e => {
	Draw.color(Color.valueOf("#4fe4fc"), Color.valueOf("#33a8e0"), e.fout());
    Fill.circle(e.x, e.y, e.fout() * 2);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 4);
});
const paranoiaTPstatus = new StatusEffect("paranoiaFighterRecentlyTeleported");
paranoiaTPstatus.speedMultiplier = 1.1;
paranoiaTPstatus.armorMultiplier = 1.05;
paranoiaTPstatus.damageMultiplier = 1;
paranoiaTPstatus.effect = paranoiaTeleportRecent;
const paranoiaMissileFragHit = newEffect(29, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#e3a880"), e.fout());
	Draw.alpha(e.fout());
    Fill.circle(e.x, e.y, Math.max(5,8 - (e.fin() * 13)));
    Lines.stroke(e.fout() * 1.5);
    Lines.circle(e.x, e.y, 11 + e.fin() * 16);
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#9cb6d4"), Color.valueOf("#9cb6f4"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 8, 5 + 15 * e.fin(), e.rotation, 360,d);
});
const paranoiaMissileFrag = extend(MissileBulletType, {
});
paranoiaMissileFrag.speed = 10;
paranoiaMissileFrag.drag = 0.013;
paranoiaMissileFrag.lifetime = 150;
paranoiaMissileFrag.bulletWidth = 5;
paranoiaMissileFrag.bulletHeight = 13;
paranoiaMissileFrag.hitSize = 6;
paranoiaMissileFrag.bulletSprite = "diamond-ore-diamondconcus";
paranoiaMissileFrag.bulletShrink = 0;
paranoiaMissileFrag.splashDamage = 80;
paranoiaMissileFrag.splashDamageRadius = 8;
paranoiaMissileFrag.homingRange = 200;
paranoiaMissileFrag.homingPower = 5;
paranoiaMissileFrag.weaveMag = 11;
paranoiaMissileFrag.weaveScale = 2;
paranoiaMissileFrag.keepVelocity = false;
paranoiaMissileFrag.frontColor = Color.valueOf("#999999");
paranoiaMissileFrag.backColor = Color.valueOf("#aabbcc");
paranoiaMissileFrag.trailColor = Color.valueOf("#ddeeff");
paranoiaMissileFrag.damage = 15;
paranoiaMissileFrag.despawnEffect = Fx.none;
paranoiaMissileFrag.hitEffect = paranoiaMissileFragHit;
paranoiaMissileFrag.hitSound = Sounds.boom;
paranoiaMissileFrag.shootEffect = Fx.none;
paranoiaMissileFrag.smokeEffect = Fx.none;
const paranoiaMissileFragPhaseIn = newEffect(20, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#e3a880"), e.fout());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }})
    Angles.randLenVectors(e.id, 15, 25 * e.fout(), e.rotation, 64,d);
    Angles.randLenVectors(e.id, 5, 15 * e.fout(), e.rotation + 67.5, 22.5,d);
    Angles.randLenVectors(e.id, 5, 15 * e.fout(), e.rotation - 67.5, 22.5,d);
    Lines.stroke(e.fout() * 1.5);
    const ae = new Floatc2({get(x, y){
    Lines.stroke(e.fout() * 1.5);
    Draw.color(Color.valueOf("#6ecffa"), Color.valueOf("#9cb6d4"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 10, 40 * e.fin(), e.rotation, 25,ae);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 13);
});
const paranoiaMissileFragPortal = extend(BasicBulletType, {
	despawned(b){
		try{
			var nearestTarget = Units.closestTarget(b.getTeam(), b.x, b.y, 200);
			if(nearestTarget != null){
				Calls.createBullet(paranoiaMissileFrag, b.getTeam(), b.x, b.y, b.rot() + 180, Mathf.random(1, 1.25), 1);
			}
		}
		catch(fck){
			//print(fck);
		}
        this.super$despawned(b);
	},
});
paranoiaMissileFragPortal.speed = 6;
paranoiaMissileFragPortal.drag = 0.01;
paranoiaMissileFragPortal.lifetime = 20;
paranoiaMissileFragPortal.bulletWidth = 0;
paranoiaMissileFragPortal.bulletHeight = 0;
paranoiaMissileFragPortal.hitSize = 20;
paranoiaMissileFragPortal.hitsTiles = false;
paranoiaMissileFragPortal.collidesTiles = false;
paranoiaMissileFragPortal.collides = false;
paranoiaMissileFragPortal.keepVelocity = false;
paranoiaMissileFragPortal.despawnEffect = paranoiaMissileFragPhaseIn;
const paranoiaMissileFragPhase = extend(BasicBulletType, {
	despawned(b){
		try{
			var nearestTarget = Units.closestTarget(b.getTeam(), b.x, b.y, 128);
			if(nearestTarget != null){
				Calls.createBullet(paranoiaMissileFragPortal, b.getTeam(), b.x, b.y, b.rot() + Mathf.random(-45,45), Mathf.random(0.95, 1.3), 1);
			}
		}
		catch(fck){
			//print(fck);
		}
        this.super$despawned(b);
	},
});
paranoiaMissileFragPhase.speed = 11;
paranoiaMissileFragPhase.lifetime = 240;
paranoiaMissileFragPhase.homingRange = 256;
paranoiaMissileFragPhase.homingPower = 5;
paranoiaMissileFragPhase.bulletWidth = 0;
paranoiaMissileFragPhase.bulletHeight = 0;
paranoiaMissileFragPhase.hitSize = 20;
paranoiaMissileFragPhase.hitsTiles = false;
paranoiaMissileFragPhase.collidesTiles = false;
paranoiaMissileFragPhase.collides = false;
paranoiaMissileFragPhase.keepVelocity = false;
paranoiaMissileFragPhase.shootEffect = Fx.none;
paranoiaMissileFragPhase.smokeEffect = Fx.none;
paranoiaMissileFragPhase.hitEffect = Fx.none;
paranoiaMissileFragPhase.despawnEffect = Fx.none;
const paranoiaMissileHit = newEffect(28, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#e3a880"), e.fout());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    }})
    Angles.randLenVectors(e.id, 15, 25 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 1.5);
    const ae = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#6ecffa"), Color.valueOf("#9cb6d4"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 10, 40 * e.fin(), e.rotation, 25,ae);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 30);
    Fill.circle(e.x, e.y, Math.max(0,18 - (e.fin() * 30)));
});
const paranoiaMissilePhaseIn = newEffect(30, e => {
    const ae = new Floatc2({get(x, y){
    Lines.stroke(e.fout() * (1.5 + Mathf.random()));
    Draw.color(Color.valueOf("#6ecffa"), Color.valueOf("#9cb6d4"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 15, 25 + 15 * e.fin(), e.rotation, 360,ae);
    Angles.randLenVectors(e.id, 15, 15 + 25 * e.fin(), e.rotation, 360,ae);
	Draw.alpha(e.fout());
	Draw.color(Color.valueOf("#2fe4fc"), Color.valueOf("#e3a8f0"), e.fout());
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 45);
    Lines.circle(e.x, e.y, 10 + e.fin() * 35);
    Lines.circle(e.x, e.y, 20 + e.fin() * 25);
    Lines.circle(e.x, e.y, 30 + e.fin() * 15);
    Fill.circle(e.x, e.y, Math.max(0,15 - (e.fin() * 57)));
});
const paranoiaMissile = extend(MissileBulletType, {
	init(b){
		if (b != undefined) {
		this.super$init(b);
		Sounds.missile.at(b.x, b.y);
		}
	},
	hit(b, x, y){
        this.super$hit(b, b.x, b.y);
		try{
			for(var j = 0; j < 25; j++){
				Calls.createBullet(paranoiaMissileFragPhase, b.getTeam(), b.x, b.y, b.rot() + Mathf.random(-75,75), Mathf.random(0.85, 1.3), 1);
			}
		}
		catch(fck){
			//print(fck);
		}
	},
	range(){
		return 300
	}
});
paranoiaMissile.speed = 5;
paranoiaMissile.drag = 0.00375;
paranoiaMissile.lifetime = 300;
paranoiaMissile.bulletWidth = 14;
paranoiaMissile.bulletHeight = 29;
paranoiaMissile.hitSize = 13;
paranoiaMissile.weaveMag = -2.5;
paranoiaMissile.weaveScale = -1.57;
paranoiaMissile.bulletSprite = "diamond-ore-diamondconcus";
paranoiaMissile.bulletShrink = 0;
paranoiaMissile.splashDamage = 384;
paranoiaMissile.splashDamageRadius = 24;
paranoiaMissile.homingRange = 128;
paranoiaMissile.homingPower = 5;
paranoiaMissile.keepVelocity = false;
paranoiaMissile.pierce = false;
paranoiaMissile.frontColor = Color.valueOf("#999999");
paranoiaMissile.backColor = Color.valueOf("#aabbcc");
paranoiaMissile.trailColor = Color.valueOf("#ddeeff");
paranoiaMissile.damage = 128;
paranoiaMissile.despawnEffect = Fx.shockwave;
paranoiaMissile.hitEffect = paranoiaMissileHit;
paranoiaMissile.hitSound = Sounds.explosionbig;
paranoiaMissile.shootEffect = paranoiaMissilePhaseIn;
paranoiaMissile.smokeEffect = Fx.none;
const paranoiaFighterWeapon = extendContent(Weapon, "paranoia-fighter-equip", {
});
paranoiaFighterWeapon.width = 0;
paranoiaFighterWeapon.length = 25;
paranoiaFighterWeapon.recoil = 0;
paranoiaFighterWeapon.reload = 600;
paranoiaFighterWeapon.minPlayerDist = 9;
paranoiaFighterWeapon.inaccuracy = 0.25;
paranoiaFighterWeapon.velocityRnd = 0.125;
paranoiaFighterWeapon.spacing = 0;
paranoiaFighterWeapon.alternate = true;
paranoiaFighterWeapon.ignoreRotation = false;
paranoiaFighterWeapon.bullet = paranoiaMissile;
paranoiaFighterWeapon.shootSound = Sounds.shotgun;
paranoiaFighterWeapon.shootEffect = Fx.none;
const paranoiaFighter = new JavaAdapter(UnitType, {}, "paranoia-fighter",  prov(() => new JavaAdapter(FlyingUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	drawEngine(){
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 180, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 180, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 7);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 6);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
	},
	invalidPos(x, y){
		return x < -Vars.worldBounds || y < -Vars.worldBounds || x >= Vars.world.width() * Vars.tilesize + Vars.worldBounds || y >= Vars.world.height() * Vars.tilesize + Vars.worldBounds
	},
	// nearestBullet script by https://github.com/EyeOfDarkness/
	nearestBullet(team, x, y, range, boolf){
		if(team == Team.derelict) return null;
		
		var result = null;
		var cdist = 0;
		
		Vars.bulletGroup.intersect(x - range, y - range, range * 2, range * 2, cons(b => {
			if(!boolf.get(b)) return;
			
			var dst2 = Mathf.dst2(b.x, b.y, x, y);
			
			if(dst2 < range * range && (result == null || dst2 < cdist) && team != b.getTeam()){
				if(!Vars.android){
					result = b
				}else{
					result = b
				}
				cdist = dst2;
			}
		}));
		
		return result;
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-paranoia-fighter-cell");
    },
	update(){
		this.super$update();
		try{ // Put in a "try"; Keep distance with enemies
			this.nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 300);
			var posX = this.x;
			var posY = this.y;
			var closestBullet = this.nearestBullet(this.getTeam(), posX, posY, 32, boolf(b => b.getBulletType().hitSize < 11 && b.getBulletType().speed < 11));
			var shouldTP = false;
			if(this.hasEffect(paranoiaTPstatus) == false){
				if (closestBullet != null){
					//this.velocity().add(Mathf.random(-3,3), Mathf.random(-3,3));
					if (Angles.near(closestBullet.angleTo(this), closestBullet.rot(), 45)){
						shouldTP = Mathf.chance(0.3);
					}
					else{
						shouldTP = Mathf.chance(0.1);
					}
				}
				else{
					if (this.nearestfoe != null){
						shouldTP = Mathf.chance(0.03216342);
					}
					else{
						shouldTP = Mathf.chance(0.014542869);
					}
				}
			}
			if (this.nearestfoe != null && shouldTP == false){
					var vel = Vec2(this.x, this.y);
					if (this.nearestfoe.dst(this) < 100){
						this.velocity().add(Mathf.random(-0.33,0.33), Mathf.random(-0.33,0.33));
						this.velocity().add(vel.trns(this.angleTo(this.nearestfoe), -0.30 * Time.delta()));
					}
					else if (this.nearestfoe.dst(this) < 150 && Mathf.chance(0.05)){
						this.velocity().add(vel.trns(this.angleTo(this.nearestfoe), -0.40 * Time.delta()));
					}
					else if (this.nearestfoe.dst(this) < 200 && Mathf.chance(0.025)){
						this.velocity().add(vel.trns(this.angleTo(this.nearestfoe), -0.50 * Time.delta()));
					}
				this.avoidOthers();
			}
			else if(this.hasEffect(paranoiaTPstatus) == false && shouldTP == true){
				var posTeleX = null;
				var posTeleY = null;
				posTeleX = this.x + Mathf.random(-100,100);
				posTeleY = this.y + Mathf.random(-100,100);
				while(this.invalidPos(posTeleX,posTeleY)){
					posTeleX = this.x + Mathf.random(-100,100);
					posTeleY = this.y + Mathf.random(-100,100);
				}
				Effects.effect(paranoiaTeleportEnter, this.x, this.y, Mathf.random(-360,360));
				Sounds.laser.at(this.x, this.y);
				this.x = posTeleX;
				this.y = posTeleY;
				Effects.effect(paranoiaTeleportExit, this.x, this.y, Mathf.random(-360,360));
				Sounds.laser.at(this.x, this.y);
				// Apply a status effect that works as a cooldown
				this.applyEffect(paranoiaTPstatus, Math.ceil(Mathf.random(19, 165)));
			}
		}
		catch(error){
			print(error);
		}
	},
})));
paranoiaFighter.weapon = paranoiaFighterWeapon;

const seizureStatusFX = newEffect(24, e => {
	Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
	Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
    Fill.circle(e.x, e.y, e.fout() * 3 * Mathf.random());
	Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
	Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
    Lines.stroke(e.fout() * 2 * Mathf.random());
    Lines.circle(e.x, e.y, 2 + e.fin() * 4 * Mathf.random());
});
const seizureStatus = extendContent(StatusEffect, "seizureFighterSpazzOut", {
	update(unit, time){
		this.super$update(unit, time);
		try{ 
			if (unit.getTeam() == Team.derelict){
				time = 0;
			}
			unit.velocity().add(Mathf.random(-0.66,0.66), Mathf.random(-0.66,0.66));
			unit.velocity().setAngle(Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random()));
			unit.rotation = Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random());
			var spzAng = Mathf.random(-360, 360);
			var spzx = Angles.trnsx(spzAng, 2);
			var spzy = Angles.trnsy(spzAng, 2);
			var spz = Vec2(unit.x + spzx, unit.y + spzy);
			if (Angles.near(unit.angleTo(spz), unit.rotation, unit.getType().shootCone) || Mathf.chance(0.02)){
				// Bullet's "team" is private, no way to make bullets fired teamless
				//unit.getWeapon().bullet.team = Team.derelict;
				unit.getWeapon().update(unit, unit.x + spzx, unit.y + spzy);
			}
		}
		catch(error){
			print(error);
		}
	}
});
//const seizureStatus = new StatusEffect("seizureFighterSpazzOut");
//Spaz out status effect: affected units jitter a lot, as well as aim and shoot in random directions
seizureStatus.speedMultiplier = 1;
seizureStatus.armorMultiplier = 1;
seizureStatus.damageMultiplier = 1;
seizureStatus.effect = seizureStatusFX;

const seizureBulletTrail = newEffect(12, e => {
	Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
	Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
	var trlx = e.x + Angles.trnsx(e.rotation, e.fin() * 88)
	var trly = e.y + Angles.trnsy(e.rotation, e.fin() * 88)
    Fill.circle(trlx, trly, e.fout() * 3);
	Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
	Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
    Lines.stroke(e.fout() * 2);
    Lines.circle(trlx, trly, 2 + e.fin() * 4);
});
const seizureBulletHit = newEffect(26, e => {
	Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
	Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
    Fill.circle(e.x, e.y, e.fout() * 3 * Mathf.random());
	Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
	Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
    Lines.stroke(e.fout() * 2 * Mathf.random());
    Lines.circle(e.x, e.y, 2 + e.fin() * 14 * Mathf.random());
    Lines.stroke(e.fout() * 1.6 * Mathf.random());
    const ae = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
		Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
		Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 10, 18 * e.fin()* Mathf.random(), e.rotation, 360,ae);
});
const seizureBulletDespawn = newEffect(26, e => {
    Lines.stroke(e.fout() * 1.6 * Mathf.random());
    const ae = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("00ffff").shiftHue(Mathf.random(360)), Color.valueOf("ffff00").shiftHue(Mathf.random(360)), Mathf.random());
		Draw.mixcol(Color.valueOf("ffffff"), Mathf.random());
		Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 10, 18 * e.fin()* Mathf.random(), e.rotation, 120,ae);
    Angles.randLenVectors(e.id, 10, 36 * e.fin()* Mathf.random(), e.rotation, 60,ae);
});
const seizureBullet = extend(BasicBulletType, {
	
    update(b){
        this.super$update(b);
		Effects.effect(seizureBulletTrail, b.x, b.y, b.rot());
    },
	
});
seizureBullet.speed = 10;
seizureBullet.damage = 24;
seizureBullet.lifetime = 30;
seizureBullet.bulletWidth = 12;
seizureBullet.bulletHeight = 24;
seizureBullet.hitSize = 12;
seizureBullet.frontColor = Color.valueOf("#ffffff");
seizureBullet.backColor = Color.valueOf("#ffffff");
seizureBullet.status = seizureStatus;
seizureBullet.statusDuration = 420;
seizureBullet.despawnEffect = seizureBulletDespawn;
seizureBullet.hitEffect = seizureBulletHit;
seizureBullet.shootEffect = Fx.none;
seizureBullet.smokeEffect = Fx.none;

const seizureFighterWeapon = extendContent(Weapon, "seizure-fighter-equip", {
});
seizureFighterWeapon.width = 4;
seizureFighterWeapon.length = 4;
seizureFighterWeapon.recoil = 2;
seizureFighterWeapon.reload = 85;
seizureFighterWeapon.minPlayerDist = 9;
seizureFighterWeapon.inaccuracy = 0.25;
seizureFighterWeapon.spacing = 0;
seizureFighterWeapon.alternate = true;
seizureFighterWeapon.ignoreRotation = false;
seizureFighterWeapon.bullet = seizureBullet;
seizureFighterWeapon.shootSound = Sounds.pew;
seizureFighterWeapon.shootEffect = Fx.none;
const seizureFighter = new JavaAdapter(UnitType, {}, "seizure-fighter",  prov(() => new JavaAdapter(HoverUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-seizure-fighter-cell");
    },
	drawEngine(){
		var zx = Angles.trnsx(this.rotation + 180, 1.16);
		var zy = Angles.trnsy(this.rotation + 180, 1.16);
		
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 124, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 124, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2.3, this.type.engineSize / 4);
		Fill.circle(this.x + ox + zx, this.y + oy + zy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 124, this.type.engineOffset);
		var iy = Angles.trnsy(this.rotation + 124, this.type.engineOffset);
		var iSize = Mathf.absin(Time.time(), 3.2, this.type.engineSize / 5);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#93a2ff"));
		var gx = Angles.trnsx(this.rotation + 236, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 236, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 2.3, this.type.engineSize / 4);
		Fill.circle(this.x + gx + zx, this.y + gy + zy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var yx = Angles.trnsx(this.rotation + 236, this.type.engineOffset);
		var yy = Angles.trnsy(this.rotation + 236, this.type.engineOffset);
		var ySize = Mathf.absin(Time.time(), 3.2, this.type.engineSize / 5);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
	},
	update(){
		this.super$update();
		try{ 
			Units.nearby(this.getTeam(), this.x, this.y, 136, cons(unit => {
				unit.healBy(Time.delta() * 0.22657349);
			}));
		}
		catch(error){
			print(error);
		}
	}
})));
seizureFighter.weapon = seizureFighterWeapon;
const maniaBombletHit = newEffect(22, e => {
	Draw.color(Color.valueOf("#98c6f0"), Color.valueOf("#a3f0ff"), e.fout());
    Lines.stroke(e.fout() * 1.5);
    Lines.circle(e.x, e.y, 3 + e.fin() * 15);
    const d = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#98c6f0"), Color.valueOf("#a3f0ff"), e.fout());
		Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    }})
    Angles.randLenVectors(e.id, 7, 2 + 12.5 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 8, 2 + 20 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 9, 2 + 27.5 * e.fin(), e.rotation, 360,d);
});
const maniaBombletTrail = newEffect(34, e => {
	Draw.color(Color.valueOf("#a3c0ff"), Color.valueOf("#c3f0e3"), Mathf.random());
	Fill.circle(e.x, e.y, e.fout() * 4.5);
});
const maniaBombHit = newEffect(34, e => {
	Draw.color(Color.valueOf("#98c6f0"), Color.valueOf("#a3f0ff"), e.fout());
    const d = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    }})
    Angles.randLenVectors(e.id, 15, 4 + 25 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 15, 4 + 40 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 15, 4 + 55 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 1.5);
    const ae = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#a3f0ff"), Color.valueOf("#c3f0e3"), Mathf.random());
		Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 13);
    }}) 
    Angles.randLenVectors(e.id, 10, 10 + 20 * e.fin(), e.rotation, 360,ae);
    Angles.randLenVectors(e.id, 10, 20 + 40 * e.fin(), e.rotation, 360,ae);
	Draw.alpha(e.fout());
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, 7 + e.fin() * 30);
});
const maniaBombletFrag = extend(BasicBulletType, {
});
maniaBombletFrag.lifetime = 25;
maniaBombletFrag.damage = 6;
maniaBombletFrag.bulletWidth = 1;
maniaBombletFrag.bulletHeight = 8;
maniaBombletFrag.bulletShrink = 0.875;
maniaBombletFrag.frontColor = Color.valueOf("#a3f0ff");
maniaBombletFrag.backColor = Color.valueOf("#c3f0e3");
maniaBombletFrag.bulletSprite = "diamond-ore-diamondshell";
maniaBombletFrag.despawnEffect = Fx.none;
maniaBombletFrag.hitEffect = Fx.shootSmall;

const maniaBomblet = extend(ArtilleryBulletType, {
	
    update(b){
        this.super$update(b);
		b.rot(b.rot() + Mathf.random(-(3.75 * (1 - b.fin())),(3.75 * (1 - b.fin()))));
    },
});
maniaBomblet.damage = 20;
maniaBomblet.splashDamage = 75;
maniaBomblet.splashDamageRadius = 25;
maniaBomblet.lifetime = 70;
maniaBomblet.speed = 1.2;
maniaBomblet.drag = 0.004;
maniaBomblet.frontColor = Color.valueOf("#c3f0e3");
maniaBomblet.backColor = Color.valueOf("#a3f0ff");
maniaBomblet.bulletSprite = "diamond-ore-diamondbomb";
maniaBomblet.bulletWidth = 9;
maniaBomblet.bulletHeight = 17;
maniaBomblet.fragVelocityMin = 0.2;
maniaBomblet.fragVelocityMax = 3.6;
maniaBomblet.fragBullets = 36;
maniaBomblet.fragBullet = maniaBombletFrag;
maniaBomblet.trailEffect = maniaBombletTrail;
maniaBomblet.hitEffect = maniaBombletHit;
maniaBomblet.despawnEffect = Fx.none;

const maniaBomb = extend(BombBulletType, {
	despawned(b){
		try{
			for(var j = 0; j < 6; j++){
				Calls.createBullet(maniaBomblet, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.3333333, 1.65), Mathf.random(0.6, 1.4));
			}
			for(var k = 0; k < 6; k++){
				var shockLen = Math.floor(Mathf.random(5,20));
				Lightning.create(b.getTeam(), Color.valueOf("#decfea"), Mathf.random(25,75), b.x, b.y, Mathf.random(360), shockLen);
			}
		}
		catch(fck){
			//print(fck);
		}
        this.super$despawned(b);
	}
});
maniaBomb.damage = 60;
maniaBomb.splashDamage = 180;
maniaBomb.splashDamageRadius = 48;
maniaBomb.frontColor = Color.valueOf("#c3f0e3");
maniaBomb.backColor = Color.valueOf("#a3f0ff");
maniaBomb.bulletSprite = "diamond-ore-diamondbomb";
maniaBomb.bulletWidth = 15;
maniaBomb.bulletHeight = 33;
maniaBomb.hitEffect = maniaBombHit;
maniaBomb.despawnEffect = Fx.shockwave;
maniaBomb.shootEffect = Fx.smelt;
maniaBomb.smokeEffect = Fx.fuelburn;
maniaBomb.status = StatusEffects.shocked;
maniaBomb.statusDuration = 25;

const maniaBomberWeapon = extendContent(Weapon, "mania-bomber-equip", {
});
maniaBomberWeapon.width = 0;
maniaBomberWeapon.length = 0;
maniaBomberWeapon.recoil = 0;
maniaBomberWeapon.reload = 188;
maniaBomberWeapon.minPlayerDist = 9;
maniaBomberWeapon.inaccuracy = 360;
maniaBomberWeapon.spacing = 0;
maniaBomberWeapon.alternate = true;
maniaBomberWeapon.ignoreRotation = true;
maniaBomberWeapon.bullet = maniaBomb;
maniaBomberWeapon.shootSound = Sounds.artillery;
maniaBomberWeapon.shootEffect = Fx.none;
const maniaBomber = new JavaAdapter(UnitType, {}, "mania-bomber",  prov(() => new JavaAdapter(FlyingUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-mania-bomber-cell");
    },
	calculateDamage(amount){
		this.retarget();
		return this.super$calculateDamage(amount);
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
		var tx = Angles.trnsx(this.rotation + 180, this.type.engineOffset + 3);
		var ty = Angles.trnsy(this.rotation + 180, this.type.engineOffset + 3);
		var tSize = Mathf.absin(Time.time(), 3, this.type.engineSize / 4);
		Fill.circle(this.x + tx, this.y + ty, this.type.engineSize + tSize + 3);
		
		Draw.color(Color.valueOf("#c3f0e3"));
		var ynx = Angles.trnsx(this.rotation + 180, this.type.engineOffset + 1);
		var yny = Angles.trnsy(this.rotation + 180, this.type.engineOffset + 1);
		var ynSize = Mathf.absin(Time.time(), 6, (this.type.engineSize + 1.5) / 7);
		Fill.circle(this.x + ynx, this.y + yny, (this.type.engineSize + ynSize + 2.25) / 2);
		Draw.color();
	},
	/* update(){
		this.super$update();
		try{ // Put in a "try"; Strafe around enemies
			...
		}
		catch(error){
			print(error);
		}
	} */
})));
maniaBomber.weapon = maniaBomberWeapon;

const insanityFighter = new JavaAdapter(UnitType, {}, "insanity-fighter",  prov(() => new JavaAdapter(HoverUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	calculateDamage(amount){
		var dmgTkn = this.super$calculateDamage(amount);
		finalAmount = dmgTkn * (((75 * (this.health / this.maxHealth())) + 25)/ 100);
		return finalAmount;
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-insanity-fighter-cell");
    },
	drawEngine(){
		var zx = Angles.trnsx(this.velocity().angle(), 0.2 + (this.velocity().len() / this.maxVelocity()));
		var zy = Angles.trnsy(this.velocity().angle(), 0.2 + (this.velocity().len() / this.maxVelocity()));
		
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 120, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 120, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2.3, this.type.engineSize / 4);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 120, this.type.engineOffset);
		var iy = Angles.trnsy(this.rotation + 120, this.type.engineOffset);
		var iSize = Mathf.absin(Time.time(), 3.2 - (1.7 + (this.velocity().len() / this.maxVelocity())), this.type.engineSize / 5);
		Fill.circle(this.x + ix + zx, this.y + iy + zy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#93a2ff"));
		var gx = Angles.trnsx(this.rotation + 240, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 240, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 2.3, this.type.engineSize / 4);
		Fill.circle(this.x + gx, this.y + gy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var yx = Angles.trnsx(this.rotation + 240, this.type.engineOffset);
		var yy = Angles.trnsy(this.rotation + 240, this.type.engineOffset);
		var ySize = Mathf.absin(Time.time(), 3.2 - (1.7 + (this.velocity().len() / this.maxVelocity())), this.type.engineSize / 5);
		Fill.circle(this.x + yx + zx, this.y + yy + zy, (this.type.engineSize + ySize) / 2);
		Draw.color();
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
	},
})));

const confusionFighter = new JavaAdapter(UnitType, {}, "confusion-fighter",  prov(() => new JavaAdapter(FlyingUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-confusion-fighter-cell");
    },
	drawEngine(){
		var zx = Angles.trnsx(this.rotation + 180, 0.6);
		var zy = Angles.trnsy(this.rotation + 180, 0.6);
		
		Draw.color(Color.valueOf("#e3c161"));
		var ox = Angles.trnsx(this.rotation + 220, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 220, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + ox + zx, this.y + oy + zy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#f7f296"));
		var ix = Angles.trnsx(this.rotation + 220, this.type.engineOffset);
		var iy = Angles.trnsy(this.rotation + 220, this.type.engineOffset);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#e3c161"));
		var gx = Angles.trnsx(this.rotation + 140, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 140, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + gx + zx, this.y + gy + zy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#f7f296"));
		var yx = Angles.trnsx(this.rotation + 140, this.type.engineOffset);
		var yy = Angles.trnsy(this.rotation + 140, this.type.engineOffset);
		var ySize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
	},
	update(){
		this.super$update();
		try{ // Put in a "try"; Strafe around enemies
			if (this.target != null && !this.state.is(this.retreat) && !this.state.is(this.rally)){
				if (this.dst(this.target) < 400){
					var vel = Vec2(this.x, this.y);
					if (Mathf.chance(0.5)){
						var trgx = Angles.trnsx(this.angleTo(this.target) + 90, 2);
						var trgy = Angles.trnsy(this.angleTo(this.target) + 90, 2);
						this.velocity().add(vel.trns(this.angleTo(this.x + trgx, this.y + trgy), Mathf.random(0.25) * Time.delta()));
					}
					else {
						var trgx = Angles.trnsx(this.angleTo(this.target) - 90, 2);
						var trgy = Angles.trnsy(this.angleTo(this.target) - 90, 2);
						this.velocity().add(vel.trns(this.angleTo(this.x + trgx, this.y + trgy), Mathf.random(0.25) * Time.delta()));
					}
					this.avoidOthers();
				}
			}
		}
		catch(error){
			print(error);
		}
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.08);
		}
	}
})));