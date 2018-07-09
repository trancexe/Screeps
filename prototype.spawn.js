var listOfRoles = ['harvester', 'haulier', 'builder' /**, 'claimer', 'upgrader', 'repairer', 'wallRepairer'*/];
var bodyRole = {
     harvester  : [WORK, WORK, CARRY,CARRY, MOVE],
     haulier    : [CARRY,CARRY,MOVE],
     builder    : [WORK,WORK,CARRY,MOVE]
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
        if (numberOfCreeps['harvester'] == 0 && numberOfCreeps['haulier'] == 0 ){
        //        check energy left
        //    If have enough energt to create harvester
            if (this.energy >= costCreatCreep('harvester')){
                // name = this.createCustomCreep(maxEnergy,'harvester')
            }
            //if not enough energy left;
            else if (this.energy < costCreatCreep('harvester')){
                // name = this.createCustomCreep(room.energyAvailable,'haulier')
            }

        }

        //add console log for spawn new creep
        if (name != undefined && _.isString(name)){
            console.log(this.name + " spawned new creep: " + name + " (" + Game.creeps[name].memory.role + ")");
        }
        // console.log(this);
        // this.createCustomCreep(maxEnergy,'harvester');

    };
StructureSpawn.prototype.createCustomCreep =
    function (energyUse,roleName) {
        //total part produce
        let producePart =  bodyRole[roleName].length;
        //how many parts can be produced
        let numberOfPart = Math.floor(energyUse/costCreatCreep(roleName));
        //make sure parts no more than 50
        let approvedPart = Math.min(numberOfPart, 50/producePart);

        // console.log('approved :'+approvedPart+" produce part: "+(numberOfPart)+' max approved: '+ (50/producePart));

        let body = [];
        for (let nmb in bodyRole[roleName]){
            body.push(bodyRole[roleName][nmb]);
        }

        // console.log(this);
        return this.spawnCreep(body, undefined, { role: roleName, working: false });


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



