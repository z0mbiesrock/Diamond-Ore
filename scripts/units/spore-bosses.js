const sporeChaosArray = new JavaAdapter(UnitType, {}, "spore-chaos-array",  prov(() => new JavaAdapter(GroundUnit, {
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-spore-chaos-array-cell");
    },
	calculateDamage(amount){
		finalAmount = amount * (((50 * (this.health / this.maxHealth())) + 50)/ 100);
		return finalAmount;
	},
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.27);
		}
	},
})));


const sporeEradicator = new JavaAdapter(UnitType, {}, "spore-eradicator",  prov(() => new JavaAdapter(GroundUnit, {
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-spore-eradicator-cell");
    },
	//OVERRIDE
	calculateDamage(amount){ //Damage scaling similar to Hush and Ultra Greed from The Binding of Isaac: Afterbirth
		dmgScl = (this.health - amount) / this.maxHealth();
		if(dmgScl < 0){
				dmgScl = this.health / this.maxHealth();
		}
		semiFinalAmount = Math.min((this.health / 5), (amount * dmgScl)); // Soft-cap damage taken 
		finalAmount = Math.max(1, semiFinalAmount);
		return finalAmount;
	},
	update(){
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * Mathf.random(0.5,1.5));
		}
		this.super$update();
		//this.getWeapon();
	},
})));
const sporeEradShoot = newEffect(20, e => {
	wvyus = Mathf.random(-1,1);
	if (wvyus < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignGrad);
    Lines.stroke(e.fout() * 3);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 12, 1 + 25 * e.fin(), e.rotation, 90,d);
});
const sporeEradHit = newEffect(20, e => {
    Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), e.fin());
    Lines.stroke(e.fout() * 12);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 12);
    }}) 
    Angles.randLenVectors(e.id, 25, 30 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 6);
    Lines.circle(e.x, e.y, e.fin() * 24);
});

const sporeEradTrail = newEffect(40, e => {
	wvyus = Mathf.random(-1,1);
	if (wvyus < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignGrad);
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fout() * 4);
});
const sporeEradTrailSml = newEffect(22, e => {
	wvyus = Mathf.random(-1,1);
	if (wvyus < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignGrad);
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fout() * 2);
});
const sporeWater = Vars.content.getByName(ContentType.liquid, "diamond-ore-corrupt-water");
const sporeEradSplash = extend(ArtilleryBulletType, {
	//OVERRIDE
    draw(b){
        this.super$draw(b);
        this.bulletWidth = this.bulletWidth;
		Draw.color(Color.valueOf("#355085"));
		splS = 3 + Math.abs(6 - (b.fin() * 12))
		Fill.circle(b.x, b.y, splS);
		Draw.reset();
    },
	//OVERRIDE
    despawned(b){
        this.super$despawned(b);
		for(var i = 0; i < 3; i++){
			tile = world.tileWorld(b.x + Mathf.range(8), b.y + Mathf.range(8));
			Puddle.deposit(tile, sporeWater, Math.ceil(Mathf.random(4,15)));
		}
    },
});
sporeEradSplash.speed = 3;
sporeEradSplash.lifetime = 45;
sporeEradSplash.splashDamage = 18;
sporeEradSplash.splashDamageRadius = 12;
sporeEradSplash.bulletWidth = 0;
sporeEradSplash.bulletHeight = 0;
sporeEradSplash.bulletShrink = 0;
sporeEradSplash.frontColor = Color.valueOf("#7a00a6");
sporeEradSplash.backColor = Color.valueOf("#355085");
sporeEradSplash.trailEffect = sporeEradTrailSml;
const sporeEradBullet = extend(ArtilleryBulletType, {
	//OVERRIDE
	range(){
		return 255
	},
	//OVERRIDE
    update(b){
        this.super$update(b);
		Units.nearby(this.getTeam(), this.x, this.y, 10, cons(unit => {
			unit.applyEffect(StatusEffects.shielded, 20);
		}));
        if(b.timer.get(0, 3 + b.fslope() * 2)){
            Effects.effect(this.trailEffect, b.x, b.y);
			for(var stg = 0; stg < 3; stg++){
				Effects.effect(sporeEradTrailSml, b.x + Mathf.random(-2,2), b.y + Mathf.random(-2,2));
			}
        }
    },
	//OVERRIDE
    hit(b){
        this.super$hit(b);
		for(var j = 0; j < 3; j++){
            Calls.createBullet(sporeEradSplash, this.getTeam(), tile.worldx(), tile.worldy(), this.rot() + Mathf.random(-22.5,22.5), Mathf.random(0.35, 1.0), Mathf.random(0.5, 1.0));
		}
    },
	//OVERRIDE
    despawned(b){
        this.super$despawned(b);
		for(var k = 0; k < 15; k++){
            Calls.createBullet(sporeEradSplash, this.getTeam(), tile.worldx(), tile.worldy(), this.rot() + Mathf.random(-60,60), Mathf.random(0.35, 1.4), Mathf.random(0.5, 1.2));
		}
		for(var i = 0; i < 7; i++){
			tile = world.tileWorld(b.x + Mathf.range(14), b.y + Mathf.range(14));
			Puddle.deposit(tile, sporeWater, Math.ceil(Mathf.random(9,30)));
		}
    },
	
});

sporeEradBullet.speed = 5;
sporeEradBullet.damage = 24;
sporeEradBullet.splashDamage = 96;
sporeEradBullet.splashDamageRadius = 32;
sporeEradBullet.bulletWidth = 11;
sporeEradBullet.bulletHeight = 22;
sporeEradBullet.bulletShrink = 0.5;
sporeEradBullet.lifetime = 100;
sporeEradBullet.drag = 0.03;
sporeEradBullet.pierce = true;
//sporeEradBullet.hitTiles = false;
sporeEradBullet.frontColor = Color.valueOf("#355085");
sporeEradBullet.backColor = Color.valueOf("#7a00a6");
sporeEradBullet.trailEffect = sporeEradTrail;
sporeEradBullet.despawnEffect = sporeEradHit;
sporeEradBullet.hitEffect = sporeEradHit;
sporeEradBullet.bulletSprite = "diamond-ore-diamondbullet";


const sporeEradWeapon = extendContent(Weapon, "spore-eradication-equip",{});
sporeEradWeapon.length = 13;
sporeEradWeapon.width = 22;
sporeEradWeapon.reload = 80;
sporeEradWeapon.shots = 3;
sporeEradWeapon.recoil = 7;
sporeEradWeapon.spacing = 7;
sporeEradWeapon.bullet = sporeEradBullet;
sporeEradWeapon.shootEffect = sporeEradShoot;
sporeEradWeapon.alternate = true;
sporeEradWeapon.shootSound = Sounds.bigshot;
sporeEradicator.weapon = sporeEradWeapon;
