//require("effects")
const ancientSentinel = extendContent(ItemTurret, "ancient-sentinel", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
const ancientBlasterShoot = Effect(20, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 4, 1 + 12 * e.fin(), e.rotation, 30,d);
});
const ancientShotgunShoot = Effect(20, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 22 * e.fin(), e.rotation, 90,d);
});
const ancientBlasterAmmoUse = Effect(20, e => {
    Draw.color(Color.yellow, Color.valueOf("#555500"), e.fin());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.circle(e.x + x, e.y + y, e.fin() * 5);
    }}) 
    Angles.randLenVectors(e.id, 3, 1 + 28 * e.fin(), e.rotation + 180, 30,d);
});
const ancientBlaster = extendContent(ItemTurret, "ancient-blaster", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
ancientBlaster.ammoUseEffect = ancientBlasterAmmoUse;
ancientBlaster.shootEffect = ancientBlasterShoot;
ancientBlaster.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.1)).update(false).boost();
const ancientPulser = extendContent(PowerTurret, "ancient-pulser", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
const ancientBladeLaserHit = Effect(15, e => {
    Draw.color(Color.white, Color.valueOf("a9d8ff"), e.fout());
    Lines.stroke(e.fout() * 3);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 3);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 12 * e.fin(), e.rotation, 360,d);
});
const ancientBladeLaser = extend(BasicBulletType, {
	
	update: function(b){
		if(b.timer.get(1, 3)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 96.0, false);
		}
	},
	
	/*hit: function(b, hitx, hity){
	Effect.effect(this.hitEffect, Color.valueOf("a9d8ffaa"), hitx, hity);
		if(Mathf.chance(0.1)){
			//Fire.create(world.tileWorld(hitx + Mathf.range(6.0), hity + Mathf.range(6.0)));
			Damage.createIncend(hitx, hity, 6, 1);
		}
	},*/
	
	draw: function(b){
		
		const colors = [Color.valueOf("a9d8ff5f"), Color.valueOf("6998ff"), Color.valueOf("ffffff")];
		const tscales = [1, 0.8, 0.6, 0.3];
		const strokes = [0.45, 0.3, 0.15];
		const lenscales = [1.0, 1.18, 1.21, 1.217];
		const tmpColor = new Color();

		//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
		for(var s = 0; s < 3; s++){
			//Draw.color(colors[s]);
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.5, 0.1)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.0) * 25.0);
				Lines.stroke((9 + Mathf.absin(Time.time(), 1.4, 1.5)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), 96.0 * b.fout() * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});
ancientBladeLaser.speed = 0.001;
ancientBladeLaser.damage = 75;
ancientBladeLaser.lifetime = 13;
ancientBladeLaser.hitEffect = ancientBladeLaserHit;
ancientBladeLaser.despawnEffect = Fx.shootBigSmoke2;
ancientBladeLaser.hitSize = 4;
ancientBladeLaser.drawSize = 610;
ancientBladeLaser.pierce = true;
ancientBladeLaser.shootEffect = Fx.none;
ancientBladeLaser.smokeEffect = Fx.none;
const ancientBlade = extendContent(LaserTurret, "ancient-blade", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
ancientBlade.shootType = ancientBladeLaser;
ancientBlade.update = true;
ancientBlade.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.11)).update(false);
const ancientShotgun = extendContent(ItemTurret, "ancient-shotgun", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
ancientShotgun.ammoUseEffect = ancientBlasterAmmoUse;
ancientShotgun.shootEffect = ancientShotgunShoot;
ancientShotgun.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.15)).update(false).boost();
const ancientSprayer = extendContent(ItemTurret, "ancient-sprayer", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    },
    updateShooting(tile){
        this.super$updateShooting(tile);
        this.xRand += 1;
		this.xRand = Math.max(1, this.xRand % 5);
		this.region = Core.atlas.find(this.name + this.xRand);
    }
});
ancientSprayer.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.4)).update(false).boost();