//require("effects")
const ancientSentinel = extendContent(ItemTurret, "ancient-sentinel", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
		this.super$drawBase(tile);
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
		this.super$drawBase(tile);
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
		this.super$drawBase(tile);
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
const ancientBladeLaser = extend(ContinuousLaserBulletType, {});
ancientBladeLaser.damage = 75;
ancientBladeLaser.length = 120;
ancientBladeLaser.hitEffect = ancientBladeLaserHit;
ancientBladeLaser.despawnEffect = Fx.shootBigSmoke2;
ancientBladeLaser.hitSize = 3;
ancientBladeLaser.frontColor = Color.valueOf("#ffffff");
ancientBladeLaser.backColor = Color.valueOf("#ffffff");
ancientBladeLaser.colors = [Color.valueOf("ffffff88"), Color.valueOf("feed00aa"), Color.valueOf("ffee5a"), Color.white];
ancientBladeLaser.width = 2;
ancientBladeLaser.strokes = [2, 1.5, 1, 0.5];
ancientBladeLaser.drawSize = 210;
ancientBladeLaser.oscScl = 1;
ancientBladeLaser.oscMag = 2.15;
ancientBladeLaser.incendAmount = 0;
ancientBladeLaser.shake = 0;
ancientBladeLaser.pierce = true;
ancientBladeLaser.shootEffect = Fx.shootBigSmoke2;
ancientBladeLaser.smokeEffect = Fx.shootBigSmoke2;
const ancientBlade = extendContent(LaserTurret, "ancient-blade", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
		this.super$drawBase(tile);
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
		this.super$drawBase(tile);
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
		this.super$drawBase(tile);
	},
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
ancientSprayer.consumes.add(new ConsumeLiquidFilter(boolf(liquid=>liquid.temperature<=0.5&&liquid.flammability<0.1), 0.4)).update(false).boost();