const waterDecorruptor = extendContent(GenericSmelter, "water-decorruptor", {
    //OVERRIDE
	draw: function(tile){
        this.super$draw(tile);
		Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid-output"), tile.drawx(), tile.drawy());
		//Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color(tile.entity.liquids.current().color);
		Draw.alpha(tile.entity.liquids.currentAmount() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid-input"), tile.drawx(), tile.drawy());
		Draw.reset()
	}
	//new Func(){bars.add("liquidOutput", this => new Bar(this.outputLiquid.liquid, this.outputLiquid.liquid.color, (tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity)))}
	//new Func(){get(entity, bar){ new Bar()}}
})
const decorrupting = newEffect(36, e => {
    Draw.color(Color.valueOf("#355085"), Color.valueOf("#596ae8"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Lines.stroke(e.fout() * 1);
    Lines.circle(e.x, e.y, e.fout() * 2);
});
const decorrupted = newEffect(72, e => {
    Draw.color(Color.valueOf("#455085"), Color.valueOf("#596aff"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 8);
    Lines.stroke(e.fout() * 6);
    Lines.circle(e.x, e.y, e.fin() * 12);
    Lines.stroke(e.fout() * 9);
    Lines.circle(e.x, e.y, e.fin() * 16);
    Lines.stroke(e.fout() * 2);
    Angles.randLenVectors(e.id, 12, 1 + 18 * e.fin(), 90 * e.fin(), 360,d);
    Angles.randLenVectors(e.id, 12, 1 + 18 * e.fin(), -90 * e.fin(), 360,d);
});
waterDecorruptor.updateEffect = decorrupting;
waterDecorruptor.craftEffect = decorrupted;
