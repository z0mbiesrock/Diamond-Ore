const multiMelter = extendContent(GenericCrafter, "multimelter", {
    //OVERRIDE This is supposed to allow using an additional item to speed up the crafting, but is broken as H
	/* setStats: function(tile){
        this.super$setStats(tile);
		boostBonus = boostTime / -60;
		if(boostBonus < 0){
		this.boostCraft = this.craftTime - this.boostTime;
		this.noboostCraft = this.craftTime;
		stats.add(BlockStat.boostEffect, boostBonus, StatUnit.seconds);
		}
	},
	
    //OVERRIDE
	update: function(tile){
		
		if(tile.entity.cons.optionalValid() && this.boostCraft != null){
            craftTime = this.boostCraft;
        }
		else{
			craftTime = this.noboostCraft;
		}
		
        this.super$update(tile);
	}, */
	
    //OVERRIDE
	draw: function(tile){
        //this.super$draw(tile);
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid"), tile.drawx(), tile.drawy());
		Draw.reset()
	}
});
multiMelter.timerUse = multiMelter.timers++;
multiMelter.boostTime = 60;