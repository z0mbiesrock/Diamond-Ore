//this is NOT the complete definition for this block! see content/blocks/surge-reactor.hjson for the stats and other properties.

const surgeReactorMeltdownFlak = extend(MissileBulletType, {});

surgeReactorMeltdownFlak.speed = 9;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownFlak.damage = 250;
surgeReactorMeltdownFlak.bulletWidth = 16;
surgeReactorMeltdownFlak.bulletHeight = 24;
surgeReactorMeltdownFlak.lifetime = 60;
surgeReactorMeltdownFlak.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.despawnEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.hitSize = 5;
surgeReactorMeltdownFlak.lightining = 5;
surgeReactorMeltdownFlak.lightningLength = 10;
surgeReactorMeltdownFlak.weaveScale = 3;
surgeReactorMeltdownFlak.weaveMag = 3;
surgeReactorMeltdownFlak.pierce = true;
surgeReactorMeltdownFlak.bulletSprite = "shell";
surgeReactorMeltdownFlak.frontColor = Color.valueOf("#ffffcc");
surgeReactorMeltdownFlak.frontColor = Color.valueOf("#ffffcc");
surgeReactorMeltdownFlak.trailColor = Color.valueOf("#ffffcc");

//create a simple shockwave effect
const surgeReactorMeltdownBlast = extend(BasicBulletType, {});

surgeReactorMeltdownBlast.speed = 0.001;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownBlast.damage = 500;
surgeReactorMeltdownBlast.drawSize = 480;
surgeReactorMeltdownBlast.lifetime = 1;
surgeReactorMeltdownBlast.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownBlast.despawnEffect = Fx.nuclearShockwave;
surgeReactorMeltdownBlast.hitSize = 5;
surgeReactorMeltdownBlast.lightining = 5;
surgeReactorMeltdownBlast.lightningLength = 25;
surgeReactorMeltdownBlast.pierce = true;
surgeReactorMeltdownBlast.fragVelocityMin = 0.15;
surgeReactorMeltdownBlast.fragVelocityMax = 1.75;
surgeReactorMeltdownBlast.fragBullets = 20;
surgeReactorMeltdownBlast.fragBullet = surgeReactorMeltdownFlak;

const SurgeReactor = extendContent(NuclearReactor, "surge-reactor", {
	
    //OVERRIDE
	onDestroyed(tile){
				surgeReactorMeltdownBlast.lightningLength = 25
                Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
				surgeReactorMeltdownBlast.lightningLength = 30
                Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
				surgeReactorMeltdownBlast.lightningLength = 35
                Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
				surgeReactorMeltdownBlast.lightningLength = 40
                Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
				surgeReactorMeltdownBlast.lightningLength = 45
                Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
				surgeReactorMeltdownBlast.lightningLength = 50
	},
})
/* surgeReactor.itemCapacity: 100
surgeReactor.liquidCapacity: 100
surgeReactor.health: 6000
surgeReactor.baseExplosiveness: 50
surgeReactor.heating: 0.02
surgeReactor.explosionRadius: 50
surgeReactor.explosionDamage: 98657
surgeReactor.smokeThreshold: 0.5
surgeReactor.flashThreshold: 0.75
surgeReactor.coolantPower: 0.225
surgeReactor.buildCostMultiplier: 0.73227
surgeReactor.powerProduction: 166.66666666666666666666666666667
surgeReactor.lightColor = Color.valueOf("7f19ea");
surgeReactor.coolColor = Color.valueOf("ffff00a3");
surgeReactor.hotColor = Color.valueOf("ff9575a3");
surgeReactor.update: true */