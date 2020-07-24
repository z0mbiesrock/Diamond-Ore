
const basiliskUnitShoot = newEffect(15, e => {
	Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
	var w = 1 + 7 * e.fout();
	Drawf.tri(e.x, e.y, w, 18 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, w, 6 * e.fout(), e.rotation + 180);
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#dce664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 2 + 12 * e.fin(), e.rotation, 45,d);
});
const basiliskUnitBulletDespawn = newEffect(14, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 20 * e.fin(), e.rotation, 45,d);
});
const basiliskUnitBulletHit = newEffect(19, e => {
    Lines.stroke(e.fout() * 1.523);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#ecf664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 5, 13 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9ce664"), Mathf.random());
    Lines.stroke(e.fout() * 1.75);
    Lines.circle(e.x, e.y, e.fin() * 9);
});
const basiliskUnitBulletTrail = newEffect(19, e => {
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9ce664").shiftHue(Mathf.random(-15,15)), Mathf.random());
    Lines.stroke(e.fout() * 1.75);
    Lines.circle(e.x, e.y, e.fin() * (1 + Mathf.random(-0.5,3)));
    Draw.color(Color.valueOf("#aeff5a").shiftHue(Mathf.random(-15,15)), Color.valueOf("#9ce6d4"), Mathf.random());
    Fill.circle(e.x, e.y, e.fin() * 3);
});
const basiliskUnitBulletFrag = extend(BasicBulletType, {
});
basiliskUnitBulletFrag.lifetime = 10;
basiliskUnitBulletFrag.bulletWidth = 3;
basiliskUnitBulletFrag.bulletHeight = 7;
basiliskUnitBulletFrag.frontColor = Color.valueOf("#deef5a");
basiliskUnitBulletFrag.backColor = Color.valueOf("#ddff00");
basiliskUnitBulletFrag.damage = 9;
basiliskUnitBulletFrag.despawnEffect = Fx.none;
basiliskUnitBulletFrag.hitEffect = basiliskUnitBulletHit;
basiliskUnitBulletFrag.shootEffect = Fx.none;
basiliskUnitBulletFrag.smokeEffect = Fx.none;
const basiliskWeaponBulletArtillery = extend(ArtilleryBulletType, {
	range(){
        return 275
    },
});
basiliskWeaponBulletArtillery.speed = 7.3;
basiliskWeaponBulletArtillery.drag = 0.01;
basiliskWeaponBulletArtillery.lifetime = 46;
basiliskWeaponBulletArtillery.bulletWidth = 7.5;
basiliskWeaponBulletArtillery.bulletHeight = 17.5;
basiliskWeaponBulletArtillery.frontColor = Color.valueOf("#deef5a");
basiliskWeaponBulletArtillery.backColor = Color.valueOf("#ddff00");
basiliskWeaponBulletArtillery.damage = 17;
basiliskWeaponBulletArtillery.splashDamage = 25;
basiliskWeaponBulletArtillery.splashDamage = 12.5;
basiliskWeaponBulletArtillery.despawnEffect = basiliskUnitBulletDespawn;
basiliskWeaponBulletArtillery.hitEffect = Fx.flakExplosion;
basiliskWeaponBulletArtillery.shootEffect = basiliskUnitShoot;
basiliskWeaponBulletArtillery.trailEffect = basiliskUnitBulletTrail;
basiliskWeaponBulletArtillery.smokeEffect = Fx.none;
basiliskWeaponBulletArtillery.fragVelocityMin = 0.2;
basiliskWeaponBulletArtillery.fragVelocityMax = 7.2;
basiliskWeaponBulletArtillery.fragBullets = 18;
basiliskWeaponBulletArtillery.fragBullet = basiliskUnitBulletFrag;
basiliskWeaponBulletArtillery.bulletSprite = "diamond-ore-diamondbullet";
basiliskWeaponBulletArtillery.collidesTiles = true;
basiliskWeaponBulletArtillery.collides = true;
basiliskWeaponBulletArtillery.hitsTiles = true;
const basiliskUnitWeapon = extendContent(Weapon, "basilisk-equip-artillery", {
	load(){
		this.region = Core.atlas.find("diamond-ore-basilisk-equip-artillery");
	}
});
basiliskUnitWeapon.width = 3.2;
basiliskUnitWeapon.length = 17;
basiliskUnitWeapon.recoil = 5;
basiliskUnitWeapon.reload = 106;
basiliskUnitWeapon.shotDelay = 0;
basiliskUnitWeapon.shots = 8;
basiliskUnitWeapon.targetDistance = 150;
basiliskUnitWeapon.minPlayerDist = 9;
basiliskUnitWeapon.inaccuracy = 14;
basiliskUnitWeapon.spacing = 0;
basiliskUnitWeapon.shootCone = 100;
basiliskUnitWeapon.alternate = true;
basiliskUnitWeapon.velocityRnd = 0.3;
basiliskUnitWeapon.bullet = basiliskWeaponBulletArtillery;
basiliskUnitWeapon.shootSound = Sounds.artillery;
basiliskUnitWeapon.shootEffect = basiliskUnitShoot;

const basiliskWeaponBulletAntiAir = extend(MissileBulletType, {
	range(){
        return 275
    },
	update(b){
        if(Mathf.chance(Time.delta() * 0.45)){
            Effects.effect(Fx.missileTrail, this.trailColor, b.x, b.y, 2);
        }
		
        var airtarget = Units.closestEnemy(b.getTeam(), b.x, b.y, this.homingRange, boolf(e => e.isFlying()));
		if (airtarget != null){
			var homingStr = 1 - (airtarget.dst(b) / this.homingRange);
			b.velocity().setAngle(Mathf.slerpDelta(b.velocity().angle(), b.angleTo(airtarget), homingStr));
		}
    }
});
basiliskWeaponBulletAntiAir.speed = 5.92;
basiliskWeaponBulletAntiAir.drag = 0.005;
basiliskWeaponBulletAntiAir.lifetime = 135;
basiliskWeaponBulletAntiAir.bulletWidth = 6;
basiliskWeaponBulletAntiAir.bulletHeight = 12;
basiliskWeaponBulletAntiAir.hitSize = 6;
basiliskWeaponBulletAntiAir.bulletSprite = "diamond-ore-diamondconcus";
basiliskWeaponBulletAntiAir.bulletShrink = 0;
basiliskWeaponBulletAntiAir.splashDamage = 105;
basiliskWeaponBulletAntiAir.splashDamageRadius = 15;
basiliskWeaponBulletAntiAir.homingRange = 200;
basiliskWeaponBulletAntiAir.homingPower = 1;
basiliskWeaponBulletAntiAir.weaveMag = 11;
basiliskWeaponBulletAntiAir.weaveScale = 2;
basiliskWeaponBulletAntiAir.keepVelocity = false;
basiliskWeaponBulletAntiAir.collidesTiles = false;
basiliskWeaponBulletAntiAir.hitsTiles = false;
basiliskWeaponBulletAntiAir.frontColor = Color.valueOf("#99ff99");
basiliskWeaponBulletAntiAir.backColor = Color.valueOf("#ddff00");
basiliskWeaponBulletAntiAir.trailColor = Color.valueOf("#ddeeff");
basiliskWeaponBulletAntiAir.damage = 45;
basiliskWeaponBulletAntiAir.despawnEffect = Fx.none;
basiliskWeaponBulletAntiAir.shootEffect = Fx.shootBigSmoke2;
basiliskWeaponBulletAntiAir.smokeEffect = Fx.shootBigSmoke;
basiliskWeaponBulletAntiAir.hitEffect = Fx.plasticExplosion;
basiliskWeaponBulletAntiAir.hitSound = Sounds.boom;
const basiliskUnitWeapon2 = extendContent(Weapon, "basilisk-equip-antiair", {
	load(){
		this.region = Core.atlas.find("diamond-ore-basilisk-equip-antiair");
	}
});
basiliskUnitWeapon2.width = 6.72;
basiliskUnitWeapon2.length = 12;
basiliskUnitWeapon2.recoil = 2;
basiliskUnitWeapon2.reload = 43;
basiliskUnitWeapon2.shotDelay = 0;
basiliskUnitWeapon2.shots = 1;
basiliskUnitWeapon2.targetDistance = 150;
basiliskUnitWeapon2.minPlayerDist = 9;
basiliskUnitWeapon2.inaccuracy = 2;
basiliskUnitWeapon2.spacing = 0;
basiliskUnitWeapon2.alternate = true;
basiliskUnitWeapon2.bullet = basiliskWeaponBulletAntiAir;
basiliskUnitWeapon2.shootSound = Sounds.missile;
basiliskUnitWeapon2.shootEffect = basiliskUnitShoot;
basiliskUnitWeapon2.region = Core.atlas.find("diamond-ore-basilisk-equip-antiair");
const basiliskUnit = new JavaAdapter(UnitType, {}, "basilisk",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		basiliskUnitWeapon2.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-basilisk-cell");
    },
	getWeapon2(){
        return basiliskUnitWeapon2;
    },
	draw(){
        this.super$draw();
		//Draw second set of weapons
		if (this.getWeapon2() != null) {
			for(var j = 0; j < Mathf.signs.length; j++){
				var i = Mathf.signs[j];
				var tra = this.rotation - 90;
				var trY = -this.getWeapon2().getRecoil(this, i > 0) + this.type.weaponOffsetY;
				var w = -i * this.getWeapon2().region.getWidth() * Draw.scl;
				Draw.rect(Core.atlas.find("diamond-ore-basilisk-equip-antiair"), this.x + Angles.trnsx(tra, this.getWeapon2().width * i, trY), this.y + Angles.trnsy(tra, this.getWeapon2().width * i, trY), w, this.getWeapon2().region.getHeight() * Draw.scl, this.rotation - 90);
			}
		}
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
	update(){
		this.super$update();
		var closestBullet = this.nearestBullet(this.getTeam(), this.x, this.y, 64, boolf(b => b.getBulletType().hitSize < 25 && b.getBulletType().speed < 11));
		if (closestBullet != null){
				var vel = Vec2(this.x, this.y);
				var sde = Mathf.random(-45,45);
				if (closestBullet.dst(this) < 54){
					this.velocity().add(vel.trns(this.angleTo(closestBullet) + sde, -0.12 * Time.delta()));
				}
				if (closestBullet.dst(this) < 48){
					this.velocity().add(vel.trns(this.angleTo(closestBullet) + sde, -0.14 * Time.delta()));
				}
				if (closestBullet.dst(this) < 42){
					this.velocity().add(vel.trns(this.angleTo(closestBullet) + sde, -0.16 * Time.delta()));
				}
				if (closestBullet.dst(this) < 36){
					this.velocity().add(vel.trns(this.angleTo(closestBullet) + sde, -0.18 * Time.delta()));
				}
				if (closestBullet.dst(this) < 30){
					this.velocity().add(vel.trns(this.angleTo(closestBullet) + sde, -0.20 * Time.delta()));
				}
				if (closestBullet.dst(this) < 24){
					this.velocity().add(vel.trns(this.angleTo(closestBullet) + sde, -0.22 * Time.delta()));
				}
			this.avoidOthers();
		}
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.05);
		}
    },
	
	behavior(){
		if(this.target instanceof BaseUnit){
			if(!Units.invalidateTarget(this.target, this)){
				if(this.dst(this.target) < this.getWeapon2().bullet.range() && this.target.isFlying()){

					this.rotate(this.angleTo(this.target));

					if(Angles.near(this.angleTo(this.target), this.rotation, this.type.shootCone * 3)){
						this.getWeapon().bullet = basiliskWeaponBulletAntiAir;
						this.getWeapon().shots = 1;
						this.getWeapon().inaccuracy = 0;
						this.getWeapon().velocityRnd = 0;
						var ammo2 = this.getWeapon2().bullet;

						var to = Predict.intercept(this, this.target, ammo2.speed);

						this.getWeapon2().update(this, to.x, to.y);
					}
				}
				else if((this.dst(this.target) < this.getWeapon().bullet.range()) && !(this.target.isFlying())){

					this.rotate(this.angleTo(this.target));

					if(Angles.near(this.angleTo(this.target), this.rotation, this.type.shootCone)){
						this.getWeapon().bullet = basiliskWeaponBulletArtillery;
						this.getWeapon().shots = 4;
						this.getWeapon().inaccuracy = 14;
						this.getWeapon().velocityRnd = 0.3;
						var ammo = this.getWeapon().bullet;

						var to = Predict.intercept(this, this.target, ammo.speed);

						this.getWeapon().update(this, to.x, to.y);
					}
				}
			}
		}
		else{
			//print(this.target);
			this.getWeapon().bullet = basiliskWeaponBulletArtillery;
			this.getWeapon().shots = 4;
			this.getWeapon().inaccuracy = 14;
			this.getWeapon().velocityRnd = 0.3;
			if((this.dst(this.target) < this.getWeapon().bullet.range())){

				this.rotate(this.angleTo(this.target));

				if(Angles.near(this.angleTo(this.target), this.rotation, this.type.shootCone)){
					this.getWeapon().bullet = basiliskWeaponBulletArtillery;
					this.getWeapon().shots = 4;
					this.getWeapon().inaccuracy = 14;
					this.getWeapon().velocityRnd = 0.3;
					var ammo = this.getWeapon().bullet;

					var to = Predict.intercept(this, this.target, ammo.speed);

					this.getWeapon().update(this, to.x, to.y);
				}
			}
		}
	}
})));
basiliskUnit.weapon = basiliskUnitWeapon;
//basiliskUnit.weapon2 = basiliskUnitWeapon2;