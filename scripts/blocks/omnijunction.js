
const omniJunction = extendContent(Junction, "omnijunction", {
	setStats(){
		this.super$setStats();
		this.stats.remove(Stat.liquidCapacity);
	},
	setBars(){
		this.super$setBars();
		this.bars.remove("liquid");
	},
});
omniJunction.buildType = () => extendContent(Junction.JunctionBuild, omniJunction, {
	draw(){
		this.super$draw();
		Draw.alpha(this.efficiency());
		Draw.rect(Core.atlas.find(omniJunction.name + "-top"), this.x, this.y);
		Draw.reset();
	},
	getLiquidDestination(source, liquid){
		if(this.efficiency() == 1){
			//LiquidJunction$LiquidJunctionBuild.getLiquidDestination(source, liquid);
			var liquid = this.liquids.current();
			var dir = source.relativeTo(this.tile.x, this.tile.y);
			dir = (dir + 4) % 4;
			var next = this.nearby(dir);
			try{
				if(next == null || (!next.acceptLiquid(this, liquid) && !(next instanceof LiquidJunction))){
					return this;
				}
				return next.getLiquidDestination(this, liquid);
			}
			catch(error){
				print(error);//acceptLiquid CANNOT be accessed by conveyors and results in an instant FUCK YOU CRASH HAHAHAHHAHAHAHAHAHAHA
			}
		}
		else{
			return this;
		}
    },
	updateTile(){
		if(this.cons.valid()){
			omniJunction.speed = Math.ceil(1 + (100 - (100 * this.efficiency())));
			this.super$updateTile();
			/* if(this.efficiency() == 1){
				try{
				this.getLiquidDestination(this, this.liquids.current());
				}
				catch(error){
					print(error);//Does not crash, but if there
					ohno = true;
				}
			} */
			this.cons.trigger();
		}
	}
});
omniJunction.baseSpeed = 1;
omniJunction.outputsLiquid = true;