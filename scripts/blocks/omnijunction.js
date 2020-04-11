
const omniJunction = extendContent(Junction, "omnijunction", {
	getLiquidDestination(tile, source, liquid){
        dir = source.relativeTo(tile.x, tile.y);
        dir = (dir + 4) % 4;
        next = tile.getNearbyLink(dir);
        if(next == null || !next.block().acceptLiquid(next, tile, liquid, 0) && !(next.block() instanceof LiquidJunction)){
            return tile;
        }
        return next.block().getLiquidDestination(next, tile, liquid);
    },
		draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.alpha(tile.entity.efficiency());
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
		Draw.reset();
	},
	update(tile){
		if(tile.entity.cons.valid()){
			this.speed = Math.ceil(this.baseSpeed + (100 - (100 * tile.entity.efficiency())));
			this.super$update(tile);
			if(tile.entity.efficiency() == 1){
				this.outputsLiquid = true;
				try{
				dir = tile.relativeTo(tile.x, tile.y);
				dir = (dir + 4) % 4;
				next = tile.getNearbyLink(dir);
				if(next == null || !next.block().acceptLiquid(next, tile, liquid, 0) && !(next.block() instanceof LiquidJunction)){
					return tile;
				}
				return next.block().getLiquidDestination(next, tile, liquid);
				}
				catch(error){
					//print(error); Does not crash, but now 
				}
			}
			else{
				this.outputsLiquid = false;
			}
			tile.entity.cons.trigger();
		}
	}
});
omniJunction.baseSpeed = 1;