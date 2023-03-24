//this is NOT the complete definition for this block! see content/blocks/surge-reactor.hjson for the stats and other properties.

const surgeReactorMeltdownFlak = extend(MissileBulletType, {});

surgeReactorMeltdownFlak.speed = 8;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownFlak.damage = 500;
surgeReactorMeltdownFlak.splashDamage = 400;
surgeReactorMeltdownFlak.splashDamageRadius = 80;
surgeReactorMeltdownFlak.width = 16;
surgeReactorMeltdownFlak.height = 200;
surgeReactorMeltdownFlak.shrinkY = 1;
surgeReactorMeltdownFlak.shrinkX = 1;
surgeReactorMeltdownFlak.lifetime = 60;
surgeReactorMeltdownFlak.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.despawnEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.hitSize = 5;
surgeReactorMeltdownFlak.lightning = 5;
surgeReactorMeltdownFlak.lightningLength = 15;
surgeReactorMeltdownFlak.lightningLengthRand = 15;
surgeReactorMeltdownFlak.pierce = true;
surgeReactorMeltdownFlak.homingPower= 0;
surgeReactorMeltdownFlak.homingRange= 0;
surgeReactorMeltdownFlak.bulletSprite = "diamond-ore-diamondbullet";
surgeReactorMeltdownFlak.frontColor = Color.valueOf("#ffffcc");
surgeReactorMeltdownFlak.backColor = Color.valueOf("#ffff00");
surgeReactorMeltdownFlak.trailColor = Color.valueOf("#ffffff");

const surgeReactorMeltdownShockFork = extend(LightningBulletType, {
});
surgeReactorMeltdownShockFork.lightningLength = 10;
surgeReactorMeltdownShockFork.lightningLengthRand = 10;
surgeReactorMeltdownShockFork.damage = 150;
surgeReactorMeltdownShockFork.pierce = true;

const surgeReactorMeltdownShockA = extend(LightningBulletType, {
});
surgeReactorMeltdownShockA.lightningLength = 35;
surgeReactorMeltdownShockA.lightningLengthRand = 35;
surgeReactorMeltdownShockA.damage = 150;
surgeReactorMeltdownShockA.pierce = true;
surgeReactorMeltdownShockA.lightningType = surgeReactorMeltdownShockFork;
surgeReactorMeltdownShockA.lightningTypeChance = 0.1;

const surgeReactorMeltdownShockB = extend(LightningBulletType, {
});
surgeReactorMeltdownShockB.lightningLength = 35;
surgeReactorMeltdownShockB.lightningLengthRand = 35;
surgeReactorMeltdownShockB.damage = 150;
surgeReactorMeltdownShockB.pierce = true;

const surgeReactorMeltdownFxA = Effect(60, e => {
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

const surgeReactorMeltdownFxB = Effect(80, e => {
	var alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), alignGrad);
    const aed = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 36 + 1);
    }})
    Angles.randLenVectors(e.id, 10, Math.sqrt(65536 * e.fin()), e.rotation, 360,aed);
    const aqd = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 24 + 1);
    }})
    Angles.randLenVectors(e.id, 10, Math.sqrt(65536 * e.fin()), e.rotation, 360,aqd);
	Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), alignGrad);
    const aqf = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Angles.randLenVectors(e.id, 10, Math.sqrt(65536 * e.fin()), e.rotation, 360,aqf);
});

const surgeReactorMeltdown = extend(BasicBulletType, {
});

surgeReactorMeltdown.speed = 0.01;
surgeReactorMeltdown.splashDamage = 2400000;
surgeReactorMeltdown.splashDamageRadius = 320;
surgeReactorMeltdown.lifetime = 1;
surgeReactorMeltdown.hitEffect = Fx.none;
surgeReactorMeltdown.despawnEffect = Fx.none;
surgeReactorMeltdown.hitSize = 16;
surgeReactorMeltdownFlak.width = 16;
surgeReactorMeltdownFlak.height = 200;
//surgeReactorMeltdown.rayLength = 140 + 20;
surgeReactorMeltdown.drawSize = 610;
surgeReactorMeltdown.instantDisappear = true;
surgeReactorMeltdown.shootEffect = Fx.none;
surgeReactorMeltdown.smokeEffect = Fx.none;

const surgeReactorOverloadSound = loadSound("surgeReactorOverheat");

const surgeReactor = extendContent(NuclearReactor, "surge-reactor", {
	
    //OVERRIDE
	drawBase: function(tile){
        this.super$drawBase(tile);
        /* Draw.color(); Anuke make "items.total()" private so now this is dead
		Draw.alpha(this.items.total() / this.itemCapacity);
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy()); */
        Draw.reset();
	},
})
surgeReactor.buildType = () => extendContent(NuclearReactor.NuclearReactorBuild, surgeReactor, {
	
    //OVERRIDE
	onDestroyed(){
		this.super$onDestroyed();
		Sounds.corexplode.at(this.x, this.y);
		Sounds.explosionbig.at(this.x, this.y);
		surgeReactorOverloadSound.at(this.x, this.y);
		Effect.shake(155, 155, this.x, this.y);
		try{
			var playerU = Vars.player.unit();
			Effect.shake(75, 75, playerU.x, playerU.y);
			Sounds.corexplode.at(playerU.x, playerU.y);
			Sounds.explosionbig.at(playerU.x, playerU.y);
			surgeReactorOverloadSound.at(playerU.x, playerU.y);
		}
		catch (err){
			print(err);
		}
		surgeReactorMeltdownFxA.at(this.x, this.y, Mathf.random(-360,360));
        for(var lfr = 0; lfr < 15; lfr++){
            surgeReactorMeltdownFxB.at(this.x, this.y, Mathf.random(-360,360));
		}
        for(var i = 0; i < 45; i++){
			surgeReactorMeltdownFlak.weaveScale = Mathf.range(4); 
			surgeReactorMeltdownFlak.weaveMag = Mathf.range(4); 
            surgeReactorMeltdownFlak.create(this, Team.derelict, this.x, this.y, Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
            //surgeReactorMeltdownShockA, Team.derelict, this.y, this.y, Mathf.random(360), 1, 1);
            surgeReactorMeltdownShockB.create(this, Team.derelict, this.x, this.y, Mathf.random(360), 1, 1);
		}
	},
});

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