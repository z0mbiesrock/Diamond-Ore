//Don't ask where I stol-copied this code from.
/* Registers a unit's class for I/O stuff (saves and net)
   Requires unit.constructor.get() to have classId: () => unit.classId */
module.exports = unit => {
	// Register unit's name
	EntityMapping.nameMap.put(unit.name, unit.constructor);

	// Find available class id and register it
	unit.classId = -1;
	for (var i in EntityMapping.idMap) {
		if (!EntityMapping.idMap[i]) {
			EntityMapping.idMap[i] = unit.constructor;
			unit.classId = i;
			return;
		}
	}

	// Incase you used up all 256 class ids; use the same code for ~250 units you idiot.
	throw new IllegalArgumentException(unit.name + " has no class ID");
};
