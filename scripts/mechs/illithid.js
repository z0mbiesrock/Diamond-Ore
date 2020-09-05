// Special mech: The Illithid. Ability cripples all nearby enemy units and outright deletes overpowerful ones.
//

const illithidBulletTrail1 = newEffect(20, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#cbd97f"), Color.valueOf("#00d8ff"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(1,4), 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 5, 11 + 10 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fin() * 3);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 3, 11 + 10 * e.fout(), e.rotation, 360,h);
});

const illithidBulletTrail2 = newEffect(30, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#cff4cc"), Color.valueOf("#00d8ff"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(1,4), 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 5, 11 + 10 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 3);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 3, 14 * e.fin(), e.rotation, 360,h);
});

const illithidBulletHitFx = newEffect(10, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#00d8ff"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(1,4), 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 5, 21 + 20 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 6);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1 + e.fout() * 13);
    }}) 
    Angles.randLenVectors(e.id, 9, 60 * e.fin(), e.rotation, 360,h);
    Lines.stroke(e.fout() * 7);
	Lines.circle(e.x, e.y, 4 + e.fin() * 50);
});

const illithidAbilityReadyFx = newEffect(20, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}	
    const d = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#344444"), Color.valueOf("#00589f"), Mathf.random());
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(1,4), 45);
    }})
    Angles.randLenVectors(e.id, 5, 80 + 10 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fin() * 3);
    const h = new Floatc2({get(x, y){
		Draw.color(Color.valueOf("#337700"), Color.valueOf("#00284f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 3, 80 + 16 * e.fout(), e.rotation, 360,h);
});

const illithidTrailFx = newEffect(107, e => {
    const d = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#224422"), Color.valueOf("#444488"), Mathf.random());
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(1,4), 45);
    }})
    Angles.randLenVectors(e.id, 3, 30 * e.fout(), e.rotation, 360,d);
});

const illithidAbilityFx = newEffect(40, e => {
    const d = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#2f4f00"), Color.valueOf("#00284f"), Mathf.random());
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(4,11), 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 45, 28 + 365 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 8);
    const h = new Floatc2({get(x, y){
	Draw.color(Color.valueOf("#555555"), Color.valueOf("#00387f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 18 + 3 + e.fout() * 13);
    }}) 
    Angles.randLenVectors(e.id, 50, 32 + 420 * e.fin(), e.rotation, 360,h);
	Draw.color(Color.valueOf("#999955"), Color.valueOf("#0068af"), Mathf.random());
    Lines.stroke(e.fout() * 15);
	Lines.circle(e.x, e.y, e.fin() * 355);
});

const illithidWitherFx = newEffect(30, e => {
	Draw.color(Color.valueOf("#111111"), Color.valueOf("#333333"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 3, Mathf.random(-3,3));
    }})
    Angles.randLenVectors(e.id, 2, 20 + 10 * e.fout(), e.rotation, 360,d);
});
const illithidBossWither = newEffect(30, e => {
	Draw.color(Color.valueOf("#111111"), Color.valueOf("#333333"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 5, Mathf.random(-1,1));
    }})
    Angles.randLenVectors(e.id, 9, 12 + 36 * e.fin(), e.rotation, 360,d);
});
const illithidWither = extendContent(StatusEffect, "illithidWitherStatus", {
	/* Too laggy
	scanTiles(unit){
		var tmpA = [];
		for(var tx = -13; tx < 13; tx++){
			for(var ty = -13; ty < 13; ty++){
				var tileC = Vars.world.ltile(Mathf.round(unit.x / Vars.tilesize) + tx, Mathf.round(unit.y / Vars.tilesize) + ty);
				if(tileC != null && tileC.ent() != null && tmpA.lastIndexOf(tileC) == -1 && tileC.getTeam() == unit.getTeam()){
					entityC = tileC.ent();
					//entityC.kill();
					if (Mathf.chance(0.05)){
						Effects.effect(illithidTileWither, tileC.drawx() + Mathf.random(-2 * tileC.size,2 * tileC.size), tileC.drawy() + Mathf.random(-2 * tileC.size,2 * tileC.size), Mathf.random(-360,360));
						if (Mathf.chance(0.5) && tileC.size > 2){
							Effects.effect(illithidTileWither, tileC.drawx() + Mathf.random(-2 * tileC.size,2 * tileC.size), tileC.drawy() + Mathf.random(-2 * tileC.size,2 * tileC.size), Mathf.random(-360,360));
							if (Mathf.chance(0.25) && tileC.size >= 5){
								Effects.effect(illithidTileWither, tileC.drawx() + Mathf.random(-2 * tileC.size,2 * tileC.size), tileC.drawy() + Mathf.random(-2 * tileC.size,2 * tileC.size), Mathf.random(-360,360));
							}
						}
					}
					//entityC.onDeath();
					entityC.damage(Mathf.random(0.66,1.66 + (0.13 * tileC.size)));
				}
			}
		}
	}, */
	
	update(unit, time){
		this.super$update(unit, time);
		try{ 
			if (unit.getTeam() == Team.derelict){
				time = 0;
			}
			if (Mathf.chance(0.05)){
				unit.velocity().add(Mathf.random(-0.66,0.66), Mathf.random(-0.66,0.66));
				unit.velocity().setAngle(Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random()));
				unit.rotation = Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random());
			}
			Units.nearby(unit.getTeam(), unit.x, unit.y, 18, cons(that => {
				if (!(that instanceof Player)){
					if (that.getType() != unit){
						that.damage(Mathf.random(0.06,0.88));
					}
				}
				else{
					that.damage(Mathf.random(0.03,0.44));
				}
			}));
			//this.scanTiles(unit);
		}
		catch(error){
			print(error);
		}
	},
});
illithidWither.speedMultiplier = 0.92;
illithidWither.armorMultiplier = 0.2;
illithidWither.damageMultiplier = 0.6;
illithidWither.damage = 0.37;
illithidWither.effect = illithidWitherFx;

var seed = Mathf.round(Mathf.random(-66666,66666));
var seedA = Mathf.round(Mathf.random(-66666,66666));
var seedB = Mathf.round(Mathf.random(-66666,66666));
var seedC = Mathf.round(Mathf.random(-66666,66666));
var seedD = Mathf.round(Mathf.random(-66666,66666));
print(seed + " " + seedA + " " + seedB + " " + seedC + " " + seedD);
var weapRand = "";
for(var p = 0; p < 24; p++){
	var tmp = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedC * p, 0, 127)));
	var tmpA = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedC * p + 42624, 1024, 1279)));
	var tmpAB = Mathf.randomSeed(seedC * p + 341) < 0.5 ? tmpA : tmp;
	var tmpB = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedC * p + 34134, 768, 879)));
	weapRand = weapRand + tmpAB + tmpB;
};
//print("weapRand: " + weapRand);
var abilRand = "";
for(var p = 0; p < 24; p++){
	var tmp = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedD * p, 0, 127)));
	var tmpC = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedD * p + 42624, 1024, 1279)));
	var tmpCD = Mathf.randomSeed(seedD * p + 341) < 0.5 ? tmpC : tmp;
	var tmpD = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedD * p + 34134, 768, 879)));
	abilRand = abilRand + tmpCD + tmpD;
};
//print("abilRand: " + abilRand);
var descRand = "";
for(var p = 0; p < 340; p++){
	var tmp = String.fromCharCode(Mathf.round(Mathf.randomSeed(seed * p, 0, 127)));
	var tmpA = String.fromCharCode(Mathf.round(Mathf.randomSeed(seed * p + 42624, 1024, 1279)));
	var tmpAB = Mathf.randomSeed(seed * p + 341) < 0.5 ? tmpA : tmp;
	var tmpB = String.fromCharCode(Mathf.round(Mathf.randomSeed(seed * p + 34134, 768, 879)));
	descRand = descRand + tmpAB + tmpB;
}
//print("descRand: " + descRand);
var padDescRand = "Provides transformation into ";
for(var p = 0; p < 44; p++){
	var tmp = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedB * p, 0, 127)));
	var tmpA = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedB * p + 42624, 1024, 1279)));
	var tmpAB = Mathf.randomSeed(seedB * p + 341) < 0.5 ? tmpA : tmp;
	var tmpB = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedB * p + 34134, 768, 879)));
	padDescRand = padDescRand + tmpAB + tmpB;
}
padDescRand = padDescRand + ". Use by tapping while standing on it";
//print("padDescRand: " + padDescRand);
var nameRand = "";
for(var p = 0; p < 8; p++){
	var tmp = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedA * p, 0, 127)));
	var tmpA = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedB * p + 42624, 1024, 1279)));
	var tmpAB = Mathf.randomSeed(seedC * p + 341) < 0.5 ? tmpA : tmp;
	var tmpB = String.fromCharCode(Mathf.round(Mathf.randomSeed(seedD * p + 34134, 768, 879)));
	nameRand = nameRand + tmpAB + tmpB;
}
//print("nameRand: " + nameRand);

const illithidAbilitySound = extendContent(Block, "illithid-ability-activate", {});
const illithidDeathSound = extendContent(Block, "illithid-dies", {});
const illithidShootSound = extendContent(Block, "illithid-shoots", {});
const illithidBulletHit = extendContent(Block, "illithid-bullet-hit", {});
const illithidHurtSound1 = extendContent(Block, "illithid-hurts-a", {});
const illithidHurtSound2 = extendContent(Block, "illithid-hurts-b", {});
const illithidHurtSound3 = extendContent(Block, "illithid-hurts-c", {});
const illithidHurtSound4 = extendContent(Block, "illithid-hurts-d", {});

const illithidWeaponBullet = extend(BasicBulletType, {
	init(b){
		if (b != undefined) {
		this.super$init(b);
		illithidShootSound.breakSound.at(b.x, b.y);
		}
	},
	hit(b, x, y){
		illithidBulletHit.breakSound.at(b.x, b.y);
		this.super$hit(b, b.x, b.y);
	},
    update(b){
        this.super$update(b);
		this.supressCollision = false;
		Effects.effect(illithidBulletTrail1, b.x, b.y, Mathf.random(-360,360));
		Effects.effect(illithidBulletTrail2, b.x, b.y, Mathf.random(-360,360));
    },});
illithidWeaponBullet.speed = 8;
illithidWeaponBullet.lifetime = 120;
illithidWeaponBullet.damage = 200;
illithidWeaponBullet.splashDamage = 1000;
illithidWeaponBullet.splashDamageRadius = 80;
illithidWeaponBullet.bulletWidth = 25;
illithidWeaponBullet.bulletHeight = 35;
illithidWeaponBullet.hitSize = 30;
illithidWeaponBullet.bulletShrink = 0;
illithidWeaponBullet.knockback = 5000;
illithidWeaponBullet.frontColor = Color.valueOf("#cbd97f");
illithidWeaponBullet.backColor = Color.valueOf("#00d8ff");
illithidWeaponBullet.pierce = false;
illithidWeaponBullet.bulletSprite = "shell";
illithidWeaponBullet.despawnEffect = Fx.mineHuge;
illithidWeaponBullet.hitEffect = illithidBulletHitFx;
illithidWeaponBullet.hitSound = Sounds.none;
const illithidWeapon = extendContent(Weapon, "ancient-devastation-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-devastation-equip");
	}
});
illithidWeapon.shots = 1;
illithidWeapon.length = 28;
illithidWeapon.width = 28;
illithidWeapon.reload = 120;
illithidWeapon.recoil = 10;
illithidWeapon.minPlayerDist = 30;
illithidWeapon.spacing = 0;
illithidWeapon.inaccuracy = 0;
illithidWeapon.velocityRnd = 0;
illithidWeapon.lengthRand = 0;
illithidWeapon.alternate = true;
illithidWeapon.shootSound = Sounds.none;
illithidWeapon.bullet = illithidWeaponBullet;

const illithidDeathBulletFx = newEffect(15, e => {
	Draw.color(Color.valueOf("#111111"), Color.valueOf("#333333"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 2, Mathf.random(-3,3));
    }})
    Angles.randLenVectors(e.id, 5, 10 + 20 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 2);
	Lines.circle(e.x, e.y, e.fin() * 11);
});
const illithidDeathBulletTrail = newEffect(45, e => {
	Draw.color(Color.valueOf("#111111"), Color.valueOf("#333333"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 3, Mathf.random(-3,3));
    }})
    Angles.randLenVectors(e.id, 2, 5 + 5 * e.fout(), e.rotation, 360,d);
});
const illithidDeathFx = newEffect(45, e => {
	Draw.color(Color.valueOf("#111111"), Color.valueOf("#333333"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 6, Mathf.random(-9,9));
    }})
    Angles.randLenVectors(e.id, 22, 15 + 200 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 6);
	Lines.circle(e.x, e.y, e.fin() * 222);
});
const illithidDeathFxPulsating = newEffect(45, e => {
	Draw.color(Color.valueOf("#111111"), Color.valueOf("#333333"), Mathf.random());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * (6 + Mathf.random(-3,3)), Mathf.random(-9,9));
    }})
    Angles.randLenVectors(e.id, 22, 15 + 200 * e.fout(), e.rotation, 360,d);
});

const illithidDeathBullet = extend(MissileBulletType, {
	/* init(b){
		if (b != undefined) {
		this.super$init(b);
		illithidDeathSound.breakSound.at(b.x, b.y);
		}
	}, */
	hit(b, x, y){
				Units.all(cons(unit => {
					if (!(unit instanceof Player)){
						if(unit.isDead() == false && (unit.getTeam() != b.getTeam()) && unit.withinDst(b.x, b.y, 16)){
							if(unit.maxHealth() < 2500){
								unit.velocity().add(Mathf.random(-0.66,0.66), Mathf.random(-0.66,0.66));
								unit.velocity().setAngle(Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random()));
								unit.rotation = Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random());
								unit.applyEffect(illithidWither, 2400);
							}
							else if(unit.maxHealth() < 25000){
								unit.applyEffect(illithidWither, 2400);
							}
						}
					}
				}));
		this.super$hit(b, b.x, b.y);
	},
    update(b){
        this.super$update(b);
		this.supressCollision = false;
		Effects.effect(illithidDeathBulletTrail, b.x, b.y);
    },
});
illithidDeathBullet.speed = 8;
illithidDeathBullet.lifetime = 60;
illithidDeathBullet.damage = 12;
illithidDeathBullet.splashDamage = 10;
illithidDeathBullet.splashDamageRadius = 12;
illithidDeathBullet.bulletWidth = 9;
illithidDeathBullet.bulletHeight = 14;
illithidDeathBullet.hitSize = 13;
illithidDeathBullet.bulletShrink = 0;
illithidDeathBullet.knockback = 2;
illithidDeathBullet.frontColor = Color.valueOf("#222222");
illithidDeathBullet.backColor = Color.valueOf("#333333");
illithidDeathBullet.trailColor = Color.valueOf("#444444");
illithidDeathBullet.pierce = false;
illithidDeathBullet.bulletSprite = "diamond-ore-diamondshell";
illithidDeathBullet.despawnEffect = Fx.none;
illithidDeathBullet.hitEffect = illithidDeathBulletFx;
illithidDeathBullet.hitSound = Sounds.none;

const illithidShip = extendContent(Mech, "illithid", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	//OVERRIDE
	displayInfo(table){
		table.table(cons(title => {
			title.addImage(this.icon(Cicon.xlarge)).size(8 * 6);
			title.add("[accent]" + this.localizedName).padLeft(5);
		}));
		
		table.row();
		
		table.addImage().height(3).color(Color.lightGray).pad(15).padLeft(0).padRight(0).fillX();
		
		table.row();
		
		if(this.description != null){
			table.add(this.displayDescription()).padLeft(5).padRight(5).width(400).wrap().fillX();
			table.row();

			table.addImage().height(3).color(Color.lightGray).pad(15).padLeft(0).padRight(0).fillX();
			table.row();
		};
		
		table.left().defaults().fillX();

		table.add(Core.bundle.format("mech.weapon", weapRand));
		table.row();
		table.add(Core.bundle.format("mech.ability", abilRand));
		table.row();
		table.row();
		//table.add(Core.bundle.format("mech.health", "NaN"));
		//table.row();
	},
	// OVERRIDE
	calculateDamage(amount){
		var hurtSnd = 0;
		if(Mathf.chance(0.1)){
			hurtSnd = Math.ceil(Mathf.random(0,4));
			switch(hurtSnd){
				case 2:
					illithidHurtSound2.breakSound.at(this);
					break;
				case 3:
					illithidHurtSound3.breakSound.at(this);
					break;
				case 4:
					illithidHurtSound4.breakSound.at(this);
					break;
				default:
					illithidHurtSound1.breakSound.at(this);
					break;
			};
		}
		trueAmount = amount * 0.02;
		this.super$calculateDamage(trueAmount);
	},
	// OVERRIDE
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-illithid-cell");
    },

	// OVERRIDE
	updateAlt: function(player){
		if(this.abilityCooldown == 0){
			Effects.effect(illithidAbilityReadyFx, player.x, player.y, Mathf.random(-360,360));
			if(Core.input.keyDown(Binding.dash)){
				illithidAbilitySound.breakSound.at(player);
				this.abilityCooldown = 512;
				Draw.flush();
				Draw.reset();
				Effects.effect(illithidAbilityFx, player.x, player.y, Mathf.random(-360,360));
				Units.all(cons(unit => {
					if (!(unit instanceof Player)){
						if(unit.isDead() == false && (unit.getTeam() != player.getTeam()) && unit.withinDst(player.x, player.y, 320)){
							if(unit.maxHealth() < 2500 && !(unit.hasEffect(illithidWither))){
								unit.velocity().add(Mathf.random(-0.66,0.66), Mathf.random(-0.66,0.66));
								unit.velocity().setAngle(Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random()));
								unit.rotation = Mathf.slerpDelta(unit.velocity().angle(), Mathf.random(360), Mathf.random());
								unit.applyEffect(illithidWither, 2400);
							}
							else if(unit.maxHealth() < 25000){
								if (unit.hasEffect(illithidWither)){
									player.healBy(unit.health / 2);
									unit.damage(unit.health / 2);
								}
								unit.applyEffect(illithidWither, 2400);
							}
							else{
								try{
								// Put in a try so Azathoth doesn't crash the game
								Effects.effect(illithidBossWither, unit.x, unit.y, Mathf.random(-360,360));
								for(var i = 0; i < 6; i++){
									illithidDeathBullet.weaveScale = Mathf.random(-2,2);
									illithidDeathBullet.weaveMag = Mathf.random(-2,2);
									Calls.createBullet(illithidDeathBullet, player.getTeam(), unit.x, unit.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
								}
								unit.setDead(true);
								Call.onUnitDeath(unit);
								unit.remove();
								}
								catch(fuck){
									print(fuck);
								}
							}
						}
					}
				}
				));
			}
		}
		else {
			this.abilityCooldown -= 1;
		}
		var zx = Angles.trnsx(this.rotation + 180, 33);
		var zy = Angles.trnsy(this.rotation + 180, 33);
		Effects.effect(illithidTrailFx, this.x + zx, this.x + zy);
	},
    onDeath(){
        illithidDeathSound.breakSound.at(this);
        for(var i = 0; i < 20; i++){
			illithidDeathBullet.weaveScale = Mathf.random(-2,2);
			illithidDeathBullet.weaveMag = Mathf.random(-2,2);
            Calls.createBullet(illithidDeathBullet, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.2), Mathf.random(0.4, 1.0));
		}
		Effects.effect(illithidDeathFx, this.x, this.y);
		Effects.effect(illithidDeathFxPulsating, this.x, this.y);
		this.super$onDeath();
    }
});
illithidShip.abilityCooldown = 255;
illithidShip.region = region = Core.atlas.find(illithidShip.name);
illithidShip.deathSound = illithidDeathSound.breakSound;
illithidShip.description = descRand;
illithidShip.speed = 0.04;
illithidShip.compoundSpeed = 0.04;
illithidShip.compoundSpeedBoost = 0.07;
illithidShip.rotateSpeed = 0.06;
illithidShip.baseRotateSpeed = 0.04;
illithidShip.drag = 0.02;
illithidShip.maxSpeed = 0.35;
illithidShip.boostSpeed = 2.0;
illithidShip.buildPower = 0;
illithidShip.mineSpeed = 0;
illithidShip.drillPower = 0;
illithidShip.hitSize = 70;
illithidShip.hitSizeTile = 70;
illithidShip.mass = Number.MAX_VALUE;
illithidShip.itemCapacity = 2000;
illithidShip.engineColor = Color.valueOf("#9ef0ff");
illithidShip.engineSize = 20;
illithidShip.rotateWeapon = true;
illithidShip.flying = true;
illithidShip.cellTrnsY = 0;
illithidShip.health = 32767;
illithidShip.engineOffset = 32;
illithidShip.weaponOffsetX = 28;
illithidShip.weaponOffsetY = 17;
illithidShip.weapon = illithidWeapon;
illithidShip.localizedName = nameRand;

const illithidPad = extendContent(MechPad, "illithid-nexus", {
	update(tile){
		if(tile.entity.cons.valid()){
			this.buildTime = Math.ceil(10800 * (1000 - (999 * tile.entity.efficiency())));
			this.super$update(tile);
			tile.entity.cons.trigger();
		}
	},
});
print("2");
illithidPad.mech = illithidShip;
illithidPad.description = padDescRand;
illithidPad.localizedName = nameRand + " Nexus";
print("3");
illithidPad.buildTime = Number.MAX_VALUE;