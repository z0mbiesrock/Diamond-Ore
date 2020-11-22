const multiMelter = extendContent(GenericCrafter, "multimelter", {
  load(){
    this.super$load();
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
  },
	setStats(){
    this.super$setStats();
    
    this.stats.add(Stat.boostEffect, this.boostBonus, StatUnit.seconds)
	}
});
multiMelter.boostTime = 60;
multiMelter.craftTime = 180;
multiMelter.craftEffect = Fx.hitMeltdown;
multiMelter.updateEffect = Fx.none;
multiMelter.updateEffectChance = 0;
multiMelter.outputLiquid = new LiquidStack(Liquids.slag, 45);

multiMelter.buildType = () => {
	return extendContent(GenericCrafter.GenericCrafterBuild, multiMelter, {
    setEff(){
      this._trueCraftTime;
    },
    updateTile(){
      if(this.cons.optionalValid() && multiMelter.boostCraft != null){
        this._trueCraftTime = multiMelter.boostCraft;
      }
      else{
        this._trueCraftTime = multiMelter.craftTime;
      }
      
      if(this.consValid()){
        this.progress += this.getProgressIncrease(this._trueCraftTime);
        this.totalProgress += Time.delta();
        this.warmup = Mathf.lerpDelta(this.warmup, 1f, 0.02f);

        if(Mathf.chanceDelta(multiMelter.updateEffectChance)){
          multiMelter.updateEffect.at(this.x + Mathf.range(this.size * 4f), this.y + Mathf.range(this.size * 4));
        }
      }else{
        this.warmup = Mathf.lerp(this.warmup, 0f, 0.02f);
      }

      if(this.progress >= 1f){
        this.consume();

        if(multiMelter.outputItem != null){
          for(int i = 0; i < multiMelter.outputItem.amount; i++){
            this.offload(multiMelter.outputItem.item);
          }
        }

        if(multiMelter.outputLiquid != null){
          this.handleLiquid(this, multiMelter.outputLiquid.liquid, multiMelter.outputLiquid.amount);
        }

        multiMelter.craftEffect.at(x, y);
        this.progress = 0f;
      }

      if(multiMelter.outputItem != null && this.timer.get(this.timerDump, this.dumpTime)){
        this.dump(multiMelter.outputItem.item);
      }

      if(multiMelter.outputLiquid != null){
        this.dumpLiquid(multiMelter.outputLiquid.liquid);
      }
    },
    draw(){
      this.super$draw();
      Draw.rect(multiMelter.region, tile.drawx(), tile.drawy());
      Draw.color(multiMelter.outputLiquid.liquid.color);
      Draw.alpha(tile.entity.liquids.get(multiMelter.outputLiquid.liquid) / multiMelter.liquidCapacity);
      Draw.rect(multiMelter.liquidRegion, tile.drawx(), tile.drawy());
      Draw.reset()
    }
	});
}