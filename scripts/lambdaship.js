
const lambdaTeleportReadyFx = newEffect(10, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#e3a880"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * Mathf.random(1,4), 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 5, 11 + 10 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fin() * 3);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 3, 11 + 10 * e.fout(), e.rotation, 360,d);
});

const lambdaTeleportEnterFx = newEffect(80, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#e3a880"), e.fout());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fin() * 2, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 45, 45 * e.fout(), e.rotation, 360,d);
    Lines.stroke(e.fin() * 3);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 25, 90 * e.fout(), e.rotation, 360,h);
});

const lambdaTeleportExitFx = newEffect(80, e => {
	Draw.color(Color.valueOf("#efe4cc"), Color.valueOf("#e3a880"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 2, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 45, 45 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 3);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 25, 90 * e.fin(), e.rotation, 360,h);
});

const lambdaTeleportPush = extend(BasicBulletType, {});
lambdaTeleportPush.speed = 8;
lambdaTeleportPush.lifetime = 15;
lambdaTeleportPush.damage = 2;
lambdaTeleportPush.bulletWidth = 0;
lambdaTeleportPush.bulletHeight = 0;
lambdaTeleportPush.hitSize = 10;
lambdaTeleportPush.bulletShrink = 1;
lambdaTeleportPush.knockback = 5000;
lambdaTeleportPush.hitShake = 0;
lambdaTeleportPush.frontColor = Color.valueOf("#efe4ca");
lambdaTeleportPush.backColor = Color.valueOf("#e3a880");
lambdaTeleportPush.pierce = true;
lambdaTeleportPush.despawnEffect = Fx.none;
lambdaTeleportPush.hitEffect = Fx.none;
lambdaTeleportPush.hitSound = Sounds.none;

const lambdaShip = extendContent(Mech, "lambda-mech", {
	// OVERRIDE
	/* load: function(){ 
	}, */

	// OVERRIDE
	updateAlt: function(player){
		if(this.abilityCooldown == 0){
			Effects.effect(lambdaTeleportReadyFx, player.x, player.y, Mathf.random(-360,360));
			if(Core.input.keyDown(Binding.dash)){
				Effects.effect(lambdaTeleportEnterFx, player.x, player.y, Mathf.random(-360,360));
				player.x = player.pointerX;
				player.y = player.pointerY;
				Sounds.laser.at(player);
				this.abilityCooldown = 135;
				Effects.effect(lambdaTeleportExitFx, player.x, player.y, Mathf.random(-360,360));
				for(var i = 0; i < 48; i++){
					Calls.createBullet(lambdaTeleportPush, player.getTeam(), player.x, player.y, 7.5 * i, 1, 1);
				}
			}
		}
		else {
			this.abilityCooldown -= 1;
		}
	},
});
lambdaShip.abilityCooldown = 135;

const lambdaWeaponBullet = extend(BasicBulletType, {});
lambdaWeaponBullet.speed = 4;
lambdaWeaponBullet.lifetime = 55;
lambdaWeaponBullet.damage = 2;
lambdaWeaponBullet.splashDamage = 16;
lambdaWeaponBullet.splashDamageRadius = 8;
lambdaWeaponBullet.bulletWidth = 2;
lambdaWeaponBullet.bulletHeight = 8;
lambdaWeaponBullet.bulletShrink = 0;
lambdaWeaponBullet.knockback = 5000;
lambdaWeaponBullet.homingPower = 1.3;
lambdaWeaponBullet.homingRange = 18;
lambdaTeleportPush.frontColor = Color.valueOf("#e3a880");
lambdaTeleportPush.backColor = Color.valueOf("#efe4ca");
lambdaWeaponBullet.pierce = false;
lambdaWeaponBullet.bulletSprite = "diamond-ore-diamondbullet";
lambdaWeaponBullet.despawnEffect = Fx.pulverizeSmall;
lambdaWeaponBullet.hitEffect = Fx.pulverizeMedium;
lambdaWeaponBullet.hitSound = Sounds.none;

const lambdaWeapon = extend(Weapon, {});
lambdaWeapon.shots = 20;
lambdaWeapon.reload = 95;
lambdaWeapon.recoil = 0;
lambdaWeapon.spacing = 0;
lambdaWeapon.inaccuracy = 12;
lambdaWeapon.velocityRnd = 0.5;
lambdaWeapon.lengthRand = 0.1;
lambdaWeapon.alternate = true;
lambdaWeapon.shootSound = Sounds.laser;
lambdaWeapon.bullet = lambdaWeaponBullet;

lambdaShip.region = region = Core.atlas.find(lambdaShip.name);
lambdaShip.description = "A ship with accelerated construction capabilities. Uses a shotgun that fires disruptive bullets.";
lambdaShip.speed = 0.3;
lambdaShip.drag = 0.12;
lambdaShip.maxSpeed = 1.25;
lambdaShip.boostSpeed = 2.0;
lambdaShip.buildPower = 5;
lambdaShip.mineSpeed = 0.6;
lambdaShip.drillPower = 4;
lambdaShip.mass = 255;
lambdaShip.itemCapacity = 100;
lambdaShip.engineColor = Color.valueOf("#efe4ca");
lambdaShip.engineSize = 4.44;
lambdaShip.flying = true;
lambdaShip.cellTrnsY = 4;
lambdaShip.health = 700;
lambdaShip.engineOffset = 11;
lambdaShip.weaponOffsetX = 5;
lambdaShip.weaponOffsetY = -2;
lambdaShip.weapon = lambdaWeapon;
lambdaShip.localizedName = Core.bundle.get("mech.diamond-ore-lambda-mech.name");

const lambdaPad = extendContent(MechPad, "lambda-mech-pad", {});
lambdaPad.mech = lambdaShip;
lambdaPad.update = true;