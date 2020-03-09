//require("effects")
const thorTurret = extendContent(DoubleTurret, "thor", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-thor-icon")
		];
	},
});
const odinTurret = extendContent(BurstTurret, "odin", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-odin-icon")
		];
	},
});
const lokiTurret = extendContent(ItemTurret, "loki", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-loki-icon")
		];
	},
});

const yggdrasilCharge = newEffect(40, e => {
    Draw.color(Color.white, Color.yellow, e.fin());
    Lines.stroke(e.fin() * 4);
    Lines.circle(e.x, e.y, e.fout() * 20);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 8, 1 + 120 * e.fout(), e.rotation, 45,d);
});
const yggdrasilShoot = newEffect(30, e => {
    Draw.color(Color.gold, Color.white, e.fin());
    Lines.stroke(e.fout() * 7);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 32, 1 + 140 * e.fin(), e.rotation, 20,d);
    Draw.color(Color.yellow, Color.white, e.fin());
    Lines.stroke(e.fout() * 9);
    Angles.randLenVectors(e.id, 32, 1 + 170 * e.fin(), e.rotation, 30,d);
    Draw.color(Color.goldenrod, Color.valueOf("#555555"), e.fin());
    Lines.stroke(e.fout() * 11);
    Angles.randLenVectors(e.id, 32, 1 + 200 * e.fin(), e.rotation, 40,d);
    Draw.color(Color.white, Color.white, e.fin());
    Lines.circle(e.x, e.y, e.fin() * 80);
});
const yggdrasilTurret = extendContent(ChargeTurret, "yggdrasil", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-yggdrasil-icon-base"),
			Core.atlas.find("diamond-ore-yggdrasil-icon")
		];
	},
});
yggdrasilTurret.chargeEffect = yggdrasilCharge;
yggdrasilTurret.shootEffect = yggdrasilShoot;
//yggdrasilTurret.shootSound = Sounds.yggdrasilfire;