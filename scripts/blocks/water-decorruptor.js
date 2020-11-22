const waterDecorruptor = extendContent(AttributeSmelter, "water-decorruptor", {
	/* setBars(){
		this.super$setBars();		
		this.bars.add("Water", entity => new Bar(
			() => this.outputLiquid.localizedName,
			() => this.outputLiquid.barColor(),
			() => this.liquids.get(this.outputLiquid) / this.liquidCapacity)
		);
	}, *//* 
	drawBase: function(tile){
        this.super$drawBase(tile);
        Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(this.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(waterDecorruptor.name + "-liquid-output"), tile.drawx(), tile.drawy());
		//Draw.rect(this.region, this.x, this.y);
		Draw.color(this.liquids.current().color);
		Draw.alpha(this.liquids.currentAmount() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(waterDecorruptor.name + "-liquid-input"), tile.drawx(), tile.drawy());
		Draw.reset()
	}, */
	//new Func(){bars.add("liquidOutput", this => new Bar(this.outputLiquid.liquid, this.outputLiquid.liquid.color, (this.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity)))}
	//new Func(){get(entity, bar){ new Bar()}}
})
/* waterDecorruptor.buildType = () => extendContent(GenericSmelter.SmelterBuild, waterDecorruptor, {
	draw(){
        this.super$draw();
		Draw.color(this.outputLiquid.color);
		Draw.alpha(this.liquids.get(this.outputLiquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(waterDecorruptor.name + "-liquid-output"), this.x, this.y);
		//Draw.rect(this.region, this.x, this.y);
		Draw.color(this.liquids.current().color);
		Draw.alpha(this.liquids.currentAmount() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(waterDecorruptor.name + "-liquid-input"), this.x, this.y);
		Draw.reset()
	},	
}); */
const decorrupting = Effect(36, e => {
    Draw.color(Color.valueOf("#355085"), Color.valueOf("#596ae8"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }})
    Lines.stroke(e.fout() * 1);
    Lines.circle(e.x, e.y, e.fout() * 2);
});
const decorrupted = Effect(72, e => {
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
