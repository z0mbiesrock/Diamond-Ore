//this is NOT the complete definition for this block! see content/blocks/surge-reactor.hjson for the stats and other properties.

const surgeReactorMeltdownFlak = extend(MissileBulletType, {});

surgeReactorMeltdownFlak.speed = 8;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownFlak.damage = 500;
surgeReactorMeltdownFlak.bulletWidth = 16;
surgeReactorMeltdownFlak.bulletHeight = 200;
surgeReactorMeltdownFlak.bulletShrink = 1;
surgeReactorMeltdownFlak.lifetime = 60;
surgeReactorMeltdownFlak.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.despawnEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.hitSize = 5;
surgeReactorMeltdownFlak.lightining = 5;
surgeReactorMeltdownFlak.lightningLength = 25;
surgeReactorMeltdownFlak.pierce = true;
surgeReactorMeltdownFlak.homingPower= 0;
surgeReactorMeltdownFlak.homingRange= 0;
surgeReactorMeltdownFlak.bulletSprite = "bullet";
surgeReactorMeltdownFlak.frontColor = Color.valueOf("#ffffcc");
surgeReactorMeltdownFlak.backColor = Color.valueOf("#ffff00");
surgeReactorMeltdownFlak.trailColor = Color.valueOf("#ffffff");

//create a simple shockwave effect
const surgeReactorMeltdownBlast = extend(BasicBulletType, {});

surgeReactorMeltdownBlast.speed = 0.001;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownBlast.damage = 2000;
surgeReactorMeltdownBlast.drawSize = 480;
surgeReactorMeltdownBlast.lifetime = 1;
surgeReactorMeltdownBlast.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownBlast.despawnEffect = Fx.nuclearShockwave;
surgeReactorMeltdownBlast.hitSize = 5;
surgeReactorMeltdownBlast.lightining = 5;
surgeReactorMeltdownBlast.lightningLength = 25;
surgeReactorMeltdownBlast.pierce = true;
/* surgeReactorMeltdownBlast.fragVelocityMin = 0.25;
surgeReactorMeltdownBlast.fragVelocityMax = 2.55;
surgeReactorMeltdownBlast.fragBullets = 40;
surgeReactorMeltdownBlast.fragBullet = surgeReactorMeltdownFlak; */
surgeReactorMeltdownBlast.frontColor = Color.valueOf("#ffffcc");
surgeReactorMeltdownBlast.backColor = Color.valueOf("#ffff00");
surgeReactorMeltdownBlast.trailColor = Color.valueOf("#ffffff");

const surgeReactorMeltdownShock = extend(BasicBulletType, {
});
surgeReactorMeltdownShock.lightining = 5;
surgeReactorMeltdownShock.lightningLength = 35;
surgeReactorMeltdownShock.damage = 150;
surgeReactorMeltdownShock.instantDisappear = true;
surgeReactorMeltdownShock.pierce = true;

const surgeReactorMeltdownFxA = newEffect(60, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 10);
    }})
    const aed = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 7);
    }})
    Angles.randLenVectors(e.id, 15, 20 - 120 * e.fout(), e.rotation + 180, 360 * e.fin(),d);
    Angles.randLenVectors(e.id, 15, 192 * e.fout(), e.rotation, 360 * e.fout(),aed);
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fout());
    Angles.randLenVectors(e.id, 15, 20 - 120 * e.fout(), e.rotation, 360 * e.fout(),d);
    Angles.randLenVectors(e.id, 15, 192 * e.fout(), e.rotation, 360 * e.fout(),aed);
});

const surgeReactorMeltdownFxB = newEffect(80, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), alignGrad);
    const aed = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Angles.randLenVectors(e.id, 10, Math.sqrt(65536 * e.fin()), e.rotation + 180, 360,aed);
});

const surgeReactorMeltdown = extend(BasicBulletType, {
});

surgeReactorMeltdown.speed = 0.01;
surgeReactorMeltdown.splashDamage = 25000000;
surgeReactorMeltdown.splashDamageRadius = 320;
surgeReactorMeltdown.lifetime = 1;
surgeReactorMeltdown.hitEffect = Fx.none;
surgeReactorMeltdown.despawnEffect = Fx.none;
surgeReactorMeltdown.hitSize = 16;
surgeReactorMeltdownFlak.bulletWidth = 16;
surgeReactorMeltdownFlak.bulletHeight = 200;
//surgeReactorMeltdown.rayLength = 140 + 20;
surgeReactorMeltdown.drawSize = 610;
surgeReactorMeltdown.instantDisappear = true;
surgeReactorMeltdown.shootEffect = Fx.none;
surgeReactorMeltdown.smokeEffect = Fx.none;

const SurgeReactor = extendContent(NuclearReactor, "surge-reactor", {
	
    //OVERRIDE
	draw: function(tile){
        this.super$draw(tile);
        Draw.color();
		Draw.alpha(tile.entity.items.total() / this.itemCapacity);
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
        Draw.reset();
	},
	
    //OVERRIDE
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
		Calls.createBullet(surgeReactorMeltdown, Team.derelict, tile.drawx(), tile.drawy(), 0, 0.1, 0.1);
		Sounds.explosionbig.at(tile.drawx(), tile.drawy());
		Effects.shake(122, 122, tile.drawx(), tile.drawy());
		try{
			Units.all(cons(plr => {
				if (plr.isDead() == false && plr instanceof Player){
					Effects.shake(45, 45, plr.x, plr.y);
					Sounds.corexplode.at(plr.x, plr.y);
					Sounds.explosionbig.at(plr.x, plr.y);
					Sounds.explosionbig.at(plr.x, plr.y);
					Sounds.explosionbig.at(plr.x, plr.y);
				}
			}));
		}
		catch (err){
			print(err);
		}
		Effects.effect(surgeReactorMeltdownFxA, tile.drawx(), tile.drawy(), Mathf.random(-360,360));
        for(var lfr = 0; lfr < 15; lfr++){
            Effects.effect(surgeReactorMeltdownFxB, tile.drawx(), tile.drawy(), Mathf.random(-360,360));
		}
        for(var i = 0; i < 45; i++){
            Calls.createBullet(surgeReactorMeltdownFlak, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
		}
		surgeReactorMeltdownBlast.lightningLength = 25;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 35;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 45;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 55;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 65;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 75;
	},
})

/* const SurgeBattery = extendContent(Battery, "surgebattery", {
    //OVERRIDE
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 55; i++){
            Calls.createBullet(Bullets.cryoShot, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 3.0));
		}
        for(var i = 0; i < 15; i++){
            Calls.createBullet(Bullets.flakSurge, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
		}
	},
	
}) */