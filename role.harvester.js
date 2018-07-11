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
            let structureStorage = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: s => (s.structureType == STRUCTURE_STORAGE ||
                            s.structureType == STRUCTURE_CONTAINER
                            ) && _.sum(s.store) < s.storeCapacity

            });
            let structureStore = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
                filter: s=> (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION)
                            && s.energy < s.energyCapacity
            });
            // if not found
            if (structureStorage == undefined){
                if (creep.transfer(structureStore)==ERR_NOT_IN_RANGE){
                    creep.moveTo(structureStore, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // if found
            if (structureStorage != undefined){
                if (creep.transfer(structureStorage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structureStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
        }
        else if (creep.memory.working == false){
            creep.getEnergy(false,true);
        }
    }
}