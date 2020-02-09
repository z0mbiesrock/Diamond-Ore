
const thorTurret = extendContent(DoubleTurret, "thor", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-thor-icon")
		];
	},
});
const odinTurret = extendContent(BurstTurret, "odin", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-odin-icon")
		];
	},
});
const lokiTurret = extendContent(ItemTurret, "loki", {
	
	generateIcons: function(){
		return [
			Core.atlas.find("diamond-ore-godturret-icon-base"),
			Core.atlas.find("diamond-ore-loki-icon")
		];
	},
});