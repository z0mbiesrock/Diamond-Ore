
const alloyRefining = Effect(10, e => {
    Draw.color(Color.valueOf("#fdeacb"), Color.valueOf("#f0985d"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 4 + 1);
    }})
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 8);
    Angles.randLenVectors(e.id, 4, 1 + 12 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 4, 1 + 12 * e.fin(), e.rotation, 360,d);
});

const alloyRefined = Effect(50, e => {
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
	
	icons: function(){
	return [
		Core.atlas.find(this.name),
		Core.atlas.find(this.name + "-topB")
	];},
	
	setStats(){
        this.super$setStats();
		this.stats.add(BlockStat.boostEffect, 2.25, StatUnit.timesSpeed);
	},
	
	drawBase: function(tile){
        this.super$drawBase(tile);
		ent = tile.ent();
		Draw.rect(this.topRegionB, tile.drawx(), tile.drawy(), ent.totalProgress * 7);
	},
	
	updateTile(){
        this.super$updateTile();
		if(tile.ent().cons.valid() && tile.ent().cons.optionalValid()){
			tile.ent().progress += (this.getProgressIncrease(tile.ent(), this.craftTime) * 1.25);
		}
	}
});
oldRefinery.craftEffect = alloyRefined;
oldRefinery.updateEffect = alloyRefining;
oldRefinery.spin = 0;
oldRefinery.consumes.liquid(Liquids.slag, (5 / 18)).update(true).boost();