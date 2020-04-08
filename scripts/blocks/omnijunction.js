
const omniJunction = extendContent(Junction, "omnijunction", {
	draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.alpha(tile.entity.efficiency() * (Math.random(28,35)/35));
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
		Draw.reset();
	},
	update(tile){
		if(tile.entity.cons.valid()){
			this.speed = Math.ceil(this.baseSpeed / tile.entity.efficiency());
			this.super$update(tile);
			if(tile.entity.efficiency() == 1){
				this.outputsLiquid = true;
				
			}
			else{
				this.outputsLiquid = false;
			}
			tile.entity.cons.trigger();
		}
	}
});
omniJunction.baseSpeed = 1;
//omniJunction.outputsLiquid = true;