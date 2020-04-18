const surgeBattery = extendContent(Battery, "surgebattery", {
    //OVERRIDE
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 55; i++){
            Calls.createBullet(Bullets.cryoShot, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 3.0));
		}
        for(var i = 0; i < 15; i++){
            Calls.createBullet(Bullets.flakSurge, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
		}
	},
	
})