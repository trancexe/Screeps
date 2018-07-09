var listOfRoles = ['harvester', 'haulier', 'claimer', 'upgrader', 'repairer', 'builder', 'wallRepairer'];
var bodyRole = {
     harvester : [WORK, WORK, CARRY,CARRY, MOVE],
     haulier : [CARRY,CARRY,MOVE],
     builder : [WORK,WORK,CARRY,MOVE]
};

StructureSpawn.prototype.creepCheckForSpawn = 
    function () {
        /** @type {Room} */
        // this.rrom mean Game.spawns.[spawnName].room
        let room = this.room;
        // find all creeps in room
        /** @type {Array.<Creep>} */
        let creepsInRoom = room.find(FIND_MY_CREEPS);

        // count the number of creeps alive for each role in this room
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a specific role
        /** @type {Object.<string, number>} */
        let numberOfCreeps = {};
        for (let role of listOfRoles) {
            numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
        }
        let maxEnergy = room.energyCapacityAvailable;
        let name = undefined;

        //check if no harvester or lorry is left
        if (numberOfCreeps['harvester'] == 0 && numberOfCreeps['lorry'] == 0 ){
                        
        }

    };
createCustomCreep =
    function (energyUse,roleName) {
        for (let role of listOfRoles) {
            console.log(costCreatCreep(role));
        }



    };

costCreatCreep =
    function (roleName) {
        let cost=0;
        let part;
        //    break down body part
        for (let nmb in bodyRole[roleName]){
                part = bodyRole[roleName][nmb]
                cost += BODYPART_COST[part]
        }
        return(cost);
    };



