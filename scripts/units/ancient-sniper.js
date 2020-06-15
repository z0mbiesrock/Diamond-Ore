const ancientSniperShoot = newEffect(24, e => {
	Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
	var w = 1 + 9 * e.fout();
	Drawf.tri(e.x, e.y, w, 33 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, w, 8 * e.fout(), e.rotation + 180);
    Lines.stroke(e.fout() * 1.5);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#dce664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }})
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const dw = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 7 + 1);
    }})
    const ks = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 11 + 1);
    }})
    const xf = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 15 + 1);
    }})
    Angles.randLenVectors(e.id, 5, 20 * e.fin(), e.rotation, 30,dw);
    Angles.randLenVectors(e.id, 5, 50 * e.fin(), e.rotation, 15,ks);
    Angles.randLenVectors(e.id, 5, 80 * e.fin(), e.rotation, 7.5,xf);
});
const ancientSniperBulletDespawn = newEffect(14, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const dw = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 7 + 1);
    }})
    const ks = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 11 + 1);
    }})
    const xf = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 15 + 1);
    }})
    Angles.randLenVectors(e.id, 5, 20 * e.fin(), e.rotation, 15,dw);
    Angles.randLenVectors(e.id, 5, 50 * e.fin(), e.rotation, 7.5,ks);
    Angles.randLenVectors(e.id, 5, 80 * e.fin(), e.rotation, 3.75,xf);
});
const ancientSniperBulletHit = newEffect(14, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const dw = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 7 + 1);
    }})
    const ks = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 11 + 1);
    }})
    const xf = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#edf3a9"), Color.valueOf("#cbd97f"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 15 + 1);
    }})
    Angles.randLenVectors(e.id, 5, 10 * e.fin(), e.rotation, 15,dw);
    Angles.randLenVectors(e.id, 5, 15 * e.fin(), e.rotation, 7.5,ks);
    Angles.randLenVectors(e.id, 5, 20 * e.fin(), e.rotation, 3.75,xf);
    Draw.color(Color.valueOf("#ffae5a"), Color.valueOf("#dcb664"), Mathf.random());
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 8);
});
const ancientSniperBullet = extend(BasicBulletType, {
	init(b){
		if (b != undefined) {
		this.super$init(b);
		Sounds.shootSnap.at(b.x, b.y);
		}
	},
	range(){
		return 720
	}
});
ancientSniperBullet.speed = 15;
ancientSniperBullet.lifetime = 60;
ancientSniperBullet.bulletWidth = 4;
ancientSniperBullet.bulletHeight = 22;
ancientSniperBullet.hitSize = 22;
ancientSniperBullet.bulletSprite = "shell";
ancientSniperBullet.bulletShrink = 0;
ancientSniperBullet.pierce = true;
ancientSniperBullet.frontColor = Color.valueOf("#decf5a");
ancientSniperBullet.backColor = Color.valueOf("#9cb664");
ancientSniperBullet.damage = 1200;
ancientSniperBullet.despawnEffect = ancientSniperBulletDespawn;
ancientSniperBullet.hitEffect = ancientSniperBulletHit;
ancientSniperBullet.hitSound = Sounds.explosionbig;
ancientSniperBullet.shootEffect = ancientSniperShoot;
ancientSniperBullet.smokeEffect = Fx.none;
const ancientSniperWeapon = extendContent(Weapon, "ancient-sniper-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-sniper-equip");
	}
});
ancientSniperWeapon.width = 8.6;
ancientSniperWeapon.length = 19;
ancientSniperWeapon.recoil = 2;
ancientSniperWeapon.reload = 240;
ancientSniperWeapon.targetDistance = 150;
ancientSniperWeapon.inaccuracy = 0;
ancientSniperWeapon.spacing = 0;
ancientSniperWeapon.shootCone = 3;
ancientSniperWeapon.alternate = true;
ancientSniperWeapon.ignoreRotation = true;
ancientSniperWeapon.bullet = ancientSniperBullet;
ancientSniperWeapon.shootSound = Sounds.shootSnap;
ancientSniperWeapon.shootEffect = ancientSniperShoot;
const sniperAttackState = new JavaAdapter(UnitState, {
	entered(){
		print("Sniper targeted enemy")
	},
	
	update(){
	},
	
	exited(){
	}	
});
const ancientSniper = new JavaAdapter(UnitType, {}, "ancient-sniper",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-sniper-cell");
    },
	update(){
		this.super$update();
		if (this.target != null && this.state.is(this.attack)){
			this.state.set(sniperAttackState)
		}
		else if (this.target == null){
			try{
				this.onCommand(command);
			}
			catch(nooh){
				try{
				this.onCommand(getCommand());
				}
				catch(fooj){
					this.state.set(this.attack);
				}
			}
		}
    },
	onCommand(command){
		this.super$onCommand(command);
    },
	
	getTarget(){
		return this.target;
	},
	
	setTarget(a){
		this.target = a;
	},
	
	behavior(){
		if(this.state.is(sniperAttackState)){
			this.super$behavior();
		}
			/* if(!Units.invalidateTarget(target, this)){
				if(this.dst(this.target) < this.getWeapon().bullet.range()){

					this.rotate(angleTo(target));

					if(Angles.near(angleTo(this.target), this.rotation, 13)){
						var ammo = this.getWeapon().bullet;

						var to = Predict.intercept(this, this.target, ammo.speed);

						this.getWeapon().update(this, to.x, to.y);
					}
				}
			} */
	}
})));
ancientSniper.weapon = ancientSniperWeapon;