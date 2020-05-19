//require("effects")
const ancientSentinel = extendContent(ArtilleryTurret, "ancient-sentinel", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
const ancientBlasterShoot = newEffect(20, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 4, 1 + 12 * e.fin(), e.rotation, 30,d);
});
const ancientShotgunShoot = newEffect(20, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 12 * e.fin(), e.rotation, 90,d);
});
const ancientBlasterAmmoUse = newEffect(20, e => {
    Draw.color(Color.yellow, Color.valueOf("#555500"), e.fin());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.circle(e.x + x, e.y + y, e.fin() * 5);
    }}) 
    Angles.randLenVectors(e.id, 3, 1 + 28 * e.fin(), e.rotation + 180, 30,d);
});
const ancientBlaster = extendContent(ItemTurret, "ancient-blaster", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
ancientBlaster.ammoUseEffect = ancientBlasterAmmoUse;
ancientBlaster.shootEffect = ancientBlasterShoot;
const ancientShotgun = extendContent(ItemTurret, "ancient-shotgun", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name)
        ];
    }
});
ancientShotgun.ammoUseEffect = ancientBlasterAmmoUse;
ancientShotgun.shootEffect = ancientShotgunShoot;
const ancientSprayer = extendContent(ItemTurret, "ancient-sprayer", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
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
//?
