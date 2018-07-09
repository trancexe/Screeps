module.exports = {
    run: function (creep) {
        // no energy
        if (creep.memory.working && creep.carry.energy == 0){
            //switch state
            creep.memory.working = false;
        }
        //full
        if (creep.memory.working== false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }

        // transfer energy to container or storage
        if (creep.memory.working){
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
                filter: s => (s.structureType == STRUCTURE_SPAWN ||
                    s.structureType == STRUCTURE_EXTENSION ||
                    s.structureType == STRUCTURE_TOWER
                ) && s.energy < s.energyCapacity
            });
            // if not found
            if (structure == undefined){
                structure = creep.room.storage;
            }
            // if found
            if (structure != undefined){
                if (creep.transfer(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure);
                }
            }
        }
        else if (creep.memory.working == false){
            creep.getEnergy(true,false);
        }
    }
}