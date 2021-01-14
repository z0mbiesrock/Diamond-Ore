//Initialize all items and liquids
new Item("diamond");
new Item("cryogem");
new Item("dark-spore-pod");
new Item("ancient-scrap");
new Item("ancient-alloy");
new Liquid("phase-string");
new Liquid("corrupt-water");
const cLP = new LaunchPad("cargo-launch-pad");
cLP.podRegion = Core.atlas.find(cLP.name + "-pod");
const aLS = new LaunchPad("ancient-launch-silo");
aLS.podRegion = Core.atlas.find(aLS.name + "-pod");
// Blocks
require("testbomb")
require("blocks/crystal-conveyor")
require("blocks/godturrets")
require("blocks/surge-reactor")
require("blocks/surge-battery")
require("blocks/cryogem-dissipator")
require("blocks/cryocentrifuge")
require("blocks/multimelter")
require("blocks/multipyra")
require("blocks/heavy-coal-processor")
require("blocks/omnijunction")
require("blocks/commandcenter")
require("blocks/diamondwalls")
// Regular Units
require("units/siren")
require("units/serpent")
require("units/scylla")
require("units/charybdis")
require("units/leviathan")
require("units/gnat")
require("units/firefly")
require("units/beetle")
require("units/scarab")
require("units/cicada")
require("units/mlegndminer")
require("units/falcon")
require("units/vulture")
require("units/spcAir")
require("units/shkAir")
require("units/medGnd")
// Spore content
require("blocks/spore-blocks")
require("blocks/water-decorruptor")
// Ancient Content
require("blocks/ancientrefinery")
require("blocks/ancients")
require("blocks/vanillaammo")// NOW OUT OF BRAZIL

