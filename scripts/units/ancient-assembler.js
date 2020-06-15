
const assemblerEngineFx = newEffect(30, e => {
	Draw.color(Color.valueOf("#93a2ff"), Color.valueOf("#e3e2ff"), e.fout());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 0.5, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 3 - e.fin() * 2, d);
});

const assemblerBase = prov(() => extend(BuilderDrone, {
	drawEngine(){
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 140, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 140, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 7);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 140, this.type.engineOffset - 1);
		var iy = Angles.trnsy(this.rotation + 140, this.type.engineOffset - 1);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 6);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#93a2ff"));
		var gx = Angles.trnsx(this.rotation + 220, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 220, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 7);
		Fill.circle(this.x + gx, this.y + gy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var yx = Angles.trnsx(this.rotation + 220, this.type.engineOffset - 1);
		var yy = Angles.trnsy(this.rotation + 220, this.type.engineOffset - 1);
		var ySize = Mathf.absin(Time.time(), 2, this.type.engineSize / 6);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#93a2ff"));
		var tx = Angles.trnsx(this.rotation + 180, this.type.engineOffset);
		var ty = Angles.trnsy(this.rotation + 180, this.type.engineOffset);
		var tSize = Mathf.absin(Time.time(), 3, this.type.engineSize / 4);
		Fill.circle(this.x + tx, this.y + ty, this.type.engineSize + tSize + 2);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ynx = Angles.trnsx(this.rotation + 180, this.type.engineOffset - 1);
		var yny = Angles.trnsy(this.rotation + 180, this.type.engineOffset - 1);
		var ynSize = Mathf.absin(Time.time(), 6, (this.type.engineSize + 1.5) / 7);
		Fill.circle(this.x + ynx, this.y + yny, (this.type.engineSize + ynSize + 1.5) / 2);
		Draw.color();
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-assembler-cell");
    },
}));
const ancientAssembler = extendContent(UnitType, "ancient-assembler", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.14);
		}
	},
});
ancientAssembler.create(assemblerBase);