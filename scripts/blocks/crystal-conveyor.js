
const crystalConveyor = extend(Conveyor, "crystal-conveyor", {
});
crystalConveyor.buildType = () => extend(Conveyor.ConveyorBuild, crystalConveyor, {
    draw(){
        this.super$draw();
		Draw.rect(Core.atlas.find(crystalConveyor.name+"-top"), this.x, this.y);
    },
});