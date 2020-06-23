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
	update(){
		this.super$update();
		try{ // Put in a "try"; Strafe around enemies
			this.nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 300);
			if (this.nearestfoe != null){
				vel = Vec2(this.x, this.y);
				if (this.nearestfoe.dst(this) < 250 && Mathf.chance(0.075)){
					this.velocity().add(Mathf.random(-2,2), Mathf.random(-2,2));
				}
				this.avoidOthers();	
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
paranoiaTPstatus.speedMultiplier = 1;
paranoiaTPstatus.armorMultiplier = 1;
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
paranoiaMissileFrag.weaveMag = 5;
paranoiaMissileFrag.weaveScale = 3;
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
			var nearestTarget = Units.closestTarget(b.getTeam(), b.x, b.y, 128);
			if(nearestTarget != null){
				Calls.createBullet(paranoiaMissileFrag, b.getTeam(), b.x, b.y, b.rot(), Mathf.random(1, 1.25), 1);
			}
		}
		catch(fck){
			//print(fck);
		}
        this.super$despawned(b);
	},
});
paranoiaMissileFragPortal.speed = 6;
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
paranoiaFighterWeapon.ignoreRotation = true;
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