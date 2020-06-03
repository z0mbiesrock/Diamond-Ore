

const sporeBomberSplitFx = newEffect(25, e => {
	Draw.color(Color.valueOf("#9f81db"), Color.valueOf("#008fc4"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.random(1,2));
    }})
    Angles.randLenVectors(e.id, 3, e.fin() * 8, d);
});
const sporeBomberSplitStatus = new StatusEffect("spore-bomber-splitted");
sporeBomberSplitStatus.speedMultiplier = 12;
sporeBomberSplitStatus.armorMultiplier = 12.25;
sporeBomberSplitStatus.damageMultiplier = 1;
sporeBomberSplitStatus.effect = Fx.none;
const sporeWater = Vars.content.getByName(ContentType.liquid, "diamond-ore-corrupt-water");
const sporeBombGasDamage = extend(BasicBulletType, {});
sporeBombGasDamage.speed = 1;
sporeBombGasDamage.lifetime = 5;
sporeBombGasDamage.damage = 10;
sporeBombGasDamage.bulletWidth = 0;
sporeBombGasDamage.bulletHeight = 0;
sporeBombGasDamage.bulletShrink = 0;
sporeBombGasDamage.pierce = true;
sporeBombGasDamage.hitEffect = Fx.none;
sporeBombGasDamage.despawnEffect = Fx.none;
const sporeBombGas = extend(MissileBulletType, {
	//OVERRIDE
    update(b){
        this.super$update(b);
		Calls.createBullet(sporeBombGasDamage, this.getTeam(), tile.worldx(), tile.worldy(), this.rot() + Mathf.random(-360,360), Mathf.random(0.35, 1.4), Mathf.random(0.5, 1.2));
    },
	
});
sporeBombGas.speed = 3;
sporeBombGas.lifetime = 45;
sporeBombGas.splashDamage = 18;
sporeBombGas.bulletWidth = 2;
sporeBombGas.bulletHeight = 2;
sporeBombGas.weaveScale = 2;
sporeBombGas.weaveMag = 2;
sporeBombGas.bulletShrink = 0;
sporeBombGas.bulletSprite = "shell";
sporeBombGas.frontColor = Color.valueOf("#7a00a6");
sporeBombGas.backColor = Color.valueOf("#355085");
sporeBombGas.hitEffect = Fx.wet;
sporeBombGas.despawnEffect = Fx.wet;
const sporeBomberBoomFx1 = newEffect(30, e => {
	Draw.color(Color.valueOf("#7d55a5"), Color.valueOf("#75518e"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 1, 45 + (360 * Mathf.random()));
    }})
    Angles.randLenVectors(e.id, 12, 8 + e.fin() * 32, d);
    Angles.randLenVectors(e.id, 18, 8 + e.fin() * 45, d);
    Lines.stroke(e.fout() * 8);
    Lines.circle(e.x, e.y, 8 + e.fin() * 40);
    const rs = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Angles.randLenVectors(e.id, 18, 8 + e.fin() * 45, rs);
});
const sporeBombWeapon1 = extend(Weapon, {});
sporeBombWeapon1.bullet = sporeBombGas;
sporeBombWeapon1.shots = 25;
sporeBombWeapon1.velocityRnd = 1;
sporeBombWeapon1.shootEffect = sporeBomberBoomFx1;
sporeBombWeapon1.shootSound = Sounds.explosionbig;
const sporeBomberFx1 = newEffect(50, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d4595"), Color.valueOf("#75518e"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 1, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 8 - e.fin() * 3, d);
});

const sporeBomb1 = new JavaAdapter(UnitType, {}, "spore-bomber",  prov(() => new JavaAdapter(FlyingUnit, {
	drawEngine(){
		Effects.effect(sporeBomberFx1, this.x, this.y, Mathf.random(-360,360));
	},
	getPowerCellRegion(){
        return Core.atlas.find("clear");
    },
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.27);
		}
		if (this.hasEffect(sporeBomberSplitStatus)){
			vel = Vec2(this.x, this.y);
			this.velocity().add(Mathf.random(-5,5), Mathf.random(-5,5));
			this.avoidOthers();	
		}
	},
})));
sporeBomb1.weapon = sporeBombWeapon1;

const sporeBomberFx2 = newEffect(70, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d4595"), Color.valueOf("#75518e"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 1.4, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 16 - e.fin() * 7, d);
});

const sporeBomb2 = new JavaAdapter(UnitType, {}, "spore-bomber-large",  prov(() => new JavaAdapter(FlyingUnit, {
	drawEngine(){
		Effects.effect(sporeBomberFx2, this.x, this.y, Mathf.random(-360,360));
	},
	getPowerCellRegion(){
        return Core.atlas.find("clear");
    },
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.54);
		}
		if (this.hasEffect(sporeBomberSplitStatus)){
			vel = Vec2(this.x, this.y);
			this.velocity().add(Mathf.random(-8,8), Mathf.random(-8,8));
			this.avoidOthers();	
		}
	},
    onDeath(){
		if (this.health <= 0){
			Sounds.explosionbig.at(this);
			const vec = new Vec2();
			for(var i = 0; i < 2; i++){
				var split = sporeBomb1.create(this.getTeam());
				var splitrot = Mathf.random(-360,360)
				split.rotation = splitrot;
				vec = vec.trns(splitrot, 25);
				split.applyEffect(sporeBomberSplitStatus, 6);
				split.set(this.x, this.y);
				split.velocity().set(vec);
				split.add();
			}
		}
    this.super$onDeath();
    }
})));

const sporeBomberFx3 = newEffect(90, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d4595"), Color.valueOf("#75518e"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 1.8, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 32 - e.fin() * 10, d);
});
const sporeBomb3 = new JavaAdapter(UnitType, {}, "spore-bomber-giant",  prov(() => new JavaAdapter(FlyingUnit, {
	drawEngine(){
		Effects.effect(sporeBomberFx3, this.x, this.y, Mathf.random(-360,360));
	},
	getPowerCellRegion(){
        return Core.atlas.find("clear");
    },
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.81);
		}
	},
    onDeath(){
		if (this.health <= 0){
			Sounds.explosionbig.at(this);
			const vec = new Vec2();
			for(var i = 0; i < 2; i++){
				var split = sporeBomb2.create(this.getTeam());
				var splitrot = Mathf.random(-360,360)
				split.rotation = splitrot;
				vec = vec.trns(splitrot, 25);
				split.applyEffect(sporeBomberSplitStatus, 6);
				split.set(this.x, this.y);
				split.velocity().set(vec);
				split.add();
			}
		}
    this.super$onDeath();
    }
})));