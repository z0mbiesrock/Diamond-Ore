const renidaeController = prov(() => {
  var reAI = extend(GroundAI, {
    setEffectsC(){
      this._damagedFound = false;
    },
    updateMovement(){
      if(this._damagedFound && this.target != null){
        var shoot = false;
        
        if(this.unit.inRange(this.target)){
          this.unit.aim(this.target);
          shoot = true;
        }
        
        this.unit.controlWeapons(shoot);
      }else if(!this._damagedFound){
        this.super$updateMovement();
      }
    },
    updateTargeting(){
      if(this.timer.get(this.timerTarget2, 40)){
      var target = Units.findDamagedTile(this.unit.team, this.unit.x, this.unit.y);
        if(target != null){
          if(target instanceof ConstructBlock.ConstructBuild || !this.unit.inRange(target)){
            this._damagedFound = false;
          }else if(this.unit.inRange(target)){
            this.target = target;
            this._damagedFound = true;
          }
        }else{
          this._damagedFound = false;
        }
      }
      
      if(!this._damagedFound){
        this.super$updateTargeting();
      }
    }
  });
  reAI.setEffectsC();
  
  return reAI;
});

const SpoNavT5 = extendContent(UnitType, "leviathan", {});
SuNavT2.constructor = () => extend(UnitWaterMove, {});
SuNavT2.defaultController = renidaeController;
SuNavT2.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 45, 0, -12));
SuNavT2.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SuNavT2.ammoType = AmmoTypes.powerLow;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-rana"), Vars.content.getByName(ContentType.unit, "purple-air-renidae")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
