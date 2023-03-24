const surgeBattery = extendContent(Battery, "surgebattery", {});
surgeBattery.buildType = () => extendContent(Battery.BatteryBuild, surgeBattery, {
    //OVERRIDE
	onDestroyed(){
		this.super$onDestroyed();
        for(var i = 0; i < 55; i++){
            Bullets.cryoShot.create(null, Team.derelict, this.x, this.y, Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 3.0));
		}
        for(var i = 0; i < 15; i++){
            Bullets.flakSurge.create(null, Team.derelict, this.x, this.y, Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
		}
	},
});