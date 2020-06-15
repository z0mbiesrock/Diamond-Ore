
const ancientGruntShoot = newEffect(15, e => {
		Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
		var w = 1 + 4 * e.fout();
		Drawf.tri(e.x, e.y, w, 18 * e.fout(), e.rotation);
		Drawf.tri(e.x, e.y, w, 6 * e.fout(), e.rotation + 180);
});
const ancientGruntBulletDespawn = newEffect(16, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 12 * e.fin(), e.rotation, 45,d);
});
const ancientGruntBulletHit = newEffect(15, e => {
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 9 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1.25);
    Lines.circle(e.x, e.y, e.fin() * 7);
});
const ancientGruntBullet = extend(BasicBulletType, {
});
ancientGruntBullet.speed = 9;
ancientGruntBullet.lifetime = 40;
ancientGruntBullet.bulletWidth = 2;
ancientGruntBullet.bulletHeight = 4;
ancientGruntBullet.frontColor = Color.valueOf("#deef5a");
ancientGruntBullet.backColor = Color.valueOf("#ddff00");
ancientGruntBullet.damage = 12;
ancientGruntBullet.despawnEffect = ancientGruntBulletDespawn;
ancientGruntBullet.hitEffect = ancientGruntBulletHit;
ancientGruntBullet.shootEffect = ancientGruntShoot;
ancientGruntBullet.smokeEffect = Fx.none;
const ancientGruntWeapon = extendContent(Weapon, "ancient-grunt-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-grunt-equip");
	}
});
ancientGruntWeapon.width = 6.3;
ancientGruntWeapon.length = 3;
ancientGruntWeapon.recoil = 0;
ancientGruntWeapon.reload = 30;
ancientGruntWeapon.shotDelay = 6;
ancientGruntWeapon.shots = 3;
ancientGruntWeapon.targetDistance = 150;
ancientGruntWeapon.minPlayerDist = 6;
ancientGruntWeapon.inaccuracy = 2;
ancientGruntWeapon.spacing = 0;
ancientGruntWeapon.shootCone = 100;
ancientGruntWeapon.alternate = true;
ancientGruntWeapon.ignoreRotation = true;
ancientGruntWeapon.bullet = ancientGruntBullet;
ancientGruntWeapon.shootSound = Sounds.missile;
ancientGruntWeapon.shootEffect = ancientGruntShoot;
const ancientGrunt = new JavaAdapter(UnitType, {}, "ancient-grunt",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-grunt-cell");
    },
	update(){
		this.super$update();
		try{ // Put in a "try"; Try to dodge enemies
			var nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 250);
			if (nearestfoe != null){
				var vel = Vec2(this.x, this.y);
				if (nearestfoe.dst(this) < 200 && Mathf.chance(0.109)){
					this.velocity().add(Mathf.random(-0.5,0.5), Mathf.random(-0.5,0.5));
				}
				this.avoidOthers();	
			}
		}
		catch(error){
			//print(error);
		}
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * Mathf.random(0.4,0.8));
		}
    },
})));
ancientGrunt.weapon = ancientGruntWeapon;
const ancientGruntFactorySpawn = newEffect(12, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1.1);
    Lines.circle(e.x + x, e.y + y, e.fin() * 12);
    Lines.stroke(e.fout() * 0.5);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 4);
    }}) 
    Angles.randLenVectors(e.id, 9, 16 * e.fin(), e.rotation, 45,d);
});