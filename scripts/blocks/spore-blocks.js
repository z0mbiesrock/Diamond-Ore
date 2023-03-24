const slowerregen = 1 / 55;
const slowregen = 1 / 45;
const normalregen = 1 / 35;
const fastregen = 1 / 25;
const sporeBlockDeathTrail = Effect(45, e => {
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 8 - Math.abs(8 - (e.fin() * 16)), d);
});
const sporeBlockDeathHit = Effect(30, e => {
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    const f = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 - e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 9, d);
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 9, f);
});
const sporeBlockDeathFx = Effect(80, e => {
	var alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 16, d);
});


const sporeBlockDeath = extend(ArtilleryBulletType, {});

sporeBlockDeath.speed = 1.5;
//this does 800 damage per 5 ticks btw.
sporeBlockDeath.damage = 3;
sporeBlockDeath.splashDamage = 3;
sporeBlockDeath.splashDamageRadius = 5;
sporeBlockDeath.width = 4;
sporeBlockDeath.height = 5;
sporeBlockDeath.shrinkY = 0;
sporeBlockDeath.hitShake = 0;
sporeBlockDeath.lifetime = 80;
sporeBlockDeath.collidesTiles = true;
sporeBlockDeath.collides = true;
sporeBlockDeath.collidesAir = true;
sporeBlockDeath.trailEffect = sporeBlockDeathTrail;
sporeBlockDeath.hitEffect = sporeBlockDeathHit;
sporeBlockDeath.hitSound = Sounds.none;
sporeBlockDeath.despawnEffect = Fx.wet;
sporeBlockDeath.hitSize = 5;
sporeBlockDeath.pierce = true;
sporeBlockDeath.homingPower= 12;
sporeBlockDeath.homingRange= 16;
sporeBlockDeath.bulletSprite = "shell";
sporeBlockDeath.frontColor = Color.valueOf("#42336f");
sporeBlockDeath.backColor = Color.valueOf("#6d54b7");
//print("testing 123");

const darkSporeBlock = extendContent(Wall, "dark-spore-block", {
});
darkSporeBlock.buildType = () => extendContent(Wall.WallBuild, darkSporeBlock, {
    updateTile(){
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(slowerregen)) ) {
                   this.heal(10);
		}
	},
});
const darkSporeBlockLarge = extendContent(Wall, "dark-spore-block-large", {
});
darkSporeBlockLarge.buildType = () => extendContent(Wall.WallBuild, darkSporeBlockLarge, {
    updateTile(){
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(slowerregen)) ) {
                   this.heal(10);
		}
	},
});
const sporeCluster = extendContent(Cultivator, "sporecluster", {
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
sporeCluster.buildType = () => extendContent(Cultivator.CultivatorBuild, sporeCluster, {
	//OVERRIDE
	draw(){
		var podnum = Mathf.round(Mathf.randomSeed(this.id, 1, 4));
		var podrot = Mathf.round(Mathf.randomSeed(this.id, -15, 15));
		Draw.rect(Core.atlas.find(sporeCluster.name + podnum), this.x, this.y, podrot);
        Draw.reset();
	},
	//OVERRIDE
	drawTeam(){
	},
	//OVERRIDE
    updateTile(){
        
		/* 
		// SoyjakException: setTeam is PRIVATE XDDDDDDDD
		if ( Vars.state.rules.isCampaign() && this.team == Team.derelict ) {
                   this.team = Team.crux;
		} */
        this.super$updateTile();
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(normalregen)) ) {
                   this.heal(15);
		}
	},
	onDestroyed: function(){
        this.super$onDestroyed();
        for(var i = 0; i < 10; i++){
            sporeBlockDeath.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			sporeBlockDeathFx.at(this.x, this.y, Mathf.random(-360,360));
		}
	}
	
});
const sporeTurretA = extendContent(ItemTurret, "spore-turret", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
		this.super$drawBase(tile);
	},
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
sporeTurretA.buildType = () => extendContent(ItemTurret.ItemTurretBuild, sporeTurretA, {
	draw(){
		Draw.rect(Core.atlas.find(this.name + "-base"), this.x, this.y);
        Draw.color();
	},	
});
const sporeTurretB = extendContent(ItemTurret, "spore-turret-b", {
	drawBase(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
		this.super$drawBase(tile);
	},
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
sporeTurretB.buildType = () => extendContent(ItemTurret.ItemTurretBuild, sporeTurretB, {
	draw(){
		Draw.rect(Core.atlas.find(this.name + "-base"), this.x, this.y);
        Draw.color();
	},
	
});
const sporeTurretC = extendContent(ItemTurret, "spore-turret-c", {
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
sporeTurretC.buildType = () => extendContent(ItemTurret.ItemTurretBuild, sporeTurretC, {
	draw(){
		Draw.rect(Core.atlas.find(this.name + "-base"), this.x, this.y);
        Draw.color();
	},
	
});
/* extendContent(Floor, "spore-water", {
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(Floor, "spore-water-deep", {
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
}); */
const sporeTurretSmlA = extendContent(ItemTurret, "spore-turret-small", {
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
sporeTurretSmlA.buildType = () => extendContent(ItemTurret.ItemTurretBuild, sporeTurretSmlA, {
	draw(){
		Draw.rect(Core.atlas.find(this.name + "-base"), this.x, this.y);
        Draw.color();
	},
    updateTile(){
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(fastregen)) ){

                   this.heal(8);
				   /* if (this.health > this.maxHealth){
					   this.health -= this.maxHealth - this.health;
				   } */ // unknown if this works
					   
                   
        };
        this.super$updateTile();
     },
	
});
const sporeTurretSmlB = extendContent(ItemTurret, "spore-turret-small-dark", {
    icons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
});
sporeTurretSmlB.buildType = () => extendContent(ItemTurret.ItemTurretBuild, sporeTurretSmlB, {
	draw(){
		Draw.rect(Core.atlas.find(this.name + "-base"), this.x, this.y);
        Draw.color();
	},
    updateTile(){
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(fastregen)) ){
        };
        this.super$updateTile();
	},
	onDestroyed: function(){
		this.super$onDestroyed();
        for(var i = 0; i < 7; i++){
            sporeBlockDeath.create(null, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
			Effect.create(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
	
});

const sporeConveyor = extendContent(Conveyor, "spore-conveyor", {
    icons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name + "-0-1")
        ];
    }
});
sporeConveyor.buildType = () => extendContent(Conveyor.ConveyorBuild, sporeConveyor, {
    draw(){
		Draw.rect(Core.atlas.find(sporeConveyor.name+"-base"), this.x, this.y);
        this.super$draw();
    },
    updateTile(){
        this.super$updateTile();
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(normalregen)) ) {
                   this.heal(15);
        }
    },
	onDestroyed: function(){
		this.super$onDestroyed();
        for(var i = 0; i < 7; i++){
            sporeBlockDeath.create(null, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
			Effect.create(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
const sporeUnitBirth = Effect(72, e => {
    Draw.color(Color.valueOf("#455085"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }});
    Lines.stroke(e.fout() * 5);
    Angles.randLenVectors(e.id, 12, 1 + 18 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#455085"), Color.valueOf("#995d9a"), e.fout());
    Lines.stroke(e.fout() * 12);
    Lines.circle(e.x, e.y, e.fin() * 16);
    const f = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 - e.rotation);
    }});
    Draw.color(Color.valueOf("#8d69db"), Color.valueOf("#995d9a"), Mathf.random(-1,1));
    Angles.randLenVectors(e.id, 36, 1 + 24 * e.fin(), e.rotation, 360,f);
});
const mutatorUpdate = Effect(45, e => {
	Draw.color(Color.valueOf("#9f81db"), Color.valueOf("#008fc4"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.random(1,2));
    }})
    Angles.randLenVectors(e.id, 3, -6 + e.fin() * 12, d);
});
const sporeMutator = extendContent(AttributeSmelter, "mutator", {
	load(){
		this.super$load();
	},
    icons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-input0"),
            Core.atlas.find(this.name + "-top"),
        ];
    }
});
sporeMutator.buildType = () => extendContent(AttributeSmelter.AttributeSmelterBuild, sporeMutator, {
	/* draw(){
		if (this.initiate != true){
			this.initiate = true;
			this.variant = Math.ceil(Math.random(0,4));
			this.angle1 = Math.floor(Math.random(0,4));
			this.rot1 = 90 * this.angle1;
			this.angle2 = Math.floor(Math.random(0,4));
			this.rot2 = 90 * this.angle2;
		}
		else{
			if (Math.random < 0.03){
				this.variant = Math.ceil(Math.random(0,4));
			}
			if (Math.random < 0.05){
				this.angle1 = Math.floor(Math.random(0,4));
				this.rot1 = 90 * this.angle1;
			}
			if (Math.random < 0.05){
				this.angle2 = Math.floor(Math.random(0,4));
				this.rot2 = 90 * this.angle2;
			}
		}
		Draw.rect(this.region, this.x, this.y);
		Draw.alpha((this.items.total() - this.items.get(this.outputItem.item)) / this.itemCapacity);
		Draw.rect(Core.atlas.find(sporeMutator.name + "-input" + this.variant), this.x, this.y, this.rot1);
		Draw.alpha(this.items.get(this.outputItem.item) / this.itemCapacity);
		Draw.rect(Core.atlas.find(sporeMutator.name + "-output" + this.variant), this.x, this.y, this.rot2);
		Draw.alpha((this.liquids.get(this.liquids.current()) / this.liquidCapacity) * this.warmup);
		Draw.rect(Core.atlas.find(sporeMutator.name + "-top"), this.x, this.y);
		Draw.reset();
	}, */
    updateTile(){
        //when health is lower than max health
        if ( (this.healthf() < 1) && (Mathf.chance(fastregen)) ){

                   this.heal(8);
				   /* if (this.health > this.maxHealth){
					   this.health -= this.maxHealth - this.health;
				   } */ // unknown if this works
					   
                   
        };
        this.super$updateTile();
     },
	
});
sporeMutator.updateEffect = mutatorUpdate;
sporeMutator.angle1 = 0;
sporeMutator.angle2 = 0;
sporeMutator.rot1 = 0;
sporeMutator.rot2 = 0;
sporeMutator.variant = 0;
sporeMutator.initiate = false;

const sporeVaultDeathSmall = extend(ArtilleryBulletType, {});

sporeVaultDeathSmall.speed = 12;
//this does 800 damage per 5 ticks btw.
sporeVaultDeathSmall.damage = 45;
sporeVaultDeathSmall.splashDamage = 200;
sporeVaultDeathSmall.splashDamageRadius = 60;
sporeVaultDeathSmall.width = 4;
sporeVaultDeathSmall.height = 5;
sporeVaultDeathSmall.shrinkY = 0;
sporeVaultDeathSmall.hitShake = 0;
sporeVaultDeathSmall.lifetime = 40;
sporeVaultDeathSmall.collidesTiles = true;
sporeVaultDeathSmall.collides = true;
sporeVaultDeathSmall.collidesAir = true;
sporeVaultDeathSmall.trailEffect = sporeBlockDeathTrail;
sporeVaultDeathSmall.hitEffect = sporeBlockDeathHit;
sporeVaultDeathSmall.hitSound = Sounds.none;
sporeVaultDeathSmall.despawnEffect = Fx.wet;
sporeVaultDeathSmall.hitSize = 5;
sporeVaultDeathSmall.pierce = true;
sporeVaultDeathSmall.homingPower= 12;
sporeVaultDeathSmall.homingRange= 16;
sporeVaultDeathSmall.bulletSprite = "shell";
sporeVaultDeathSmall.frontColor = Color.valueOf("#42336f");
sporeVaultDeathSmall.backColor = Color.valueOf("#6d54b7");

const sporeVaultDeathLarge = extend(ArtilleryBulletType, {});

sporeVaultDeathLarge.speed = 10;
//this does 800 damage per 5 ticks btw.
sporeVaultDeathLarge.damage = 125;
sporeVaultDeathLarge.splashDamage = 800;
sporeVaultDeathLarge.splashDamageRadius = 120;
sporeVaultDeathLarge.width = 10;
sporeVaultDeathLarge.height = 15;
sporeVaultDeathLarge.shrinkY = 0;
sporeVaultDeathLarge.hitShake = 0;
sporeVaultDeathLarge.lifetime = 50;
sporeVaultDeathLarge.collidesTiles = true;
sporeVaultDeathLarge.collides = true;
sporeVaultDeathLarge.collidesAir = true;
sporeVaultDeathLarge.trailEffect = sporeBlockDeathTrail;
sporeVaultDeathLarge.hitEffect = sporeBlockDeathHit;
sporeVaultDeathLarge.hitSound = Sounds.none;
sporeVaultDeathLarge.despawnEffect = Fx.wet;
sporeVaultDeathLarge.hitSize = 5;
sporeVaultDeathLarge.pierce = true;
sporeVaultDeathLarge.homingPower= 12;
sporeVaultDeathLarge.homingRange= 16;
sporeVaultDeathLarge.bulletSprite = "shell";
sporeVaultDeathLarge.frontColor = Color.valueOf("#42336f");
sporeVaultDeathLarge.backColor = Color.valueOf("#6d54b7");

const sporeVaultDeathExplode = Effect(105, e => {
	var alignXryg = 1;
	if (e.rotation < 0){
		alignXryg = e.fin();
		var alignBhur = e.fout();
		var alignAebg = 1;
	}
	else{
		alignXryg = e.fout();
		alignBhur = e.fin();
		alignAebg = -1;
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignXryg);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 4, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 40 * e.fin(), e.rotation + Mathf.random(-5,5), 360, d);
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignBhur);
    const fg = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 32 + 1);
    }})
    Angles.randLenVectors(e.id, 10, 240 * e.fin() * alignAebg, e.rotation + Mathf.random(-5,5) + (40 * (alignXryg - alignBhur)), 360, fg);
});

const sporeVault = extendContent(StorageBlock, "omnivault", {
	
    //OVERRIDE
	onDestroyed: function(){
		this.super$onDestroyed();
        for(var i = 0; i < 25; i++){
		Effect.create(sporeVaultDeathExplode, this.x, this.y, Mathf.random(-360,360));
		}
		Effect.create(Fx.impactShockwave, this.x, this.y, Mathf.random(-360,360));
		Effect.shake(1.3, 1.3, this.x, this.y);
        for(var j = 0; j < 150; j++){
            sporeVaultDeathSmall.create(this, Team.derelict, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1.0), Mathf.random(0.2, 1.0));
		}
        for(var k = 0; k < 75; k++){
            sporeVaultDeathLarge.create(this, Team.derelict, this.x, this.y, Mathf.random(360), Mathf.random(0.25, 1.0), Mathf.random(0.2, 1.0));
		}
	},
})
const darkSporePressUpdate = Effect(27, e => {
	Draw.color(Color.valueOf("#cce9ff"), Color.valueOf("#007a96"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 2, 45 + Mathf.random(-15,15));
    }})
    Angles.randLenVectors(e.id, 3, 1 + e.fin() * 6, d);
});
const darkSporePressCraft = Effect(30, e => {
    Draw.color(Color.valueOf("#cce9ff"), Color.valueOf("#007a96"), e.fin());
    Lines.stroke(e.fout() * 5); //line thickness goes from 3 to 0
    Lines.circle(e.x, e.y, 10 + e.fin() * 30);
	Draw.color(Color.valueOf("#9f81db"), Color.valueOf("#008fc4"), e.fin());
    const rg = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.random(1,2));
    }})
    Angles.randLenVectors(e.id, 5, -6 + e.fin() * 24, e.rotation + (e.fin() * Mathf.random(-45,45)), 360, rg);
});
const darkSporePress = extendContent(AttributeSmelter, "dark-sporepress", {
	/* setBars(){
		this.super$setBars();
		this.bars.add("Spore Water",func(entity =>
			new Bar(prov(() => this.outputLiquid.localizedName), prov(() => this.outputLiquid.barColor()), floatp(() => this.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity))
		));
	}, */
});
darkSporePress.buildType = () => extendContent(AttributeSmelter.AttributeSmelterBuild, darkSporePress, {
	/* draw(){
		Draw.rect(this.region, this.x, this.y);
		Draw.color(this.outputLiquid.color);
		Draw.alpha(this.liquids.get(this.outputLiquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(darkSporePress.name + "-liquid"), this.x, this.y);
		Draw.reset();
	}, */
	
});
darkSporePress.updateEffect = darkSporePressUpdate;
darkSporePress.craftEffect = darkSporePressCraft;