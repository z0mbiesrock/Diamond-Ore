//this is NOT the complete definition for this block! see content/blocks/scatter-silo.hjson for the stats and other properties.

//create a simple shockwave effect
const surgeReactorMeltdownBlast = extend(BasicBulletType, {
    
    update: function(b){
        Effects.shake(1.2, 1.2, b.x, b.y);
        if(b.timer.get(1, 5)){
            Damage.collideLine(b.x, b.y, this.hitEffect, b.x, b.y, b.rot(), 310.0, true);
        }
    },
    
    /*hit: function(b, hitx, hity){
    Effects.effect(this.hitEffect, Color.valueOf("ec7458aa"), hitx, hity);
        if(Mathf.chance(0.6)){
            Fire.create(world.tileWorld(hitx + Mathf.range(6.0), hity + Mathf.range(6.0)));
        }
    },*/
    
    draw: function(b){
        
        /*Draw.color(Color.valueOf("ec7458"));
        Lines.stroke((9 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * 3.2 * 1.0);
        Lines.lineAngle(b.x, b.y, b.rot(), 310.0 * b.fout());
        Draw.reset();*/
        const colors = [Color.valueOf("fff75855"), Color.valueOf("f7ff58aa"), Color.valueOf("ffff5a"), Color.valueOf("ffffff")];
        const tscales = [1, 0.7, 0.5, 0.2];
        const strokes = [3.2, 2.1, 1.1, 0.8];
        const lenscales = [1, 1.12, 1.15, 1.17];
        //const baseLen = 310.0 * b.fout();

        //Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
        for(var s = 0; s < 4; s++){
            Draw.color(colors[s]);
            for(var i = 0; i < 4; i++){
                Lines.stroke((9 + Mathf.absin(Time.time(), 0.8, 1.5)) * b.fout() * strokes[s] * tscales[i]);
                Lines.lineAngle(b.x, b.y, b.rot(), 310.0 * b.fout() * lenscales[i]);
            }
        }
    }
});

surgeReactorMeltdownBlast.speed = 0.001;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownBlast.damage = 800;
surgeReactorMeltdownBlast.drawSize = 480;
surgeReactorMeltdownBlast.lifetime = 16;
surgeReactorMeltdownBlast.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownBlast.despawnEffect = Fx.none;
surgeReactorMeltdownBlast.hitSize = 5;
surgeReactorMeltdownBlast.pierce = true;
//this does not do anything
//the one that you see on my other lasers are custom made that creates lighting at random
//surgeReactorMeltdownBlast.lightining = 7;
//surgeReactorMeltdownBlast.lightningLength = 25;

const siloLaunchEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.lightGray, e.fin()); //color goes from white to light gray
    Lines.stroke(e.fout() * 3); //line thickness goes from 3 to 0
    Lines.circle(e.x, e.y, e.fin() * 100); //draw a circle whose radius goes from 0 to 100
});

//create the block type
const silo = extendContent(Block, "testbomb", {
    //override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            //configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        //})).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
		})).size(50).disabled(boolf(b => !tile.entity.cons.valid()))
    },

    //override configure event
    configured(tile, value){
        //make sure this silo has the items it needs to fire
        if(tile.entity.cons.valid()){
            //make this effect occur at the tile location
            Effects.effect(siloLaunchEffect, tile)

            for(var i = 0; i < 15; i++){
				//this also doesnt do anything. drawSize is the distance where bullets stopped rendering.
                //surgeReactorMeltdownBlast.drawSize = Mathf.random(200, 500);
                Calls.createBullet(surgeReactorMeltdownBlast, null, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
            }
            //triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
})

