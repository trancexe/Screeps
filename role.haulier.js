var roleHarvester = require('role.harvester');

module.exports = {
    run: function (creep) {
        var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
            filter: s => (s.structureType == STRUCTURE_SPAWN ||
                s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_TOWER
            ) && s.energy < s.energyCapacity
        });
        // no energy
        if (creep.memory.working && creep.carry.energy == 0){
            //switch state
            creep.memory.working = false;
        }
        //full
        if (creep.memory.working== false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }

        // console.log('Status kerja '+creep.memory.working+"  status structure "+structure+'  '+creep);

        // transfer energy to container or storage
        if (creep.memory.working){
            // if not found
            // console.log(structure == undefined);
            if (structure == undefined ){
                roleHarvester.run(creep);
            } else
            // if found
            if (structure != undefined){
                if (creep.transfer(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else if (creep.memory.working == false){
            if (structure != undefined){
                creep.getEnergy(true,false);
                // console.log('struktur perlu diisi')
            }
            else if ((structure == undefined)) {
                creep.getEnergy(false,true);
                // console.log('struktur penuh')
            }
        }
    }
}