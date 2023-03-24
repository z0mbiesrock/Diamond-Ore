//Don't ask where I stol-copied this code from.
/* "medGnd" Unit path
*/
const register = require("diamond-ore/units/unitReg");
const medGndHealerAI = prov(() => {
  var u = extend(GroundAI, {
    setAIVars(){
      this._injuredFound = false;
      this._healTarget = null;
    },
    updateTargeting(){
		if(this._healTarget != null){
			if(!(this._healTarget.isValid()) || this.unit.dst(this._healTarget) >= this.unit.type.range * 2.5 || this._healTarget.healthf() >= 1){
				this._healTarget = null;
			}
		}
		var target = Units.closest(this.unit.team, this.unit.x, this.unit.y, this.unit.type.range * 1.5, boolf(unit => unit.healthf() < 1 && unit != this.unit && this.unit.dst(unit) > 0));
		//print(target);
		if(target != null){
			if(this._healTarget != null){
				if((target.healthf() < this._healTarget.healthf()) && Mathf.chance(1 / 20)){
					this._healTarget = target;
				}
			}
			else{
				this._healTarget = target;
			}				
		}
	},
    updateMovement(){
		if(this._healTarget != null){
			//print("arc");
			this.moveTo(this._healTarget, (this.unit.type.range * 0.3 + (this._healTarget.hitSize / 2)));
			var shoot = false;
			if(this.unit.inRange(this._healTarget)){
				this.unit.aim(this._healTarget);
				shoot = true;
			}
			this.unit.controlWeapons(shoot);
		}else{
			this.super$updateMovement();
		}
		this.updateTargeting();
    }
  });
  u.setAIVars();
  
  return u;
});
const medGndT1bulletTrail = Effect(6, e => {	
    const dergtx = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#99ff00"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id + Mathf.angle(x, y)));
		Fill.circle(e.x + x, e.y + y, e.fout() * (2 - Mathf.randomSeed(e.id + Mathf.angle(x, y) + 1)));
    }}) 
    Angles.randLenVectors(e.id, 2, 1 + 2.5 * e.fout(), e.rotation + (Mathf.randomSeed(e.id, -90, 90) * e.finpow()), 360,dergtx);
});
const medGndT1bullet = extend(BulletType, {
    init(b){
		if (b != undefined) {
			this.super$init(b);
			var px = b.x + b.lifetime * b.vel.x;
			var py = b.y + b.lifetime * b.vel.y;
			var rot = b.rotation();
			var healFound = false;
			b.time = b.lifetime;

			b.vel.setZero();
			//b.set(px, py);
			var healTar = Units.closestOverlap(b.team, px, py, 1, boolf(unit => {
				if(unit.healthf() < 1 && unit != b.owner && !unit.dead && !healFound){
					unit.health += Math.abs(b.damage / 60);
					unit.clampHealth();
					if (unit.healthf() == 1){
						Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
					}
					healFound = true;
					return unit;
				}
			}));
			if(healFound){
				Geometry.iterateLine(0, b.x, b.y, healTar.x, healTar.y, 3, (x, y) => {
				medGndT1bulletTrail.at(x, y, rot);
				});
				//Lock player aim onto the unit being repaired; BROKEN
				/* if (b.owner.isPlayer()){
					b.isPlayer().mouseX = healTar.x;
					b.isPlayer().mouseY = healTar.y;
				} */
			}
			b.remove();
		}
    },
	
});
medGndT1bullet.damage = -50;
medGndT1bullet.scaleVelocity = true;
medGndT1bullet.lifetime = 1;
medGndT1bullet.collides = false;
medGndT1bullet.keepVelocity = false;
medGndT1bullet.backMove = false;
medGndT1bullet.speed = 74;
medGndT1bullet.medGndT1bulletTrail = Fx.none;
medGndT1bullet.despawnEffect = Fx.none;
medGndT1bullet.tileDamageMultiplier = 0.6;
medGndT1bullet.smokeEffect = Fx.none;
medGndT1bullet.shootEffect = Fx.none;
medGndT1bullet.hitEffect = Fx.none;
//medGndT1bullet.hitSound = loadSound("strikeZap");
const medGndT1weapon = extend(Weapon, {
	name: "diamond-ore-spriite-beam",
	reload: 1,
	cooldownTime: 18,
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: 0,
	y: 0,
	shootY: 4,
	shootCone: 2,
	rotateSpeed: 360,
	rotate: true,
	continuous: true,
	mirror: false,
	soundPitchMin: 0.67,
	soundPitchMax: 1.83,
	top: false,
	shootSound: loadSound("medBeam1"),
	bullet: medGndT1bullet
});

const medGndT1 = extendContent(UnitType, "spriite", {
});
medGndT1.constructor = () => extend(LegsUnit, {
});
register(medGndT1);
medGndT1.weapons.add(medGndT1weapon);
medGndT1.defaultController = medGndHealerAI;
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
const cryogemItem = Vars.content.getByName(ContentType.item, "diamond-ore-cryogem");
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(medGndT1, 60 * 40, ItemStack.with(Items.silicon, 5, Items.sand, 20, Items.phaseFabric, 1, Items.copper, 10, cryogemItem, 10, diamondItem, 5)));

const medGndT2bulletTrail = Effect(8, e => {	
    const dergtx = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#99ff00"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id + Mathf.angle(x, y)));
		Fill.circle(e.x + x, e.y + y, e.fout() * (3 - Mathf.randomSeed(e.id + Mathf.angle(x, y) + 1)));
    }}) 
    Angles.randLenVectors(e.id, 6, 1 + 3.75 * e.fout(), e.rotation + (Mathf.randomSeed(e.id, -90, 90) * e.finpow()), 360,dergtx);
});

const medGndT2bullet = extend(BulletType, {
    init(b){
		if (b != undefined) {
			this.super$init(b);
			var px = b.x + b.lifetime * b.vel.x;
			var py = b.y + b.lifetime * b.vel.y;
			var rot = b.rotation();
			var healFound = false;
			b.time = b.lifetime;

			b.vel.setZero();
			//b.set(px, py);
			var healTar = Units.closestOverlap(b.team, px, py, 1, boolf(unit => {
				if(unit.healthf() < 1 && unit != b.owner && !unit.dead && !healFound){
					unit.health += Math.abs(b.damage / 60);
					unit.clampHealth();
					if (unit.healthf() == 1){
						Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
					}
					healFound = true;
					return unit;
				}
			}));
			if(healFound){
				Geometry.iterateLine(0, b.x, b.y, healTar.x, healTar.y, 3, (x, y) => {
				medGndT1bulletTrail.at(x, y, rot);
				});
			}
			b.remove();
		}
    },
	
});
medGndT2bullet.damage = -110;
medGndT2bullet.scaleVelocity = true;
medGndT2bullet.lifetime = 1;
medGndT2bullet.collides = false;
medGndT2bullet.keepVelocity = false;
medGndT2bullet.backMove = false;
medGndT2bullet.speed = 144;
medGndT2bullet.trailEffect = medGndT2bulletTrail;
medGndT2bullet.despawnEffect = Fx.none;
medGndT2bullet.tileDamageMultiplier = 0.6;
medGndT2bullet.smokeEffect = Fx.none;
medGndT2bullet.shootEffect = Fx.none;
medGndT2bullet.hitEffect = Fx.none;
//medGndT2bullet.hitSound = loadSound("strikeZap");
medGndT2bullet.status = StatusEffects.shocked;
medGndT2bullet.statusDuration = 30;
const medGndT2weapon = extend(Weapon, {
	name: "diamond-ore-gnome-beam",
	reload: 1,
	cooldownTime: 18,
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: 0,
	y: 0,
	shootCone: 2,
	shootY: 4,
	rotateSpeed: 360,
	rotate: true,
	continuous: true,
	mirror: false,
	soundPitchMin: 0.67,
	soundPitchMax: 1.83,
	top: false,
	shootSound: loadSound("medBeam2"),
	bullet: medGndT2bullet
});

const medGndT2 = extendContent(UnitType, "gnome", {
});
medGndT2.constructor = () => extend(LegsUnit, {
});
//register(medGndT2);
medGndT2.weapons.add(medGndT2weapon);
medGndT2.abilities.add(new StatusFieldAbility(StatusEffects.shielded, 6, 6, 23));
medGndT2.defaultController = medGndHealerAI;

var upgradeA = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-spriite"), Vars.content.getByName(ContentType.unit, "diamond-ore-gnome")]);
Blocks.additiveReconstructor.upgrades.add(upgradeA.toArray(UnitType));

const medGndT3 = extendContent(UnitType, "pixie", {
});
medGndT3.constructor = () => extend(LegsUnit, {});
//register(medGndT3);
//medGndT3.abilities.add(new ShieldRegenFieldAbility(30, 600, 60 * 12, 88));
//medGndT3.defaultController = medGndAI;
const pixieBoltTrail = Effect(15, e => {
	Draw.color(Color.valueOf("#99ff00"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id));
    const dergtx = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }}) 
    Angles.randLenVectors(e.id, 3, 1 + 2.5 * e.fout(), e.rotation + (Mathf.randomSeed(e.id, -90, 90) * e.finpow()), 360,dergtx);
});

const pixieBolt = extend(BasicBulletType, {
    update(b){
        this.super$update(b);
        Units.nearby(b.team, b.x, b.y, 8, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += (1.0 + 7.0 * (1 - (unit.dst(b) / 8)));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
    },
	
});
pixieBolt.lifetime = 50;
pixieBolt.damage = 30;
pixieBolt.tileDamageMultiplier = 0.5;
pixieBolt.width = 8;
pixieBolt.height = 8;
pixieBolt.lightRadius = 8;
pixieBolt.lightOpacity = 1.15;
pixieBolt.shrinkY = 0;
pixieBolt.shrinkX = 0;
pixieBolt.despawnEffect = Fx.heal;
pixieBolt.hitEffect = Fx.smeltsmoke;
pixieBolt.trailEffect = pixieBoltTrail;
pixieBolt.shootEffect = Fx.shootHeal;
pixieBolt.speed = 4;
pixieBolt.trailChance = 1;
pixieBolt.frontColor = Color.valueOf("#EDF3A9");
pixieBolt.hitColor = Color.valueOf("#99dd55");
pixieBolt.backColor = Color.valueOf("#aaee77");
pixieBolt.lightColor = Color.valueOf("#aaff77");
pixieBolt.pierce = true;
pixieBolt.pierceBuilding = true;
//pixieBolt.hittable = false;
pixieBolt.reflectable = false;
//pixieBolt.absorbable = false;
pixieBolt.sprite = "diamond-ore-diamondbullet";
//pixieBolt.hitSound = loadSound("tempestShockBullet");
const medGndT3weaponA = extend(Weapon, {
	name: "diamond-ore-pixie-bolt",
	reload: 27,
	cooldownTime: 18,
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: 6,
	y: 6,
	shootCone: 2,
	rotateSpeed: 8,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: loadSound("blasterShot"),
	bullet: pixieBolt
});
const medGndT3weaponB = extend(Weapon, {
	name: "diamond-ore-pixie-bolt",
	reload: 27,
	cooldownTime: 18,
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: -6,
	y: -6,
	shootCone: 2,
	rotateSpeed: 8,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: loadSound("blasterShot"),
	bullet: pixieBolt
});
medGndT3.weapons.add(
medGndT3weaponA,
medGndT3weaponB
);
var upgradeB = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-gnome"), Vars.content.getByName(ContentType.unit, "diamond-ore-pixie")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgradeB.toArray(UnitType));

const medGndT4 = extendContent(UnitType, "nymph", {
});
medGndT4.constructor = () => extend(LegsUnit, {});
//register(medGndT4);
medGndT4.abilities.add(new ShieldRegenFieldAbility(50, 1000, 60 * 13, 44));
//medGndT4.defaultController = medGndAI;
const nymphShellTrail = Effect(25, e => {
	Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id));
    const dergtx = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }}) 
    Angles.randLenVectors(e.id, 4, 3 + 4.5 * e.fout(), e.rotation + (Mathf.randomSeed(e.id, -90, 90) * e.finpow()), 360,dergtx);
});
const nymphShellExplosion = Effect(25, e => {
	Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id));
    Lines.stroke(e.fout() * 1.5);
	Lines.circle(e.x, e.y, e.fin() * 42);
    const dergtx = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id + Mathf.angle(x, y)));
		Fill.circle(e.x + x, e.y + y, e.fout() * 9);
    }}) 
    Angles.randLenVectors(e.id, 12, 10 + 30 * e.finpow(), e.rotation, 360, dergtx);
    const sxbtsch = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id + Mathf.angle(x, y) + 1));
		Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id + 1, 6, 24 + 24 * e.fin(), e.rotation, 360, sxbtsch);
});

const nymphShell = extend(ArtilleryBulletType, {
    despawned(b){
        Units.nearby(b.team, b.x, b.y, 60, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += Math.max(5.0,(125.0 * (1 - (unit.dst(b) / (unit.isFlying() ? 60 : 30)))));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
        this.super$despawned(b);
    },
	
});
nymphShell.lifetime = 74;
nymphShell.damage = 30;
nymphShell.splashDamage = 225;
nymphShell.splashDamageRadius = 60;
nymphShell.tileDamageMultiplier = 0.5;
nymphShell.width = 16;
nymphShell.height = 16;
nymphShell.lightRadius = 17;
nymphShell.lightOpacity = 1.15;
nymphShell.shrinkY = 0;
nymphShell.shrinkX = 0.5;
nymphShell.despawnEffect = Fx.shockwave;
nymphShell.hitEffect = nymphShellExplosion;
nymphShell.hitSound = Sounds.plasmaboom;
nymphShell.trailEffect = nymphShellTrail;
nymphShell.speed = 5;
//nymphShell.collidesAir = true;
nymphShell.collides = true;
nymphShell.reflectable = true;
nymphShell.trailChance = 1;
nymphShell.frontColor = Color.valueOf("#EDF3A9");
nymphShell.hitColor = Color.valueOf("#66dd88");
nymphShell.backColor = Color.valueOf("#44ee77");
nymphShell.lightColor = Color.valueOf("#aaff77");
nymphShell.sprite = "diamond-ore-diamondbomb";
const medGndT4weaponA = extend(Weapon, {
	name: "diamond-ore-nymph-cannon",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: 11,
	y: 11,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: true,
	shootSound: Sounds.boom,
	bullet: nymphShell
});
const medGndT4weaponB = extend(Weapon, {
	name: "diamond-ore-nymph-cannon",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: -11,
	y: -11,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: true,
	shootSound: Sounds.boom,
	bullet: nymphShell
});
medGndT4.weapons.add(medGndT4weaponA, medGndT4weaponB);


var upgradeC = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-pixie"), Vars.content.getByName(ContentType.unit, "diamond-ore-nymph")]);
Blocks.exponentialReconstructor.upgrades.add(upgradeC.toArray(UnitType));

const medGndT5 = extendContent(UnitType, "goblin", {
});
medGndT5.constructor = () => extend(LegsUnit, {});
//register(medGndT5);
//medGndT5.defaultController = medGndAI;
medGndT5.targetFlag = BlockFlag.core;

const goblinTorpedoFrag = extend(BasicBulletType, {
    update(b){
        this.super$update(b);
        Units.nearby(b.team, b.x, b.y, 4, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += (0.1 + 2.0 * (1 - (unit.dst(b) / 4)));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
    },
	
});
goblinTorpedoFrag.lifetime = 80;
goblinTorpedoFrag.damage = 12;
goblinTorpedoFrag.tileDamageMultiplier = 0.5;
goblinTorpedoFrag.width = 4;
goblinTorpedoFrag.height = 4;
goblinTorpedoFrag.lightRadius = 4;
goblinTorpedoFrag.lightOpacity = 1.15;
goblinTorpedoFrag.shrinkY = 0;
goblinTorpedoFrag.shrinkX = 0;
goblinTorpedoFrag.despawnEffect = Fx.pointHit;
goblinTorpedoFrag.hitEffect = Fx.smeltsmoke;
goblinTorpedoFrag.shootEffect = Fx.shootHeal;
goblinTorpedoFrag.speed = 1.2;
goblinTorpedoFrag.drag = 0.01;
goblinTorpedoFrag.frontColor = Color.valueOf("#EDF3A9");
goblinTorpedoFrag.hitColor = Color.valueOf("#EDF3A9");
goblinTorpedoFrag.backColor = Color.valueOf("#aaee77");
goblinTorpedoFrag.lightColor = Color.valueOf("#aaff77");
goblinTorpedoFrag.pierce = true;
goblinTorpedoFrag.pierceBuilding = true;
//goblinTorpedoFrag.hittable = false;
goblinTorpedoFrag.reflectable = false;
//goblinTorpedoFrag.absorbable = false;
goblinTorpedoFrag.sprite = "diamond-ore-diamondbullet";
const goblinTorpedoExplosion = Effect(20, e => {
	Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#9CB664"), Mathf.randomSeed(e.id));
    Lines.stroke(e.fout() * 2.75);
	Lines.circle(e.x, e.y, e.fin() * 24);
    Lines.stroke(e.fout() * 1.25);
	Lines.circle(e.x, e.y, 12 + e.fin() * 18);
    const dergtx = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#9CB664"), Mathf.randomSeed(e.id + Mathf.angle(x, y)));
		Fill.circle(e.x + x, e.y + y, e.fout() * 4.5);
    }}) 
    Angles.randLenVectors(e.id, 12, 5 + 15 * e.finpow(), e.rotation, 360, dergtx);
    const sxbtsch = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#9CB664"), Mathf.randomSeed(e.id + Mathf.angle(x, y) + 1));
		Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
    }}) 
    Angles.randLenVectors(e.id + 1, 6, 12 + 12 * e.fin(), e.rotation, 360, sxbtsch);
});
const goblinTorpedo = extend(BasicBulletType, {
    despawned(b){
        Units.nearby(b.team, b.x, b.y, 30, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += Math.max(5.0,(65.0 * (1 - (unit.dst(b) / 30))));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
        this.super$despawned(b);
    },
	
});
goblinTorpedo.lifetime = 55;
goblinTorpedo.damage = 20;
goblinTorpedo.splashDamage = 30;
goblinTorpedo.splashDamageRadius = 25;
goblinTorpedo.tileDamageMultiplier = 0.5;
goblinTorpedo.width = 16;
goblinTorpedo.height = 16;
goblinTorpedo.lightRadius = 17;
goblinTorpedo.lightOpacity = 1.15;
goblinTorpedo.shrinkY = 0;
goblinTorpedo.shrinkX = 0.5;
goblinTorpedo.despawnEffect = Fx.shockwave;
goblinTorpedo.hitEffect = goblinTorpedoExplosion;
goblinTorpedo.hitSound = Sounds.explosion;
goblinTorpedo.trailEffect = Fx.mine;
goblinTorpedo.speed = 6.7;
goblinTorpedo.fragBullets = 8;
goblinTorpedo.fragBullet = goblinTorpedoFrag;
goblinTorpedo.fragLifeMin = 0.2;
goblinTorpedo.fragVelocityMin = 1 / 7;
goblinTorpedo.fragVelocityMax = 11 / 6;
//goblinTorpedo.collidesAir = true;
goblinTorpedo.collides = true;
goblinTorpedo.reflectable = true;
goblinTorpedo.trailChance = 1;
goblinTorpedo.frontColor = Color.valueOf("#EDF3A9");
goblinTorpedo.trailColor = Color.valueOf("#EDF3A9");
goblinTorpedo.hitColor = Color.valueOf("#66dd88");
goblinTorpedo.backColor = Color.valueOf("#44ee77");
goblinTorpedo.lightColor = Color.valueOf("#aaff77");
goblinTorpedo.sprite = "diamond-ore-diamondbomb";
const medGndT5weaponA = extend(Weapon, {
	name: "diamond-ore-goblin-launcher",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	shootY: 5,
	inaccuracy: 0,
	recoil: 0,
	x: 16,
	y: 16,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: Sounds.railgun,
	bullet: goblinTorpedo
});
const medGndT5weaponB = extend(Weapon, {
	name: "diamond-ore-goblin-launcher",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	shootY: 5,
	inaccuracy: 0,
	recoil: 0,
	x: -16,
	y: -16,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: Sounds.railgun,
	bullet: goblinTorpedo
});
const medGndT5weaponC = extend(Weapon, {
	name: "diamond-ore-goblin-launcher",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	shootY: 5,
	inaccuracy: 0,
	recoil: 0,
	x: 22,
	y: 0,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: Sounds.railgun,
	bullet: goblinTorpedo
});
const medGndT5weaponD = extend(Weapon, {
	name: "diamond-ore-goblin-launcher",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	shootY: 5,
	inaccuracy: 0,
	recoil: 0,
	x: -22,
	y: 0,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: false,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: Sounds.railgun,
	bullet: goblinTorpedo
});
const medGndT5weaponE = extend(Weapon, {
	name: "diamond-ore-goblin-launcher",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	shootY: 5,
	inaccuracy: 0,
	recoil: 0,
	x: 0,
	y: 22,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: Sounds.railgun,
	bullet: goblinTorpedo
});
const medGndT5weaponF = extend(Weapon, {
	name: "diamond-ore-goblin-launcher",
	reload: 72,
	cooldownTime: 18,
	shots: 1,
	shootY: 5,
	inaccuracy: 0,
	recoil: 0,
	x: 0,
	y: -22,
	shootCone: 2,
	rotateSpeed: 4,
	rotate: true,
	mirror: false,
	soundPitchMin: 0.67,
	soundPitchMax: 0.83,
	top: false,
	shootSound: Sounds.railgun,
	bullet: goblinTorpedo
});
const goblinBombHealExplosion = Effect(30, e => {
	Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#9CB664"), Mathf.randomSeed(e.id));
    Lines.stroke(e.fout() * 2.75);
	Lines.circle(e.x, e.y, e.fin() * 136);
    Lines.stroke(e.fout() * 1.25);
	Lines.circle(e.x, e.y, 24 + e.fin() * 160);
    const dergtx = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#9CB664"), Mathf.randomSeed(e.id + Mathf.angle(x, y)));
		Fill.circle(e.x + x, e.y + y, e.fout() * 4.5);
    }}) 
    Angles.randLenVectors(e.id, 36, 16 + 120 * e.finpow(), e.rotation, 360, dergtx);
    const sxbtsch = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#9CB664"), Mathf.randomSeed(e.id + Mathf.angle(x, y) + 1));
		Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
    }}) 
    Angles.randLenVectors(e.id + 1, 18, 32 + 128 * e.fin(), e.rotation, 360, sxbtsch);
});
const goblinBombHeal = extend(BasicBulletType, {
    update(b){
        this.super$update(b);
        Units.nearby(b.team, b.x, b.y, 45, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += (2.5 + 7.5 * (1 - (unit.dst(b) / (unit.isFlying() ? 45 : 22.5))));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
    },
    despawned(b){
        Units.nearby(b.team, b.x, b.y, 144, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += Math.max(5.0,(600.0 * (1 - (unit.dst(b) / (unit.isFlying() ? 144 : 72)))));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
        this.super$despawned(b);
    }
	
});
goblinBombHeal.lifetime = 60;
goblinBombHeal.damage = 12;
goblinBombHeal.tileDamageMultiplier = 0.5;
goblinBombHeal.width = 12;
goblinBombHeal.height = 12;
goblinBombHeal.lightRadius = 30;
goblinBombHeal.lightOpacity = 1.15;
goblinBombHeal.shrinkY = -1;
goblinBombHeal.shrinkX = -1;
goblinBombHeal.despawnEffect = Fx.healWave;
goblinBombHeal.hitEffect = goblinBombHealExplosion;
goblinBombHeal.speed = 0;
goblinBombHeal.drag = 0.01;
goblinBombHeal.frontColor = Color.valueOf("#EDF3A9");
goblinBombHeal.hitColor = Color.valueOf("#EDF3A9");
goblinBombHeal.backColor = Color.valueOf("#aaee77");
goblinBombHeal.lightColor = Color.valueOf("#aaff77");
goblinBombHeal.collides = false;
goblinBombHeal.collidesAir = false;
goblinBombHeal.keepVelocity = false;
goblinBombHeal.hittable = false;
goblinBombHeal.reflectable = false;
goblinBombHeal.absorbable = false;
goblinBombHeal.hitSound = loadSound("goblinHealBombBoom");
goblinBombHeal.sprite = "diamond-ore-diamondshell";
goblinBombHeal.splashDamage = 300;
goblinBombHeal.splashDamageRadius = 144;
const goblinBombExplosion = Effect(18, e => {
	Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id));
    Lines.stroke(e.fout() * 2);
	Lines.circle(e.x, e.y, e.fin() * 70);
	Lines.circle(e.x, e.y, e.fin() * 105);
	Lines.circle(e.x, e.y, e.fin() * 140);
	Lines.circle(e.x, e.y, e.fin() * 175);
    const dergtx = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id + Mathf.angle(x, y)));
		Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.randomSeed(e.id + Mathf.angle(x, y), 15, 30));
    }}) 
    Angles.randLenVectors(e.id, 18, 40 + 40 * e.finpow(), e.rotation, 360, dergtx);
    const sxbtsch = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id + Mathf.angle(x, y) + 1));
		Fill.circle(e.x + x, e.y + y, e.fout() * 9);
    }}) 
    Angles.randLenVectors(e.id + 1, 27, 72 + 72 * e.fin(), e.rotation, 360, sxbtsch);
});
const goblinBombTrail = Effect(45, e => {
	Draw.color(Color.valueOf("#CBD97F"), Color.valueOf("#EDF3A9"), Mathf.randomSeed(e.id));
    const dergtx = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.randomSeed(e.id, 1, 4));
    }}) 
    Angles.randLenVectors(e.id, 6, Mathf.randomSeed(e.id, 5, 9) * e.fout(), e.rotation + (Mathf.randomSeed(e.id, -90, 90) * e.finpow()), 360,dergtx);
});
const goblinBomb = extend(ArtilleryBulletType, {
    update(b){
		var airSlope = 0.5 - Math.abs(b.fin() - 0.5);
		var groundSlope = Math.abs(b.fin() - 0.5);
        Units.nearby(b.team, b.x, b.y, 15, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += ((unit.isFlying() ? airSlope : groundSlope) * Math.max(0, (8.75 * (1 - (unit.dst(b) / 15)))));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
        this.super$update(b);
    },
    despawned(b){
        Units.nearby(b.team, b.x, b.y, 64, cons(unit => {
			if(unit.healthf() < 1 && unit != b.owner && !unit.dead){
				unit.health += Math.max(5.0,(90.0 * (1 - (unit.dst(b) / (unit.isFlying() ? 64 : 32)))));
				unit.clampHealth();
				if (unit.healthf() == 1){
					Fx.healWaveDynamic.at(unit.x, unit.y, unit.hitSize);
				}
			}
		}));
		goblinBombHeal.create(b.owner, b.team, b.x, b.y, 0, 1, 1);
        this.super$despawned(b);
    }
	
});
goblinBomb.lifetime = 200;
goblinBomb.damage = 300;
goblinBomb.splashDamage = 250;
goblinBomb.splashDamageRadius = 200;
goblinBomb.tileDamageMultiplier = 0.5;
goblinBomb.width = 20;
goblinBomb.height = 20;
goblinBomb.lightRadius = 17;
goblinBomb.lightOpacity = 1.15;
goblinBomb.shrinkY = 0;
goblinBomb.shrinkX = 0.75;
goblinBomb.despawnEffect = Fx.greenBomb;
goblinBomb.hitEffect = goblinBombExplosion;
goblinBomb.hitSound = loadSound("goblinPlasmaBoom");
goblinBomb.trailEffect = goblinBombTrail;
goblinBomb.shootEffect = Fx.healWave;
goblinBomb.smokeEffect = Fx.nuclearsmoke;
goblinBomb.speed = 3;
//goblinBomb.collidesAir = true;
goblinBomb.reflectable = false;
goblinBomb.trailChance = 1;
goblinBomb.frontColor = Color.valueOf("#EDF3A9");
goblinBomb.hitColor = Color.valueOf("#66dd88");
goblinBomb.backColor = Color.valueOf("#44ee77");
goblinBomb.lightColor = Color.valueOf("#aaff77");
goblinBomb.sprite = "diamond-ore-diamondbullet";

const medGndT5weaponG = extend(Weapon, {
	name: "diamond-ore-goblin-bomb",
	reload: 275,
	cooldownTime: 275,
	heatColor: Color.valueOf("#EDF3A9"),
	shots: 1,
	inaccuracy: 0,
	recoil: 0,
	x: 0,
	y: 0,
	shootY: 0,
	shootCone: 1,
	rotateSpeed: 3,
	ignoreRotation: true,
	rotate: true,
	mirror: false,
	soundPitchMin: 0.57,
	soundPitchMax: 0.63,
	top: true,
	shootSound: Sounds.explosionbig,
	bullet: goblinBomb
});
//medGndT5weaponG,

medGndT5.weapons.add(medGndT5weaponG);
medGndT5.weapons.add(medGndT5weaponA);
medGndT5.weapons.add(medGndT5weaponB);
medGndT5.weapons.add(medGndT5weaponC);
medGndT5.weapons.add(medGndT5weaponD);
medGndT5.weapons.add(medGndT5weaponE);
medGndT5.weapons.add(medGndT5weaponF);


var upgradeD = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-nymph"), Vars.content.getByName(ContentType.unit, "diamond-ore-goblin")]);
Blocks.tetrativeReconstructor.upgrades.add(upgradeD.toArray(UnitType));