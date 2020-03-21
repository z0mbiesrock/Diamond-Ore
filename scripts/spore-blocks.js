const slowerregen = 1 / 55;
const slowregen = 1 / 45;
const normalregen = 1 / 35;
const fastregen = 1 / 25;
const sporeBlockDeathTrail = newEffect(45, e => {
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 0 + e.fin() * 5, d);
});
const sporeBlockDeathHit = newEffect(30, e => {
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
const sporeBlockDeathFx = newEffect(80, e => {
	alignGrad = 1;
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
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 9, d);
});


const sporeBlockDeath = extend(ArtilleryBulletType, {});

sporeBlockDeath.speed = 1.5;
//this does 800 damage per 5 ticks btw.
sporeBlockDeath.damage = 3;
sporeBlockDeath.splashDamage = 3;
sporeBlockDeath.splashDamageRadius = 5;
sporeBlockDeath.bulletWidth = 4;
sporeBlockDeath.bulletHeight = 5;
sporeBlockDeath.bulletShrink = 0;
sporeBlockDeath.hitShake = 0;
sporeBlockDeath.lifetime = 60;
sporeBlockDeath.collidesTiles = true;
sporeBlockDeath.collides = true;
sporeBlockDeath.collidesAir = true;
sporeBlockDeath.trailEffect = sporeBlockDeathTrail;
sporeBlockDeath.hitEffect = sporeBlockDeathHit;
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
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(slowerregen)) ) {

                   tile.entity.health += 10;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health() = tile.entity.maxHealth();
				   } */
					   
                   
            }
      }
});
const darkSporeBlockLarge = extendContent(Wall, "dark-spore-block-large", {
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(slowregen)) ) {

                   tile.entity.health += 20;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      }
});
extendContent(Cultivator, "sporecluster", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(Cultivator, "sporeclusterb", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(Cultivator, "sporeclusterc", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(Cultivator, "sporeclusterd", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(DoubleTurret, "spore-turret", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(DoubleTurret, "spore-turret-b", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(DoubleTurret, "spore-turret-c", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(Floor, "spore-water", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(Floor, "spore-water-deep", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(ItemTurret, "spore-turret-small", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(fastregen)) ){

                   tile.entity.health += 8;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
        };
        this.super$update(tile);
     },
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(ItemTurret, "spore-turret-small-dark", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(fastregen)) ){

                   tile.entity.health += 10;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
        };
        this.super$update(tile);
     },
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 7; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});

const sporeConveyor = extendContent(Conveyor, "spore-conveyor", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
        this.super$draw(tile);
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name + "-0-1")
        ];
    },
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(fastregen)) ){

                   tile.entity.health += 5;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
        };
        this.super$update(tile);
     },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 3; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	},
});