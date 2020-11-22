
const cycloneCryoFrag = extend(BasicBulletType, {});
cycloneCryoFrag.damage = 8;
cycloneCryoFrag.width = 3;
cycloneCryoFrag.height = 6;
cycloneCryoFrag.lifetime = 45;
cycloneCryoFrag.drag = 0.015;
cycloneCryoFrag.pierce = true;
cycloneCryoFrag.despawnEffect = Fx.none;
cycloneCryoFrag.hitEffect = Fx.none;
cycloneCryoFrag.frontColor = Color.valueOf("#4496bb");
cycloneCryoFrag.backColor = Color.valueOf("#4499ee");
cycloneCryoFrag.bulletSprite = "diamond-ore-diamondbullet";
cycloneCryoFrag.status = StatusEffects.freezing;
const cycloneCryo = extend(FlakBulletType, {});
cycloneCryo.fragBullet = cycloneCryoFrag;
cycloneCryo.fragBullets = 6;
cycloneCryo.status = StatusEffects.freezing;
cycloneCryo.splashDamage = 15;
cycloneCryo.damage = 15;
cycloneCryo.speed = 4;
cycloneCryo.splashDamageRadius = 16;
cycloneCryo.bulletSprite = "diamond-ore-diamondshell";
const spectreCryo = extend(BasicBulletType, {});
spectreCryo.speed = 4;
spectreCryo.status = StatusEffects.freezing;
spectreCryo.splashDamage = 20;
spectreCryo.damage = 30;
spectreCryo.splashDamageRadius = 16;
spectreCryo.width = 12;
spectreCryo.height = 24;
spectreCryo.bulletSprite = "diamond-ore-diamondbullet";
spectreCryo.frontColor = Color.valueOf("#cceeff");
spectreCryo.backColor = Color.valueOf("#4499ee");
var hasErrord = false;
var erRord = "h";
var itmInd = 0;
print("Vars.content.items().size is " + Vars.content.items().size)
try{
	var cryogemItem = 0;
	for(var s = 0; s < Vars.content.items().size; s++){
		var itmType = Vars.content.items().get(s);
		print(itmType);
		if (itmType == "cryogem"){
			itmInd = s;
			cryogemItem = itmNm;
			break;
		}
	};
}
catch(h){
	hasErrord = true;
	erRord = h;
}
print(Vars.content.getByName(ContentType.item, itmInd));
if (itmInd == null) hasErrord == true;
if (hasErrord == true){
	throw new RuntimeError(erRord);
	
}
Blocks.cyclone.ammoTypes.put(cryogemItem,cycloneCryo);
Blocks.spectre.ammoTypes.put(cryogemItem,spectreCryo);
print("vanilla ammo script successful")