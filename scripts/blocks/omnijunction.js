
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
		drawBase(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.alpha(this.efficiency());
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
		Draw.reset();
	},
	updateTile(){
		if(this.tile.cons.valid()){
			this.speed = Math.ceil(this.baseSpeed + (100 - (100 * this.tile.efficiency())));
			this.super$updateTile();
			if(this.tile.efficiency() == 1){
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
			this.tile.cons.trigger();
		}
	}
});
omniJunction.baseSpeed = 1;