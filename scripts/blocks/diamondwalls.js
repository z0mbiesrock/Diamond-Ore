const diamondWallSharded = Effect(20, e => {
	Draw.color(Color.valueOf("#effaff"), Color.valueOf("#a1cce9"), e.fin());
	var w = 1 + 12 * e.fout();
	Drawf.tri(e.x, e.y, w, 18 * e.fout(), e.rotation);
	Drawf.tri(e.x, e.y, w, 6 * e.fout(), e.rotation + 180);
    Lines.stroke(e.fout() * 1);
    const d = new Floatc2({get(x, y){
    Draw.color(Color.valueOf("#effaff"), Color.valueOf("#a1cce9"), Mathf.random());
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 5 + 1);
    }}) 
    Angles.randLenVectors(e.id, 5, 2 + 12 * e.fin(), e.rotation, 45,d);
});

const diamondWallShard = extend(BasicBulletType, {
});
diamondWallShard.damage = 15;
diamondWallShard.width = 6;
diamondWallShard.height = 14;
diamondWallShard.shrinkY = 0.3;
diamondWallShard.shrinkX = 0.5;
diamondWallShard.speed = 3;
diamondWallShard.lifetime = 45;
diamondWallShard.drag = 0.015;
diamondWallShard.pierce = true;
diamondWallShard.pierceCap = 4;
diamondWallShard.despawnEffect = Fx.none;
diamondWallShard.hitEffect = Fx.mine;
diamondWallShard.frontColor = Color.valueOf("#effaff");
diamondWallShard.hitColor = Color.valueOf("#4499ee");
diamondWallShard.backColor = Color.valueOf("#a1cce9");
diamondWallShard.sprite = "diamond-ore-diamondshard";

const diamondWall = extendContent(Wall, "diamond-wall", {});
diamondWall.buildType = () => extendContent(Wall.WallBuild, diamondWall, {
    //OVERRIDE
	onDestroyed(){
		this.super$onDestroyed();
        for(var i = 0; i < 8; i++){
			var shardAngle = Mathf.random(360);
			diamondWallSharded.at(this.x, this.y, shardAngle);
            diamondWallShard.create(this, this.team, this.x, this.y, shardAngle, Mathf.random(0.5, 1.0), 1);
		}
	},
});

const diamondWallLarge = extendContent(Wall, "large-diamond-wall", {});
diamondWallLarge.buildType = () => extendContent(Wall.WallBuild, diamondWallLarge, {
    //OVERRIDE
	onDestroyed(){
		this.super$onDestroyed();
        for(var i = 0; i < 12; i++){
			var shardAngle = Mathf.random(360);
			diamondWallSharded.at(this.x, this.y, shardAngle);
            diamondWallShard.create(this, this.team, this.x, this.y, shardAngle, Mathf.random(0.5, 1.25), 1);
		}
	},
});

const diamondWallHuge = extendContent(Wall, "huge-diamond-wall", {});
diamondWallHuge.buildType = () => extendContent(Wall.WallBuild, diamondWallHuge, {
    //OVERRIDE
	onDestroyed(){
		this.super$onDestroyed();
        for(var i = 0; i < 16; i++){
			var shardAngle = Mathf.random(360);
			diamondWallSharded.at(this.x, this.y, shardAngle);
            diamondWallShard.create(this, this.team, this.x, this.y, shardAngle, Mathf.random(0.5, 1.5), 1);
		}
	},
});

const diamondWallGigantic = extendContent(Wall, "gigantic-diamond-wall", {});
diamondWallGigantic.buildType = () => extendContent(Wall.WallBuild, diamondWallGigantic, {
    //OVERRIDE
	onDestroyed(){
		this.super$onDestroyed();
        for(var i = 0; i < 20; i++){
			var shardAngle = Mathf.random(360);
			diamondWallSharded.at(this.x, this.y, shardAngle);
            diamondWallShard.create(this, this.team, this.x, this.y, shardAngle, Mathf.random(0.5, 1.75), 1);
		}
	},
});