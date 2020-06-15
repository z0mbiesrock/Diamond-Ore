
const ancientPawnShoot = newEffect(15, e => {
		Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
		var w = 1 + 2 * e.fout();
		Drawf.tri(e.x, e.y, w, 9 * e.fout(), e.rotation);
		Drawf.tri(e.x, e.y, w, 3 * e.fout(), e.rotation + 180);
});
const ancientPawnBulletDespawn = newEffect(12, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 0.5);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3 + 1);
    }}) 
    Angles.randLenVectors(e.id, 4, 8 * e.fin(), e.rotation, 45,d);
});
const ancientPawnBulletHit = newEffect(12, e => {
    Lines.stroke(e.fout() * 0.5);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 2 + 1);
    }}) 
    Angles.randLenVectors(e.id, 4, 6 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 0.75);
    Lines.circle(e.x, e.y, e.fin() * 4);
});
const ancientPawnBullet = extend(BasicBulletType, {
});
ancientPawnBullet.speed = 6;
ancientPawnBullet.lifetime = 25;
ancientPawnBullet.damage = 6;
ancientPawnBullet.bulletWidth = 1;
ancientPawnBullet.bulletHeight = 2;
ancientPawnBullet.backColor = Color.valueOf("#decf5a");
ancientPawnBullet.frontColor = Color.valueOf("#ddff00");
ancientPawnBullet.despawnEffect = ancientPawnBulletDespawn;
ancientPawnBullet.hitEffect = ancientPawnBulletHit;
ancientPawnBullet.shootEffect = ancientPawnShoot;
ancientPawnBullet.smokeEffect = Fx.none;
const ancientPawnWeapon = extendContent(Weapon, "ancient-pawn-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-pawn-equip");
	}
});
ancientPawnWeapon.width = 2.6;
ancientPawnWeapon.length = 1.3;
ancientPawnWeapon.recoil = 0;
ancientPawnWeapon.reload = 15;
ancientPawnWeapon.targetDistance = 150;
ancientPawnWeapon.minPlayerDist = 2;
ancientPawnWeapon.inaccuracy = 1;
ancientPawnWeapon.shootCone = 100;
ancientPawnWeapon.alternate = true;
ancientPawnWeapon.ignoreRotation = true;
ancientPawnWeapon.bullet = ancientPawnBullet;
ancientPawnWeapon.shootSound = Sounds.place;
ancientPawnWeapon.shootEffect = ancientPawnShoot;
const ancientPawn = new JavaAdapter(UnitType, {}, "ancient-pawn",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-pawn-cell");
    },
	update(){
		this.super$update();
		try{ // Put in a "try"; Try to dodge enemies
			var nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 250);
			if (nearestfoe != null){
				var vel = Vec2(this.x, this.y);
				if (nearestfoe.dst(this) < 200 && Mathf.chance(0.2)){
					this.velocity().add(Mathf.random(-0.4,0.4), Mathf.random(-0.4,0.4));
				}
				this.avoidOthers();	
			}
		}
		catch(error){
			//print(error);
		}
    },
})));
ancientPawn.weapon = ancientPawnWeapon;
const ancientPawnFactorySpawn = newEffect(12, e => {
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