
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
});
omniJunction.buildType = () => extendContent(Junction.JunctionBuild, omniJunction, {
	draw(){
		Draw.rect(omniJunction.region, this.x, this.y);
		Draw.alpha(this.efficiency());
		Draw.rect(Core.atlas.find(omniJunction.name + "-top"), this.x, this.y);
		Draw.reset();
	},
	updateTile(){
		if(this.cons.valid()){
			this.speed = Math.ceil(this.baseSpeed + (100 - (100 * this.efficiency())));
			this.super$updateTile();
			if(this.efficiency() == 1){
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
			this.cons.trigger();
		}
	}
});
omniJunction.baseSpeed = 1;