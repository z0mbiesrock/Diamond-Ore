
const ancientWidowMineBurrowSmoke = newEffect(32, e => {
	Draw.alpha(e.fout());
    var floorGet = Vars.world.tileWorld(e.x, e.y);
	Draw.color(floorGet.floor().color);
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 4);
    }}) 
    Angles.randLenVectors(e.id, 2, 1 + Math.sqrt(e.fin() * 128), e.rotation, 360, d);
    const g = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 3);
    }}) 
    Angles.randLenVectors(e.id, 3, 1 + Math.sqrt(e.fin() * 256), e.rotation, 360, g);
    const s = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    }}) 
    Angles.randLenVectors(e.id, 4, 1 + Math.sqrt(e.fin() * 384), e.rotation, 360, s);
});
const ancientWidowMineBurrowFx = newEffect(15, e => {
	for(var i = 0; i < 4; i++){
		Draw.color(Color.valueOf("#decf5a"), Color.valueOf("#eeee22"), e.fin());
		var w = 1 + 5 * e.fout();
		Drawf.tri(e.x, e.y, w, 15 * e.fout(), e.rotation + 45 + (90 * i));
		Drawf.tri(e.x, e.y, w, 3 * e.fout(), e.rotation + 225 + (90 * i));
	}
});
const ancientWidowMineExplodeFx = newEffect(20, e => {
    Draw.color(Color.valueOf("#ffff66"), Color.valueOf("#999900"), e.fin());
    Lines.stroke(e.fout() * 6);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }}) 
    Angles.randLenVectors(e.id, 15, 30 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 15, 60 * e.fin(), e.rotation, 360,d);
    Angles.randLenVectors(e.id, 15, 90 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.white, Color.valueOf("#999900"), e.fin());
    Lines.circle(e.x, e.y, e.fin() * 45);
});
const ancientWidowMineExplodeBullet = extend(BasicBulletType, {
	//OVERRIDE
	range(){
		return 0
	},
	despawned(b){
		try{
		for(var k = 0; k < 5; k++){
		var shockLen = Math.floor(Mathf.random(5,15));
		Lightning.create(b.getTeam(), Color.valueOf("#decf5a"), Mathf.random(15,45), this.x, this.y, Mathf.random(360), shockLen);
		}
		for(var j = 0; j < 15; j++){
			Calls.createBullet(Bullets.flakSurge, b.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.35, 1.9), Mathf.random(0.6, 1.1));
		}
		this.remove();
		}
		catch(fck){
			print(fck);
		}
	},
	
});
ancientWidowMineExplodeBullet.lifetime = 1;
ancientWidowMineExplodeBullet.instantDisappear = true;
ancientWidowMineExplodeBullet.killShooter = true;
ancientWidowMineExplodeBullet.despawnEffect = Fx.hitLancer;
ancientWidowMineExplodeBullet.hitEffect = Fx.hitLancer;
const ancientWidowMineWeapon = extendContent(Weapon, "ancient-widowmine-equip", {
	load(){
		this.region = Core.atlas.find("clear");
	}
});
ancientWidowMineWeapon.width = 0;
ancientWidowMineWeapon.length = 3;
ancientWidowMineWeapon.recoil = 0;
ancientWidowMineWeapon.reload = 30;
ancientWidowMineWeapon.alternate = true;
ancientWidowMineWeapon.bullet = ancientWidowMineExplodeBullet;
ancientWidowMineWeapon.shootSound = Sounds.explosionbig;
ancientWidowMineWeapon.shootEffect = ancientWidowMineExplodeFx;
const burrowedStatus = new StatusEffect("ancientWidowMineBurrowed");
burrowedStatus.speedMultiplier = 0;
burrowedStatus.armorMultiplier = 15;
burrowedStatus.damageMultiplier = 1;
const ancientWidowMine = new JavaAdapter(UnitType, {}, "ancient-widowmine",  prov(() => new JavaAdapter(GroundUnit, {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find(this.name + "-base");
		this.legRegion = Core.atlas.find(this.name + "-leg");
	},
	getPowerCellRegion(){
        return Core.atlas.find("diamond-ore-ancient-widowmine-cell");
    },
	draw(){	
		if (this.hasEffect(burrowedStatus)){
			Draw.rect(this.type.region, this.x, this.y, this.rotation - 90);
		}
		else {
			this.super$draw();
		}
    },
    collides(other){
		if (this.hasEffect(burrowedStatus)){
			if(this.isDead()) return false;
			if(other instanceof Unit){
				if (other.getTeam() != this.getTeam()){
						this.detonate();
				}
			}
		}
		else{
			this.super$collides(other);
		}
    },
	detonate(){
		Sounds.explosionbig.at(this.x, this.y);
		Sounds.spark.at(this.x, this.y);
		for(var k = 0; k < 5; k++){
		var shockLen = Math.floor(Mathf.random(5,15));
		Lightning.create(this.getTeam(), Color.valueOf("#decf5a"), Mathf.random(15,45), this.x, this.y, Mathf.random(360), shockLen);
		}
		for(var j = 0; j < 15; j++){
			Calls.createBullet(Bullets.flakSurge, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.35, 1.9), Mathf.random(0.6, 1.1));
		}
		Effects.effect(ancientWidowMineExplodeFx, this.x, this.y, Mathf.random(-360,360));
		this.remove();
    },
	update(){
		var burrowChance = 0;
		var burrowed = false;
		var lastx = this.x;
		var lasty = this.y;
		var lastrot = this.rotation;
		this.super$update();
		if (burrowed == true || this.hasEffect(burrowedStatus)){
			this.legRegion = Core.atlas.find("clear");
			this.velocity().set(0,0);
			burrowed = true;
			this.applyEffect(burrowedStatus, 1337);
			this.x = lastx;
			this.y = lasty;
			this.rotation = lastrot;
		}
		else {
		lastx = this.x;
		lasty = this.y;
		lastrot = this.rotation;
		}
		var nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 512);
		if (nearestfoe != null){
			//var vel = Vec2(this.x, this.y);
			var getFloor = Vars.world.tileWorld(this.x, this.y);
			if (nearestfoe.dst(this) < 256 && !(getFloor.floor().isLiquid) && !(this.hasEffect(StatusEffects.wet))){
				if (burrowed == false){
					if (Mathf.chance(0.5)){
						burrowChance += Mathf.random(0.00125,0.00375);
					}				
					if (Mathf.chance(burrowChance)){
						Sounds.click.at(this.x, this.y);
						this.velocity().set(0,0);
						burrowed = true;
						this.engineSize = 0;
						Effects.effect(ancientWidowMineBurrowFx, this.x, this.y, Mathf.random(-360,360));
						Effects.effect(ancientWidowMineBurrowSmoke, this.x, this.y, Mathf.random(-360,360));
						this.applyEffect(burrowedStatus, 1337);				
					}
					else{
					this.velocity().add(Mathf.random(-0.125,0.125),Mathf.random(-0.125,0.125));
					}
				}
				else if (nearestfoe.dst(this) < 7){
					this.detonate();
				}
			}
			else if (burrowed == false) {
				if (Mathf.chance(0.125)){
				var burrowChanceDec = burrowChance - 0.0025;
				burrowChance = Math.max(0,burrowChanceDec);
				}
			}
		}
		if (this.state.is(this.retreat) && burrowed == false){
			this.velocity().add(Mathf.random(-0.125,0.125),Mathf.random(-0.125,0.125));
		}
	},
	//OVERRIDE, clear it
	drawBackItems(itemtime, number){
	},
    onDeath(){
		for(var j = 0; j < 3; j++){
			Calls.createBullet(Bullets.flakSurge, this.getTeam(), this.x, this.y, Mathf.random(360), Mathf.random(0.35, 1.3), Mathf.random(0.6, 1.1));
		}
		this.super$onDeath();
    }
})));
ancientWidowMine.weapon = ancientWidowMineWeapon;