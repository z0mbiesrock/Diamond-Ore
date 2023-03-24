const SpoNavT2 = extendContent(UnitType, "serpent", {
});
SpoNavT2.constructor = () => extend(UnitWaterMove, {});
SpoNavT2.abilities.add(new ShieldRegenFieldAbility(10, 200, 60 * 10, 64));
//SpoNavT4.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SpoNavT2.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "diamond-ore-siren"), Vars.content.getByName(ContentType.unit, "diamond-ore-serpent")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
