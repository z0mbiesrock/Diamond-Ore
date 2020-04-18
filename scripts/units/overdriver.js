/* const overdriverFighter = extendContent(UnitType, "overdriver-fighter", {
    
}); */
const overdriverBuffActivate = newEffect(20, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#bbbb00"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 2, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 5, 11 + 10 * e.fin(), e.rotation, 360,d);
    Lines.stroke(e.fout() * 3);
    const h = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 6 + 1 + e.fout() * 3);
    }})
    Angles.randLenVectors(e.id, 3, 11 + 10 * e.fin(), e.rotation, 360,h);
    Lines.stroke(e.fout() * 5);
	Lines.circle(e.x, e.y, e.fin() * 32);
});
const activateBuff = extendContent(Block, "buff-activate", {});// This creates the buff activation sound
const overdriverBuffed = newEffect(15, e => {
	Draw.color(Color.valueOf("#ffff00"), Color.valueOf("#ffffff"), e.fin());
    Lines.stroke(e.fout() * 5);
	Lines.circle(e.x, e.y, e.fin() * 32);
});
const overdriverBuffingFx = newEffect(30, e => {
	Draw.color(Color.valueOf("#ffffcc"), Color.valueOf("#ffffff"), e.fin());
    len = e.finpow() * 10;
    ang = e.rotation;
    Fill.rect(e.x + Angles.trnsx(ang, len), e.y + Angles.trnsy(ang, len), 2 * e.fout(), 6 + 6 * e.fin(), e.rotation);
    Fill.rect(e.x - Angles.trnsx(ang, len), e.y - Angles.trnsy(ang, len), 2 * e.fout(), 6 + 6 * e.fin(), e.rotation);
});
const overdriverFighter = new JavaAdapter(UnitType, {}, "overdriver-fighter",  prov(() => new JavaAdapter(HoverUnit, {
	attack(){
		this.moveTo(150);
	},
	/* draw(){
		try{
			if(this.buffing == true){
				this.region = Core.atlas.find(this.name + "-overdriven");
			}
			else{
				this.region = Core.atlas.find(this.name);
			}
		}
		catch(initial){ //Once initial variables are defined, the rest is smooth sailing
			this.region = Core.atlas.find(this.name);
		}
		this.super$draw();
	}, */
	update(){
		try{ // Put in a "try"; keep a distance from enemies at all costs
			nearestfoe = Units.closestTarget(this.getTeam(), this.x, this.y, 250);
			if (nearestfoe != null){
				vel = Vec2(this.x, this.y);
				if (nearestfoe.dst(this) < 150){
					this.velocity().add(vel.trns(this.angleTo(nearestfoe), -0.20 * Time.delta()));
				}
				this.avoidOthers();	
			}
		}
		catch(error){
			print(error);
		}
		try{
			if (this.buffCooldown <= 0){
				if(this.buffing == false){
					myteam = this.getTeam();
					myteampower = 0;
					enemyteampower = 0;
					Units.nearby(myteam, this.x, this.y, 184, cons(unit => {
						if(unit.isDead() == false){
								myteampower += unit.maxHealth();
						}
					}));
					Units.nearbyEnemies(myteam, this.x, this.y, 280, 280, cons(unit => {
						if(unit.isDead() == false && unit.withinDst(this.x, this.y, 176)){
								enemyteampower += unit.maxHealth() * 2;
							/* if(unit.isBoss() == true){
									enemyteampower += 10000;
							} */
						}
					}));
					/* for(var i = 1; i < 6; i++){
						getteam = Team.get(i);
						Units.nearby(myteam, this.x, this.y, 176, unit => {
							if(unit.isDead() == false){
								if(getteam == myteam){
									myteampower += unit.maxHealth();
								}
								else{
									enemyteampower += unit.maxHealth();
								}
							}
						});
					}; */
					if ((enemyteampower > myteampower && this.hasEffect(StatusEffects.overdrive) == false) || (enemyteampower > 15000 && this.hasEffect(StatusEffects.overdrive) == false)){
						this.buffing = true
						Effects.effect(overdriverBuffActivate, this.x, this.y, this.rotation);
						try{ //trying to implement custom sound, use miltiple simultaneous plays to ensure it's heard
						activateBuff.breakSound.play(2)
						activateBuff.breakSound.at(this.x, this.y);
						}
						catch(rorre){
							print(rorre);
						}
					}
				}
				if (this.buffDuration <= 0){
					this.buffing = false;
					this.buffDuration = 600;
					this.buffCooldown = 1380;
				}
			}
			else{
				this.buffCooldown -= 1;
			}
			if(this.buffing == true){
				Units.nearby(this.getTeam(), this.x, this.y, 240, cons(unit => {
					if(unit.getTeam() == this.getTeam() && unit.hasEffect(StatusEffects.overdrive) == false){
						Effects.effect(overdriverBuffed, unit);
					}
					unit.applyEffect(StatusEffects.overdrive, 20);
				}));
				if (this.buffEffectTimer == 6){
					Effects.effect(overdriverBuffingFx, this.x, this.y, this.rotation + 90);
					this.buffEffectTimer = 0;
				}
				else {
					this.buffEffectTimer += 1;
				}
				this.buffDuration -= 1;
			}
			//print(this.buffCooldown);
		}
		catch(error){
			print(error);
			this.buffing = false;
			this.buffDuration = 600;
			this.buffEffectTimer = 0;
			circleLength = 200;
			initiated = true;
			print("Initialized");
			this.buffCooldown = 300;// Initial cooldown is shorter
		}
		this.super$update();
	},
})))