//Don't ask where I stol-copied this code from.
/* "shkAir" Unit path
*/
//const register = require("diamond-ore/units/unitReg");
const shkAirAI = prov(() => {
  var u = extend(FlyingAI, {
    updateMovement(){
    }
  });
  
  return u;
});
const shkAirT1 = extendContent(UnitType, "strike", {
});
shkAirT1.constructor = () => extend(UnitEntity, {
});
//register(shkAirT1);
const shkBoltTrail = Effect(15, e => {
	Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), e.fin());
	Drawf.tri(e.x, e.y, 7 * e.fout(), 10 + 15 * (1 - e.finpow()), e.rotation);
	Drawf.tri(e.x, e.y, 7 * e.fout(), 10 + 15 * (1 - e.finpow()), e.rotation + 180);
    Lines.stroke(e.fout() * 2);
    const de = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 6);
    }}) 
    Angles.randLenVectors(e.id, 2, 7 * e.fout(), e.rotation, 30 * e.fout(),de);
});
const shkBoltDesp = Effect(20, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
	Fill.circle(e.x, e.y, e.fout() * 6);
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.finpow() * 15);
});
const shkBoltHit = Effect(15, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const ctdf = new Floatc2({get(x, y){
		Drawf.tri(e.x + x, e.y + y, 3 * e.fout(), 15 * e.fout(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 3 * e.fout(), 3 * e.fout(), Mathf.angle(x, y) + 180);
    }}) 
    Angles.randLenVectors(e.id, 3, 28 * e.fin(), e.rotation, 30, ctdf);
    const vyum = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }}) 
    Angles.randLenVectors(e.id + 1, 4, 28 * e.fin(), e.rotation, 30, vyum);
});
const shkBoltShoot = Effect(15, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
	Fill.circle(e.x, e.y, e.fout() * (8 - Math.abs(8 - (e.fin() * 16))));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.finpow() * 7);
    const ctdf = new Floatc2({get(x, y){
		Drawf.tri(e.x + x, e.y + y, 3 * e.fout(), 15 * e.fout(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 3 * e.fout(), 3 * e.fout(), Mathf.angle(x, y) + 180);
    }}) 
    Angles.randLenVectors(e.id, 3, 28 * e.fin(), e.rotation, 60, ctdf);
    const vyum = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }}) 
    Angles.randLenVectors(e.id + 1, 4, 28 * e.fin(), e.rotation + 180, 60 * e.fout(), vyum);
});
const shkStrikeBolt = extend(PointBulletType, {});
shkStrikeBolt.damage = 25;
shkStrikeBolt.speed = 240;
shkStrikeBolt.lifetime = 1;
shkStrikeBolt.trailSpacing = 10;
shkStrikeBolt.trailEffect = shkBoltTrail;
shkStrikeBolt.tileDamageMultiplier = 0.6;
shkStrikeBolt.smokeEffect = Fx.hitFuse;
shkStrikeBolt.shootEffect = shkBoltShoot;
shkStrikeBolt.hitEffect = shkBoltHit;
shkStrikeBolt.hitSound = loadSound("strikeZap");
shkStrikeBolt.despawnEffect = shkBoltDesp;
shkStrikeBolt.status = StatusEffects.shocked;
shkStrikeBolt.statusDuration = 30;

const shkAirT1weapon = extend(Weapon, "strike-bolt", {});
shkAirT1weapon.name = "strike-bolt";
shkAirT1weapon.reload = 45;
shkAirT1weapon.shots = 1;
shkAirT1weapon.inaccuracy = 0;
shkAirT1weapon.x = 0;
shkAirT1weapon.y = 7;
shkAirT1weapon.shootCone = 30;
shkAirT1weapon.rotate = false;
shkAirT1weapon.mirror = false;
shkAirT1weapon.soundPitchMin = 0.7;
shkAirT1weapon.soundPitchMax = 1.3;
shkAirT1weapon.top = true;
shkAirT1weapon.shootSound = loadSound("strikeZap");
shkAirT1weapon.bullet = shkStrikeBolt;

shkAirT1.weapons.add(shkAirT1weapon);
shkAirT1.ammoType = AmmoTypes.powerHigh;

const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
const cryogemItem = Vars.content.getByName(ContentType.item, "diamond-ore-cryogem");
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(shkAirT1, 60 * 20, ItemStack.with(Items.silicon, 40, Items.surgeAlloy, 15, cryogemItem, 15, diamondItem, 15)));

const shkAirT2 = extendContent(UnitType, "storm", {
});
shkAirT2.constructor = () => extend(UnitEntity, {});
shkAirT2.ammoType = AmmoTypes.powerHigh;

var upgradeA = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-strike"), Vars.content.getByName(ContentType.unit, "diamond-ore-storm")]);
Blocks.additiveReconstructor.upgrades.add(upgradeA.toArray(UnitType));

const shkAirT3 = extendContent(UnitType, "tempest", {
});
shkAirT3.constructor = () => extend(UnitEntity, {});
shkAirT3.ammoType = AmmoTypes.powerHigh;

var upgradeB = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-storm"), Vars.content.getByName(ContentType.unit, "diamond-ore-tempest")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgradeB.toArray(UnitType));

const shkAirT4 = extendContent(UnitType, "hurricane", {
});
shkAirT4.constructor = () => extend(UnitEntity, {});
shkAirT4.ammoType = AmmoTypes.powerHigh;
const shkBoltTrailBig = Effect(15, e => {
	Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), e.fin());
	Drawf.tri(e.x, e.y, 9 * e.fout(), 15 + 20 * (1 - e.finpow()), e.rotation);
	Drawf.tri(e.x, e.y, 9 * e.fout(), 15 + 20 * (1 - e.finpow()), e.rotation + 180);
    Lines.stroke(e.fout() * 2.5);
    const de = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 8);
    }}) 
    Angles.randLenVectors(e.id, 2, 9 * e.fout(), e.rotation, 45 * e.fout(),de);
});
const shkBoltDespBig = Effect(20, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
	Fill.circle(e.x, e.y, e.fout() * 11);
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.finpow() * 22);
});
const shkBoltHitBig = Effect(15, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
    const ctdf = new Floatc2({get(x, y){
		Drawf.tri(e.x + x, e.y + y, 5 * e.fout(), 22 * e.fout(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 5 * e.fout(), 8 * e.fout(), Mathf.angle(x, y) + 180);
    }}) 
    Angles.randLenVectors(e.id, 6, 28 * e.fin(), e.rotation, 30, ctdf);
    const vyum = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 4);
    }}) 
    Angles.randLenVectors(e.id + 1, 5, 28 * e.fin(), e.rotation, 30, vyum);
});
const hurricanePlasmaHit = Effect(20, e => {
    const ctdf = new Floatc2({get(x, y){
		Drawf.tri(e.x + x, e.y + y, 5 * e.fout(), 22 * e.fout(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 5 * e.fout(), 8 * e.fout(), Mathf.angle(x, y) + 180);
    }}) 
    Angles.randLenVectors(e.id, 14, 80 * e.fin(), e.rotation, 30, ctdf);
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#ffff00"), e.fin());
	Fill.circle(e.x, e.y, e.fout() * 23);
    Lines.stroke(e.fout() * 5);
    Lines.circle(e.x, e.y, e.finpow() * 44);
});

const hurricanePlasmaFragment = extend(BasicBulletType, {});
hurricanePlasmaFragment.lifetime = 30;
hurricanePlasmaFragment.damage = 25;
hurricanePlasmaFragment.width = 9;
hurricanePlasmaFragment.height = 9;
hurricanePlasmaFragment.lightRadius = 12;
hurricanePlasmaFragment.shrinkY = 1;
hurricanePlasmaFragment.shrinkX = 1;
hurricanePlasmaFragment.despawnEffect = Fx.none;
hurricanePlasmaFragment.hitEffect = Fx.hitFuse;
hurricanePlasmaFragment.frontColor = Color.valueOf("#edff77");
hurricanePlasmaFragment.lightColor = Color.valueOf("#ffff77");
hurricanePlasmaFragment.backColor = Color.valueOf("#ffffff");
hurricanePlasmaFragment.pierce = true;
hurricanePlasmaFragment.pierceBuilding = true;
hurricanePlasmaFragment.hittable = false;
hurricanePlasmaFragment.reflectable = false;
hurricanePlasmaFragment.status = StatusEffects.shocked;
hurricanePlasmaFragment.statusDuration = 45;
hurricanePlasmaFragment.sprite = "diamond-ore-diamondbullet";
hurricanePlasmaFragment.hitSound = Sounds.none;

const hurricanePlasma = extend(BasicBulletType, {});
hurricanePlasma.lifetime = 40;
hurricanePlasma.damage = 120;
hurricanePlasma.width = 23;
hurricanePlasma.height = 23;
hurricanePlasma.lightRadius = 200;
hurricanePlasma.spin = 15;
hurricanePlasma.shrinkY = 0;
hurricanePlasma.shrinkX = 0;
hurricanePlasma.despawnEffect = Fx.instBomb;
hurricanePlasma.hitEffect = hurricanePlasmaHit;
hurricanePlasma.trailEffect = Fx.mineBig;
hurricanePlasma.fragBullet = hurricanePlasmaFragment;
hurricanePlasma.lightningLength = 5;
hurricanePlasma.speed = 8;
hurricanePlasma.recoil = 0.3;
hurricanePlasma.lightningLengthRand = 10;
hurricanePlasma.lightningLength = 5;
hurricanePlasma.lightning = 10;
hurricanePlasma.lightningDamage = 60;
hurricanePlasma.fragBullets = 65;
hurricanePlasma.fragVelocityMin = 0.4;
hurricanePlasma.fragVelocityMax = 5;
hurricanePlasma.fragLifeMin = 0;
hurricanePlasma.fragLifeMax = 1.375;
hurricanePlasma.splashDamage = 130;
hurricanePlasma.splashDamageRadius = 50;
hurricanePlasma.frontColor = Color.valueOf("#ffffff");
hurricanePlasma.backColor = Color.valueOf("#ffff77");
hurricanePlasma.trailColor = Color.valueOf("#ffff77");
hurricanePlasma.pierce = false;
hurricanePlasma.pierceBuilding = false;
hurricanePlasma.hittable = false;
hurricanePlasma.reflectable = false;
hurricanePlasma.absorbable = false;
hurricanePlasma.status = StatusEffects.shocked;
hurricanePlasma.statusDuration = 15;
hurricanePlasma.sprite = "diamond-ore-plasma-sphere";
hurricanePlasma.hitSound = loadSound("tempestShockBullet");

const shkStrikeBoltBig = extend(PointBulletType, {});
shkStrikeBoltBig.damage = 80;
shkStrikeBoltBig.speed = 400;
shkStrikeBoltBig.lifetime = 1;
shkStrikeBoltBig.trailSpacing = 15;
shkStrikeBoltBig.tileDamageMultiplier = 0.6;
shkStrikeBoltBig.smokeEffect = Fx.hitBulletBig;
shkStrikeBoltBig.trailEffect = shkBoltTrailBig;
shkStrikeBoltBig.shootEffect = Fx.hitFuse;
shkStrikeBoltBig.hitEffect = shkBoltHitBig;
shkStrikeBoltBig.hitSound = Sounds.spark;
shkStrikeBoltBig.despawnEffect = shkBoltDespBig;
shkStrikeBoltBig.status = StatusEffects.shocked;
shkStrikeBoltBig.statusDuration = 30;

const shkAirT4weaponA = extend(Weapon, {
	name: "diamond-ore-hurricane-bolt",
	reload: 55,
	shots: 1,
	inaccuracy: 0,
	x: 12,
	y: 13,
	shootCone: 0,
	rotateSpeed: 5,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.5,
	soundPitchMax: 1.03,
	top: true,
	shootSound: loadSound("strikeZapBig"),
	bullet: shkStrikeBoltBig
});
const shkAirT4weaponB = extend(Weapon, {
	name: "diamond-ore-hurricane-bolt",
	reload: 55,
	shots: 1,
	inaccuracy: 0,
	x: 7,
	y: -3,
	shootCone: 0,
	rotateSpeed: 5,
	rotate: true,
	mirror: true,
	soundPitchMin: 0.5,
	soundPitchMax: 1.03,
	top: true,
	shootSound: loadSound("strikeZapBig"),
	bullet: shkStrikeBoltBig
});


const shkAirT4plasma = extend(Weapon, "hurricane-plasma", {});
shkAirT4plasma.reload = 65;
shkAirT4plasma.shots = 1;
shkAirT4plasma.inaccuracy = 0;
shkAirT4plasma.x = 0;
shkAirT4plasma.y = 16;
shkAirT4plasma.shootY = 6;
shkAirT4plasma.shootCone = 1;
shkAirT4plasma.rotateSpeed = 11;
shkAirT4plasma.rotate = false;
shkAirT4plasma.mirror = false;
shkAirT4plasma.soundPitchMin = 0.5;
shkAirT4plasma.soundPitchMax = 1.03;
shkAirT4plasma.top = true;
shkAirT4plasma.shootSound = loadSound("strikeZapBig");
shkAirT4plasma.bullet = hurricanePlasma;

shkAirT4.weapons.add(
shkAirT4weaponA,
shkAirT4weaponB,
shkAirT4plasma
);

var upgradeC = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-tempest"), Vars.content.getByName(ContentType.unit, "diamond-ore-hurricane")]);
Blocks.exponentialReconstructor.upgrades.add(upgradeC.toArray(UnitType));

const shkAirT5 = extendContent(UnitType, "purger", {
});
shkAirT5.constructor = () => extend(UnitEntity, {});
//register(shkAirT5);
shkAirT5.targetFlag = BlockFlag.core;
shkAirT5.ammoType = AmmoTypes.powerHigh;
const purgerPlasmaTrail = Effect(28, e => {
	Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), e.fin());
    const ctdf = new Floatc2({get(x, y){
		Drawf.tri(e.x + x, e.y + y, 4 * e.fout(), 8 * e.fout(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 4 * e.fout(), 8 * e.fout(), Mathf.angle(x, y) + 90);
		Drawf.tri(e.x + x, e.y + y, 4 * e.fout(), 8 * e.fout(), Mathf.angle(x, y) + 180);
		Drawf.tri(e.x + x, e.y + y, 4 * e.fout(), 8 * e.fout(), Mathf.angle(x, y) + 270);
    }})
    Angles.randLenVectors(e.id, 6, 8 + 15 * e.finpow(), e.rotation, 360, ctdf);
    const ncrtnvyj = new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 4);
    }})
    Angles.randLenVectors(e.id + 1, 3, 12, e.rotation, 360, ncrtnvyj);
});
const purgerPlasmaExplosion = Effect(34, e => {
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#999900"), e.fin());
    Lines.stroke(e.fout() * 12);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 12);
    }}) 
    Angles.randLenVectors(e.id, 150, -20 + 120 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), Math.abs(-0.4 + e.fin() * 1.4));
    const g = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 7.4);
    }}) 
    const h = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 32);
    Angles.randLenVectors(e.id + 1, 3, -2 + 9 * e.fin(), e.rotation + Mathf.random(-180,180) * e.fin(), 360,g);
    }}) 
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#bbbb00"), e.finpow());
    Angles.randLenVectors(e.id + 2, 25, -20 + 125 * e.fin(), e.rotation, 360,h);
    Lines.stroke(e.fout() * 9);
    Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), e.finpow());
    Lines.circle(e.x, e.y, e.finpow() * 80);
});

const purgerPlasmaFragment = extend(BasicBulletType, {});
purgerPlasmaFragment.lifetime = 25;
purgerPlasmaFragment.damage = 50;
purgerPlasmaFragment.width = 15;
purgerPlasmaFragment.height = 120;
purgerPlasmaFragment.lightRadius = 200;
purgerPlasmaFragment.shrinkY = 1;
purgerPlasmaFragment.shrinkY = 1;
purgerPlasmaFragment.speed = 1.6;
purgerPlasmaFragment.despawnEffect = Fx.none;
purgerPlasmaFragment.hitEffect = Fx.hitFuse;
purgerPlasmaFragment.frontColor = Color.valueOf("#ffff77");
purgerPlasmaFragment.hitColor = Color.valueOf("#ffff77");
purgerPlasmaFragment.backColor = Color.valueOf("#ffffff");
purgerPlasmaFragment.pierce = true;
purgerPlasmaFragment.pierceBuilding = true;
purgerPlasmaFragment.hittable = false;
purgerPlasmaFragment.reflectable = false;
purgerPlasmaFragment.absorbable = false;
purgerPlasmaFragment.status = StatusEffects.shocked;
purgerPlasmaFragment.statusDuration = 300;
purgerPlasmaFragment.sprite = "diamond-ore-diamondshard";
purgerPlasmaFragment.homingPower = 0;
purgerPlasmaFragment.homingRange = 0;
purgerPlasmaFragment.hitSound = Sounds.none;

const purgerPlasma = extend(BasicBulletType, {});
purgerPlasma.lifetime = 270;
purgerPlasma.damage = 120;
purgerPlasma.width = 30;
purgerPlasma.height = 30;
purgerPlasma.lightRadius = 200;
purgerPlasma.spin = 15;
purgerPlasma.shrinkY = 0;
purgerPlasma.shrinkX = 0;
purgerPlasma.despawnEffect = Fx.instBomb;
purgerPlasma.hitEffect = purgerPlasmaExplosion;
purgerPlasma.trailEffect = purgerPlasmaTrail;
purgerPlasma.fragBullet = purgerPlasmaFragment;
purgerPlasma.lightningLength = 5;
purgerPlasma.trailChance = 1;
purgerPlasma.speed = 6;
purgerPlasma.drag = 0.002;
purgerPlasma.recoil = 2;
purgerPlasma.lightningLengthRand = 18;
purgerPlasma.lightningLength = 4;
purgerPlasma.lightning = 20;
purgerPlasma.lightningDamage = 120;
purgerPlasma.fragBullets = 65;
purgerPlasma.fragVelocityMin = 0.4;
purgerPlasma.fragVelocityMax = 5;
purgerPlasma.fragLifeMin = 0;
purgerPlasma.fragLifeMax = 1.375;
purgerPlasma.splashDamage = 500;
purgerPlasma.splashDamageRadius = 200;
purgerPlasma.frontColor = Color.valueOf("#ffff77");
purgerPlasma.backColor = Color.valueOf("#ffff77");
purgerPlasma.pierce = false;
purgerPlasma.pierceBuilding = false;
purgerPlasma.hittable = false;
purgerPlasma.reflectable = false;
purgerPlasma.absorbable = false;
purgerPlasma.status = StatusEffects.shocked;
purgerPlasma.statusDuration = 300;
purgerPlasma.sprite = "diamond-ore-plasma-sphere";
purgerPlasma.homingPower = 0.0925;
purgerPlasma.homingRange = 180;
purgerPlasma.homingDelay = 55;
purgerPlasma.hitSound = loadSound("purgerPlasmaBoom");
const purgerPlasmaCharge = Effect(64, e => {
	Draw.color(Color.valueOf("#ffff00"));
    const ctdf = new Floatc2({get(x, y){
		Drawf.tri(e.x + x, e.y + y, 4 + 8 * e.fout(), 4 * e.fin(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 4 + 8 * e.fout(), 20 * e.fin(), Mathf.angle(x, y) + 180);
    }}) 
    Angles.randLenVectors(e.id, 6, 40 * e.fout(), e.rotation, 360, ctdf);
    Angles.randLenVectors(e.id + 1, 6, 80 * e.fout(), e.rotation, 360, ctdf);
    Angles.randLenVectors(e.id + 2, 8, 120 * e.fout(), e.rotation, 360, ctdf);
	Fill.circle(e.x, e.y, e.fin() * 20);
	Draw.color(Color.valueOf("#ffff77"));
	Fill.circle(e.x, e.y, e.fin() * 18);
	Draw.color(Color.valueOf("#ffffffs"));
	Fill.circle(e.x, e.y, e.fin() * 16);
});
purgerPlasma.shootEffect = purgerPlasmaCharge;
purgerPlasma.smokeEffect = Fx.none;

const shkAirT5weapon = extend(Weapon, {
	name: "purger-plasma",
	reload: 265,
	shots: 1,
	firstShotDelay: 60,
	inaccuracy: 0,
	x: 0,
	y: 28,
	shootCone: 1,
	rotateSpeed: 11,
	rotate: false,
	mirror: false,
	soundPitchMin: 0.95,
	soundPitchMax: 1.05,
	top: true,
	shootSound: loadSound("plasmaBallShoot"),
	chargeSound: loadSound("purgerCharge"),
	shootStatus: StatusEffects.unmoving,
	shootStatusDuration: 70,
	bullet: purgerPlasma
});
//	name = "purger-plasma";
shkAirT5.weapons.add(shkAirT5weapon);
var upgradeD = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-hurricane"), Vars.content.getByName(ContentType.unit, "diamond-ore-purger")]);
Blocks.tetrativeReconstructor.upgrades.add(upgradeD.toArray(UnitType));