extendContent(GenericCrafter, "heavy-coal-processor", {
	draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color(tile.entity.liquids.current().color);
		Draw.alpha(tile.entity.liquids.currentAmount() / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid"), tile.drawx(), tile.drawy());
		Draw.color();
        Draw.rect(Core.atlas.find(this.name + "-spinner-a"),tile.drawx(),tile.drawy(), -180 * tile.entity.progress);
        Draw.rect(Core.atlas.find(this.name + "-spinner-b"),tile.drawx(),tile.drawy(), 180 * tile.entity.progress);
		Draw.reset();
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-spinner-a"),
            Core.atlas.find(this.name + "-spinner-b"),
        ];
    }
});