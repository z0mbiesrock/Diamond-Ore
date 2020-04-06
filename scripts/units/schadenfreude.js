const schadenfreudeDrone = extendContent(UnitType, "schadenfreude-repair-drone", {
    
});
schadenfreudeDrone.create(prov(() => new JavaAdapter(RepairDrone, { 
	update(){
		this.super$update();
		if(this.health < this.maxHealth()){
			this.healBy(Time.delta() * 0.075);
		}
	},
})));