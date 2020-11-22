const SpoNavT4 = extendContent(UnitType, "leviathan", {
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.heal(Time.delta() * 0.8);
		}
	},	
});
SpoNavT4.constructor = () => extend(UnitWaterMove, {});
//SpoNavT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SpoNavT4.ammoType = AmmoTypes.powerHigh;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-scylla"), Vars.content.getByName(ContentType.unit, "diamond-ore-charybdis")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
