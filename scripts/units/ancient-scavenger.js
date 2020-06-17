
const scavengerEngineEffect = newEffect(30, e => {
	Draw.color(Color.valueOf("#93a2ff"), Color.valueOf("#e3e2ff"), e.fout());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 0.5, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 3 - e.fin() * 2, d);
});

const scavengerBase = prov(() => extend(MinerDrone, {
	drawEngine(){
		var zx = Angles.trnsx(this.rotation + 180, 1);
		var zy = Angles.trnsy(this.rotation + 180, 1);
		
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 120, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 120, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + ox + zx, this.y + oy + zy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 120, this.type.engineOffset);
		var iy = Angles.trnsy(this.rotation + 120, this.type.engineOffset);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#93a2ff"));
		var gx = Angles.trnsx(this.rotation + 240, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 240, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + gx + zx, this.y + gy + zy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var yx = Angles.trnsx(this.rotation + 240, this.type.engineOffset);
		var yy = Angles.trnsy(this.rotation + 240, this.type.engineOffset);
		var ySize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-scavenger-cell");
    },
}));
const ancientScavenger = extendContent(UnitType, "ancient-scavenger", {
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
ancientScavenger.create(scavengerBase);

 /* 
 const ancientScavengerUnit = new JavaAdapter(UnitType, {}, "ancient-scavenger",  prov(() => new JavaAdapter(MinerDrone, {
	//OVERRIDE
	drawEngine(){
		Draw.color(Color.valueOf("#93a2ff"));
		var ox = Angles.trnsx(this.rotation + 120, this.type.engineOffset);
		var oy = Angles.trnsy(this.rotation + 120, this.type.engineOffset);
		var oSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + ox, this.y + oy, this.type.engineSize + oSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var ix = Angles.trnsx(this.rotation + 118, this.type.engineOffset);
		var iy = Angles.trnsy(this.rotation + 118, this.type.engineOffset);
		var iSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + ix, this.y + iy, (this.type.engineSize + iSize) / 2);
		Draw.color();
		
		Draw.color(Color.valueOf("#93a2ff"));
		var gx = Angles.trnsx(this.rotation + 240, this.type.engineOffset);
		var gy = Angles.trnsy(this.rotation + 240, this.type.engineOffset);
		var gSize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + gx, this.y + gy, this.type.engineSize + gSize);
		
		Draw.color(Color.valueOf("#e3e2ff"));
		var yx = Angles.trnsx(this.rotation + 252, this.type.engineOffset);
		var yy = Angles.trnsy(this.rotation + 252, this.type.engineOffset);
		var ySize = Mathf.absin(Time.time(), 2, this.type.engineSize / 4);
		Fill.circle(this.x + yx, this.y + yy, (this.type.engineSize + ySize) / 2);
		Draw.color();
	}
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-scavenger-cell");
    },
})));
  */