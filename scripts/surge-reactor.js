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

const SurgeReactor = extendContent(NuclearReactor, "surge-reactor", {
	
    //OVERRIDE
	/* draw: function(tile){
		Blocks.thoriumReactor.draw(tile);
		Draw.alpha(tile.entity.items.total() / tile.entity.itemCapacity);
		Draw.rect(Core.atlas.find("diamond-ore-surge-reactor-top"), tile.drawx(), tile.drawy());
	}, */
	
    //OVERRIDE
	onDestroyed: function(tile){
		Blocks.thoriumReactor.onDestroyed(tile);
        for(var i = 0; i < 45; i++){
            Calls.createBullet(surgeReactorMeltdownFlak, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0))
		}
		surgeReactorMeltdownBlast.lightningLength = 25
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
		surgeReactorMeltdownBlast.lightningLength = 35
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
		surgeReactorMeltdownBlast.lightningLength = 45
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
		surgeReactorMeltdownBlast.lightningLength = 55
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
		surgeReactorMeltdownBlast.lightningLength = 65
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
		surgeReactorMeltdownBlast.lightningLength = 75
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
 */
surgeReactor.lightColor = Color.valueOf("7f19ea");
surgeReactor.coolColor = Color.valueOf("ffff00a3");
surgeReactor.hotColor = Color.valueOf("ff9575a3");