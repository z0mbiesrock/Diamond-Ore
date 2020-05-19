
const alloyRefining = newEffect(10, e => {
    Draw.color(Color.valueOf("#fdeacb"), Color.valueOf("#f0985d"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 4 + 1);
    }})
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 8);
    Angles.randLenVectors(e.id, 4, 1 + 12 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 4, 1 + 12 * e.fin(), e.rotation, 360,d);
});

const alloyRefined = newEffect(50, e => {
    Draw.color(Color.valueOf("#fdeacb"), Color.valueOf("#f0985d"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 16);
    Lines.stroke(e.fout() * 6);
    Lines.circle(e.x, e.y, e.fin() * 24);
    Lines.stroke(e.fout() * 9);
    Lines.circle(e.x, e.y, e.fin() * 32);
    Lines.stroke(e.fout() * 2);
    Angles.randLenVectors(e.id, 12, 1 + 36 * e.fin(), 180 * e.fin(), 360,d);
    Angles.randLenVectors(e.id, 12, 1 + 36 * e.fin(), -180 * e.fin(), 360,d);
});


const oldRefinery = extendContent(GenericSmelter, "ancient-refinery", {	
	load: function(){
		this.region = Core.atlas.find(this.name);
		this.topRegion = Core.atlas.find(this.name + "-top");
		this.topRegionB = Core.atlas.find(this.name + "-topB");
	},
	
	generateIcons: function(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-topB")
	];},
	
	draw: function(tile){
        this.super$draw(tile);
		ent = tile.ent();
		Draw.rect(this.topRegionB, tile.drawx(), tile.drawy(), ent.totalProgress * 7);
	}
});
oldRefinery.craftEffect = alloyRefined;
oldRefinery.updateEffect = alloyRefining;
oldRefinery.spin = 0;