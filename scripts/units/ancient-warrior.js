
const ancientWarriorShoot = newEffect(15, e => {
	Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
	var w = 1 + 7 * e.fout();
	Drawf.tri(e.x, e.y, w, 18 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, w, 6 * e.fout(), e.rotation + 180);
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#dce664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 2 + 12 * e.fin(), e.rotation, 45,d);
});
const ancientWarriorBulletDespawn = newEffect(14, e => {
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 20 * e.fin(), e.rotation, 45,d);
});
const ancientWarriorBulletHit = newEffect(19, e => {
    Lines.stroke(e.fout() * 1.523);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6);
    }}) 
    Angles.randLenVectors(e.id, 5, 13 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#aeff5a"), Color.valueOf("#9cb664"), Mathf.random());
    Lines.stroke(e.fout() * 1.75);
    Lines.circle(e.x, e.y, e.fin() * 9);
});
const ancientWarriorBullet = extend(BasicBulletType, {
});
ancientWarriorBullet.speed = 8;
ancientWarriorBullet.lifetime = 25;
ancientWarriorBullet.bulletWidth = 3;
ancientWarriorBullet.bulletHeight = 7;
ancientWarriorBullet.frontColor = Color.valueOf("#deef5a");
ancientWarriorBullet.backColor = Color.valueOf("#ddff00");
ancientWarriorBullet.damage = 17;
ancientWarriorBullet.despawnEffect = ancientWarriorBulletDespawn;
ancientWarriorBullet.hitEffect = ancientWarriorBulletHit;
ancientWarriorBullet.shootEffect = ancientWarriorShoot;
ancientWarriorBullet.smokeEffect = Fx.none;
const ancientWarriorWeapon = extendContent(Weapon, "ancient-warrior-equip", {
	load(){
		this.region = Core.atlas.find("diamond-ore-ancient-warrior-equip");
	}
});
ancientWarriorWeapon.width = 8.2;
ancientWarriorWeapon.length = 6.5;
ancientWarriorWeapon.recoil = 0;
ancientWarriorWeapon.reload = 48;
ancientWarriorWeapon.shotDelay = 4;
ancientWarriorWeapon.shots = 6;
ancientWarriorWeapon.targetDistance = 150;
ancientWarriorWeapon.minPlayerDist = 9;
ancientWarriorWeapon.inaccuracy = 4;
ancientWarriorWeapon.spacing = 0;
ancientWarriorWeapon.shootCone = 100;
ancientWarriorWeapon.alternate = true;
ancientWarriorWeapon.ignoreRotation = true;
ancientWarriorWeapon.bullet = ancientWarriorBullet;
ancientWarriorWeapon.shootSound = Sounds.missile;
ancientWarriorWeapon.shootEffect = ancientWarriorShoot;
const ancientWarrior = new JavaAdapter(UnitType, {}, "ancient-warrior",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-warrior-cell");
    },
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 1.00);
		}
    },
})));
ancientWarrior.weapon = ancientWarriorWeapon;
const ancientWarriorFactorySpawn = newEffect(12, e => {
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