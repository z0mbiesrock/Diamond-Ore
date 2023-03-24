
const crystalConveyor = extendContent(Conveyor, "crystal-conveyor", {
});
crystalConveyor.buildType = () => extendContent(Conveyor.ConveyorBuild, crystalConveyor, {
    draw(){
        this.super$draw();
		Draw.rect(Core.atlas.find(crystalConveyor.name+"-top"), this.x, this.y);
    },
});