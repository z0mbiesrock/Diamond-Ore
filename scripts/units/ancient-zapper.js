//Script for Ancient Zapper and similar units
const ancientZapperMawArc = extend(BasicBulletType, {
	//OVERRIDE
	despawned(b){
		try{
		var shockLen = Math.floor(Mathf.random(11,29));
		Lightning.create(b.getTeam(), Color.valueOf("#decf5a"), Mathf.random(15,65), b.x, b.y, b.rot() + Mathf.random(-4,4), shockLen);
		}
		catch(fck){
			print(fck);
		}
	},
	range(){
		return 70
	}
	
});
ancientZapperMawArc.lifetime = 1;
ancientZapperMawArc.instantDisappear = true;
ancientZapperMawArc.despawnEffect = Fx.hitLancer;
ancientZapperMawArc.hitEffect = Fx.hitLancer;
const ancientZapperMawFx = newEffect(15, e => {
    Draw.color(Color.white, Color.valueOf("#decf5a"), Mathf.random(1));
    Lines.stroke(e.fout() * 3);
    const u = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 9 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 6, 1 + 18 * e.fin(), e.rotation, 80,u);
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 6, 1 + 24 * e.fin(), e.rotation, 120,d);
});
const ancientZapperMaw = extendContent(Weapon, "ancient-zapper-maw", {
});
ancientZapperMaw.width = 0;
ancientZapperMaw.length = 2;
ancientZapperMaw.recoil = -2;
ancientZapperMaw.reload = 20;
ancientZapperMaw.alternate = false;
ancientZapperMaw.inaccuracy = 10;
ancientZapperMaw.shootSound = Sounds.spark;
ancientZapperMaw.shootEffect = ancientZapperMawFx;
ancientZapperMaw.bullet = ancientZapperMawArc;
const ancientZapperDeathFx = newEffect(20, e => {
    Draw.color(Color.white, Color.valueOf("#decf5a"), Mathf.random(1));
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 15, 1 + 120 * e.fin(), e.rotation, 360, d);
    Lines.stroke(e.fout() * 2);
    const g = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 24 + 0.25);
    }}) 
    Angles.randLenVectors(e.id, 25, 1 + 120 * e.fin(), e.rotation, 360, g);
});

const ancientZapper = new JavaAdapter(UnitType, {}, "ancient-zapper",  prov(() => new JavaAdapter(GroundUnit, {
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-zapper-cell");
    },
	calculateDamage(amount){
		// Caps at 800 to prevent Yggdrasils from shooting one and causing it to nuke the area with lightning
		var dmgAmount = Math.min(800, this.super$calculateDamage(amount));
		if(dmgAmount > 15){
			var shockNum = 1 + Math.floor(dmgAmount / 35);
			for(var i = 0; i < shockNum; i++){
				var arcDmgBonus = 0
				var shockLen = Math.floor(Mathf.random(10,(25 + Math.floor(dmgAmount / 56.25))));
				if (dmgAmount > 75){
					var dmgPls = dmgAmount - 75;
					arcDmgBonus = Math.floor(dmgPls / 3.14159);
				}
				Lightning.create(this.getTeam(), Color.valueOf("#ffff00"), Mathf.random(20,(50 + arcDmgBonus)), this.x, this.y, Mathf.random(360), shockLen);
				Sounds.spark.at(this.x, this.y);
			}
				
		}
		return this.super$calculateDamage(amount);
	},
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.67);
		}
	},
    onDeath(){
        Sounds.explosionbig.at(this);
        for(var i = 0; i < 8; i++){
				var shockLen = Math.floor(Mathf.random(10,20));
				Lightning.create(this.getTeam(), Color.valueOf("#decf5a"), Mathf.random(10,25), this.x, this.y, Mathf.random(360), shockLen);
				Sounds.spark.at(this.x, this.y);
		}
        for(var j = 0; j < 5; j++){
            Calls.createBullet(Bullets.flakSurge, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.35, 2.7), Mathf.random(0.6, 1.1));
		}
		Effects.effect(ancientZapperDeathFx, this.x, this.y, Mathf.random(-360,360));
    this.super$onDeath();
    }
})));
ancientZapper.weapon = ancientZapperMaw;