
const cryogemItem = Vars.content.getByName(ContentType.item, "diamond-ore-cryogem");
const diamondItem = Vars.content.getByName(ContentType.item, "diamond-ore-diamond");
const darkSporePodItem = Vars.content.getByName(ContentType.item, "diamond-ore-dark-spore-pod");
const ancientAlloyItem = Vars.content.getByName(ContentType.item, "diamond-ore-ancient-alloy");
const phaseStringLiquid = Vars.content.getByName(ContentType.liquid, "diamond-ore-phase-string");
const sporeWaterLiquid = Vars.content.getByName(ContentType.liquid, "diamond-ore-corrupt-water");
const cycloneCryoFrag = extend(BasicBulletType, {});
cycloneCryoFrag.damage = 8;
cycloneCryoFrag.width = 3;
cycloneCryoFrag.speed = 3;
cycloneCryoFrag.height = 6;
cycloneCryoFrag.lifetime = 45;
cycloneCryoFrag.drag = 0.015;
cycloneCryoFrag.pierce = true;
cycloneCryoFrag.despawnEffect = Fx.none;
cycloneCryoFrag.hitEffect = Fx.none;
cycloneCryoFrag.frontColor = Color.valueOf("#4496bb");
cycloneCryoFrag.backColor = Color.valueOf("#4499ee");
cycloneCryoFrag.sprite = "diamond-ore-diamondbullet";
cycloneCryoFrag.status = StatusEffects.freezing;
cycloneCryoFrag.statusDuration = 180;
const cycloneCryo = extend(FlakBulletType, {});
cycloneCryo.fragBullet = cycloneCryoFrag;
cycloneCryo.fragBullets = 6;
cycloneCryo.status = StatusEffects.freezing;
cycloneCryo.splashDamage = 15;
cycloneCryo.shrinkX = 0;
cycloneCryo.shrinkY = 0;
cycloneCryo.drag = 0.012;
cycloneCryo.hitEffect = Fx.flakExplosion;
cycloneCryo.frontColor = Color.valueOf("#4496bb");
cycloneCryo.hitColor = Color.valueOf("#cceeff");
cycloneCryo.backColor = Color.valueOf("#4496bb");
cycloneCryo.damage = 15;
cycloneCryo.speed = 6;
cycloneCryo.lifetime = 60;
cycloneCryo.splashDamageRadius = 16;
cycloneCryo.explodeRadius = 8;
cycloneCryo.sprite = "diamond-ore-diamondshell";
const spectreCryo = extend(BasicBulletType, {});
spectreCryo.speed = 4;
spectreCryo.lifetime = 90;
spectreCryo.status = StatusEffects.freezing;
spectreCryo.splashDamage = 70;
spectreCryo.ammoMultiplier = 4;
spectreCryo.damage = 30;
spectreCryo.splashDamageRadius = 16;
spectreCryo.despawnEffect = Fx.mineBig;
spectreCryo.hitEffect = Fx.mineHuge;
spectreCryo.shootEffect = Fx.shootLiquid;
spectreCryo.width = 12;
spectreCryo.height = 24;
spectreCryo.sprite = "diamond-ore-diamondbullet";
spectreCryo.frontColor = Color.valueOf("#cceeff");
spectreCryo.hitColor = Color.valueOf("#cceeff");
spectreCryo.backColor = Color.valueOf("#4499ee");
const swarmerCryo = extend(MissileBulletType, {});
swarmerCryo.speed = 4;
swarmerCryo.status = StatusEffects.freezing;
swarmerCryo.splashDamage = 25;
swarmerCryo.damage = 25;
swarmerCryo.splashDamageRadius = 48;
swarmerCryo.ammoMultiplier = 4;
swarmerCryo.width = 7;
swarmerCryo.height = 9;
swarmerCryo.sprite = "diamond-ore-diamondmissile";
swarmerCryo.frontColor = Color.valueOf("#49acdc");
swarmerCryo.hitColor = Color.valueOf("#cceeff");
swarmerCryo.backColor = Color.valueOf("#9cd1fb");
swarmerCryo.trailColor = Color.valueOf("#9cd1fb");
const waveString = extend(LiquidBulletType, {});
waveString.speed = 2.5;
waveString.status = StatusEffects.corroded;
waveString.lifetime = 110;
waveString.knockback = 1.09;
waveString.homingRange = 75;
waveString.homingPower = 0.2;
waveString.pierceCap = 32;
waveString.pierce = true;
waveString.liquid = phaseStringLiquid;
const waveSpore = extend(LiquidBulletType, {});
waveSpore.speed = 1.15;
waveSpore.status = StatusEffects.sapped;
waveSpore.lifetime = 140;
waveSpore.knockback = 1.25;
waveSpore.homingRange = 16;
waveSpore.homingPower = 0.01;
waveSpore.damage = 2.2;
waveSpore.liquid = sporeWaterLiquid;
const tsunString = extend(LiquidBulletType, {});
tsunString.speed = 4.5;
tsunString.status = StatusEffects.corroded;
tsunString.lifetime = 110;
tsunString.knockback = 1.09;
tsunString.homingRange = 75;
tsunString.homingPower = 0.2;
tsunString.pierceCap = 64;
tsunString.pierce = true;
tsunString.liquid = phaseStringLiquid;
const tsunSpore = extend(LiquidBulletType, {});
tsunSpore.speed = 1.5;
tsunSpore.status = StatusEffects.sapped;
tsunSpore.lifetime = 190;
tsunSpore.knockback = 1.5;
tsunSpore.homingRange = 28;
tsunSpore.homingPower = 0.02;
tsunSpore.damage = 2.2;
tsunSpore.liquid = sporeWaterLiquid;
const standardDiamond = extend(BasicBulletType, {});
standardDiamond.damage = 36;
standardDiamond.width = 8;
standardDiamond.height = 14;
standardDiamond.lifetime = 60;
standardDiamond.speed = 4.5;
standardDiamond.ammoMultiplier = 3;
standardDiamond.reloadMultiplier = 0.8;
const standardDiamondBig = extend(BasicBulletType, {});
standardDiamondBig.damage = 108;
standardDiamondBig.width = 19;
standardDiamondBig.height = 28;
standardDiamondBig.lifetime = 50;
standardDiamondBig.speed = 9.5;
standardDiamondBig.ammoMultiplier = 1;
standardDiamondBig.reloadMultiplier = 0.8;
standardDiamondBig.frontColor = Color.valueOf("#caeaea");
standardDiamondBig.pierceCap = 4;
standardDiamondBig.pierceBuilding = true;
standardDiamondBig.knockback = 0.8;
standardDiamondBig.hitEffect = Fx.hitFuse;
const standardCryo = extend(BasicBulletType, {});
standardCryo.damage = 8;
standardCryo.width = 11;
standardCryo.height = 13;
standardCryo.shrinkX = 0.35;
standardCryo.shrinkY = 0.175;
standardCryo.lifetime = 60;
standardCryo.speed = 2.9;
standardCryo.inaccuracy = 3;
standardCryo.reloadMultiplier = 0.8;
standardCryo.status = StatusEffects.freezing;
standardCryo.statusDuration = 367;
standardCryo.frontColor = Color.valueOf("#4496bb");
standardCryo.backColor = Color.valueOf("#4499ee");
standardCryo.sprite = "diamond-ore-diamondbullet";
Blocks.cyclone.ammoTypes.put(cryogemItem,cycloneCryo);
Blocks.spectre.ammoTypes.put(cryogemItem,spectreCryo);
Blocks.spectre.ammoTypes.put(diamondItem,standardDiamondBig);
Blocks.swarmer.ammoTypes.put(cryogemItem,swarmerCryo);
Blocks.wave.ammoTypes.put(phaseStringLiquid,waveString);
Blocks.wave.ammoTypes.put(sporeWaterLiquid,waveSpore);
Blocks.tsunami.ammoTypes.put(phaseStringLiquid,tsunString);
Blocks.tsunami.ammoTypes.put(sporeWaterLiquid,tsunSpore);
Blocks.duo.ammoTypes.put(diamondItem,standardDiamond);
Blocks.salvo.ammoTypes.put(diamondItem,standardDiamond);
Blocks.duo.ammoTypes.put(cryogemItem,standardCryo);
Blocks.salvo.ammoTypes.put(cryogemItem,standardCryo);
const scorchSporeFx = Effect(30, e => {
    Lines.stroke(e.fout() * 0.75);
    const d = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#b95DcA").shiftHue(Mathf.range(2)), Color.valueOf("#00aae6").shiftHue(Mathf.range(2)), Mathf.random());
		Drawf.tri(e.x + x, e.y + y, 3 * e.fout(), 8 * e.fout(), Mathf.angle(x, y));
		Drawf.tri(e.x + x, e.y + y, 3 * e.fout(), 3 * e.fout(), Mathf.angle(x, y) + 180);
    }}) 
    Angles.randLenVectors(e.id, 24, 5 + 108 * e.fin(), e.rotation, 10,d);
});
const scorchSpore = extend(BasicBulletType, {});
scorchSpore.damage = 18;
scorchSpore.width = 0;
scorchSpore.length = 0;
scorchSpore.lifetime = 18;
scorchSpore.speed = 3.35;
scorchSpore.makeFire = true;
scorchSpore.pierce = true;
scorchSpore.pierceBuilding = true;
scorchSpore.collidesAir = false;
scorchSpore.shootEffect = scorchSporeFx;
scorchSpore.smokeEffect = Fx.none;
scorchSpore.hittable = false;
scorchSpore.ammoMultiplier = 30;
scorchSpore.reloadMultiplier = 1.5;
scorchSpore.hitEffect = Fx.hitLiquid;
scorchSpore.despawnEffect = Fx.none;
scorchSpore.hitColor = Color.valueOf("#007a96");
scorchSpore.status = StatusEffects.sapped;
Blocks.scorch.ammoTypes.put(darkSporePodItem,scorchSpore);
const scorchCryoFx = Effect(20, e => {
    const dg = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#cceeff").shiftHue(Mathf.range(2)), Color.valueOf("#4499ee").shiftHue(Mathf.range(2)), Mathf.random());
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    }})
    Angles.randLenVectors(e.id, 5, 80 * e.finpow(), e.rotation, 6 + 4 * e.fout(),dg);
    const dh = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#cceeff").shiftHue(Mathf.range(2)), Color.valueOf("#4499ee").shiftHue(Mathf.range(2)), Mathf.random());
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }})
    Angles.randLenVectors(e.id + 1, 7, 75 * e.finpow(), e.rotation, 8 + 5 * e.fout(),dh);
    const di = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#cceeff").shiftHue(Mathf.range(2)), Color.valueOf("#4499ee").shiftHue(Mathf.range(2)), Mathf.random());
    Fill.circle(e.x + x, e.y + y, e.fout() * 1);
    }})
    Angles.randLenVectors(e.id + 2, 9, 70 * e.finpow(), e.rotation, 10 + 6 * e.fout(),dg);
});
const scorchCryoSmokeFx = Effect(36, e => {
    Draw.color(Color.valueOf("#cceeff"), Color.valueOf("#4499ee"), e.fin());
    Lines.stroke(e.fout() * 1.25);
    const dq = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 7 + 1);
    }}) 
    Angles.randLenVectors(e.id, 2, 80 * e.fin(), e.rotation, 7,dq);
    const dw = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id + 1, 3, 70 * e.fin(), e.rotation, 11,dw);
    const de = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 3 + 1);
    }}) 
    Angles.randLenVectors(e.id + 2, 4, 60 * e.fin(), e.rotation, 15,de);
});
const scorchCryo = extend(BasicBulletType, {});
scorchCryo.damage = 18;
scorchCryo.width = 0;
scorchCryo.length = 0;
scorchCryo.lifetime = 18;
scorchCryo.speed = 3.35;
scorchCryo.collidesAir = false;
scorchCryo.pierce = true;
scorchCryo.shootEffect = scorchCryoFx;
scorchCryo.smokeEffect = scorchCryoSmokeFx;
scorchCryo.hittable = false;
scorchCryo.ammoMultiplier = 6;
scorchCryo.hitEffect = Fx.hitLiquid;
scorchCryo.despawnEffect = Fx.none;
scorchCryo.hitColor = Color.valueOf("#cceeff");
scorchCryo.status = StatusEffects.freezing;
Blocks.scorch.ammoTypes.put(cryogemItem,scorchCryo);
const ancientInstShoot = Effect(21, e => {
    Draw.color(Color.valueOf("#DCD659"), Color.valueOf("#E3C161"), e.fin());
    Lines.stroke(e.fout() * 2);
	Drawf.tri(e.x, e.y, 44 * e.fout(), 132 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, 44 * e.fout(), 66 * e.fout(), e.rotation + 180);
    const rgh = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 4, 80 * e.fin(), e.rotation, 30 * e.finpow(),rgh);
});
const ancientInstSmoke = Effect(47, e => {
    Draw.color(Color.valueOf("#DCD659"), Color.valueOf("#E3C161"), e.fin());
    Lines.stroke(e.fout() * 4);
    const dq = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 2, 80 * e.fin(), e.rotation, 15 * e.fout(),dq);
    const dw = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 9 + 1);
    }}) 
    Angles.randLenVectors(e.id, 3, 70 * e.fin(), e.rotation, 20 * e.fout(),dw);
    const de = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 6 + 1);
    }}) 
    Angles.randLenVectors(e.id, 4, 60 * e.fin(), e.rotation, 30 * e.fout(),de);
});
const ancientInstHit = Effect(18, e => {
    Draw.color(Color.valueOf("#DCD659"), Color.valueOf("#f3f181"), e.fin());
    Lines.stroke(e.fout() * 2);
	for(var lfr = 0; lfr < 4; lfr++){
		var sdtfe = e.id + lfr;
		var xtrvy = Mathf.randomSeedRange(sdtfe, 20);
		const da = new Floatc2({get(x, y){
			Drawf.tri(e.x + x, e.y + y, 11 * e.fout(), (40 + xtrvy) * e.fout(), e.rotation);
			Drawf.tri(e.x + x, e.y + y, 11 * e.fout(), 15 * e.fout(), e.rotation + 180);
		}}) 
		Angles.randLenVectors(sdtfe, 2, 160 * e.fin(), e.rotation + Mathf.randomSeedRange(sdtfe, 3), 6 + Mathf.randomSeedRange(sdtfe, 4),da);
	}
});
const ancientInstDesp = Effect(27, e => {
	Draw.color(Color.valueOf("#E3C161"), Color.valueOf("#DCD659"), e.fin());
	Fill.circle(e.x, e.y, e.fout() * 12);
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.finpow() * 24);
});
const ancientInstTrail = Effect(15, e => {
	Draw.color(Color.valueOf("#f3f181"), Color.valueOf("#DCD659"), e.fin());
	Drawf.tri(e.x, e.y, 11 * e.fout(), 33 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, 11 * e.fout(), 33 * e.fout(), e.rotation + 180);
	Fill.circle(e.x, e.y, e.fout() * 5.5);
});
const ancientAlloyForeshadow = extend(PointBulletType, {});
ancientAlloyForeshadow.damage = 2250;
ancientAlloyForeshadow.speed = Blocks.foreshadow.range;
ancientAlloyForeshadow.trailSpacing = 10;
ancientAlloyForeshadow.lightning = 5;
ancientAlloyForeshadow.lightningLength = 8;
ancientAlloyForeshadow.lightningLengthRand = 12;
ancientAlloyForeshadow.lightningCone = 45;
ancientAlloyForeshadow.lightningDamage = 120;
ancientAlloyForeshadow.lightningColor = Color.valueOf("#FA8257");
ancientAlloyForeshadow.shootEffect = ancientInstShoot;
ancientAlloyForeshadow.smokeEffect = ancientInstSmoke;
ancientAlloyForeshadow.trailEffect = ancientInstTrail;
ancientAlloyForeshadow.ammoMultiplier = 1;
ancientAlloyForeshadow.reloadMultiplier = 0.4;
ancientAlloyForeshadow.hitSound = loadSound("ancientForeshadowHit");
ancientAlloyForeshadow.hitEffect = ancientInstHit;
ancientAlloyForeshadow.despawnEffect = ancientInstDesp;
ancientAlloyForeshadow.hitColor = Color.valueOf("#E3C161");
Blocks.foreshadow.ammoTypes.put(ancientAlloyItem,ancientAlloyForeshadow);