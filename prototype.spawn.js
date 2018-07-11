var listOfRoles = ['harvester', 'haulier', 'builder' , 'upgrader', 'repairer', 'wallRepairer'];
var bodyRole = {
     harvester      : [WORK,CARRY,CARRY,MOVE],
     haulier        : [WORK,CARRY,CARRY,CARRY,MOVE],
     builder        : [WORK,CARRY,CARRY,MOVE],
     upgrader       : [WORK,CARRY,CARRY,MOVE],
     repairer       : [WORK,CARRY,CARRY,MOVE],
     wallRepairer   : [WORK,CARRY,CARRY,MOVE],
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
        //check minCreeps memory
        for (let role of listOfRoles){
            // if (this.memory.minCreeps){
            //     console.log('minCreeps ada');
            // }
            // else if (this.memory.minCreeps) {
            //     // this.memory.minCreeps= {harvester:1};
            // }
            if (this.memory.minCreeps[role]){
                numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
                // console.log(numberOfCreeps[role]);
            }
            else if (this.memory.minCreeps[role] == undefined){
                let addMemory = this.memory.minCreeps[role] = 1;
                console.log('Add memory on '+this+' minCreeps role '+role+' = 1');
            }
        }
        // if (this.memory.minCreeps){
        //     for (let role of listOfRoles) {
        //         numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
        //         // console.log(numberOfCreeps[role]);
        //     }
        // }
        // else {
        //     for (let role of listOfRoles) {
        //         let addMemory = this.memory.minCreeps[role]=1;
        //     }
        // }

        let maxEnergy = room.energyCapacityAvailable;
        let name = undefined;

        //check if no harvester or lorry is left
        if (numberOfCreeps['harvester'] == 0 || numberOfCreeps['haulier'] == 0 ){
        //        check energy left
            if (numberOfCreeps['harvester'] == 0){
                //    If have enough energt to create harvester
                if (this.energy >= costCreatCreep('harvester')){
                    name = this.createCustomCreep(maxEnergy,'harvester')
                    // console.log(neme);
                }
                //if not enough energy left;
                else if (this.energy < costCreatCreep('harvester')){
                    name = this.createCustomCreep(room.energyAvailable,'harvester')
                    // console.log(name);
                }
            }
            //if there ara no haulier left
            if (numberOfCreeps['haulier'] == 0){
                //    If have enough energt to create harvester
                if (this.energy >= costCreatCreep('haulier')){
                    name = this.createCustomCreep(maxEnergy,'haulier')
                    // console.log(neme);
                }
                //if not enough energy left;
                else if (this.energy < costCreatCreep('haulier')){
                    name = this.createCustomCreep(room.energyAvailable,'haulier')
                    // console.log(name);
                }
            }
            // console.log(name);
        }
        else if (name == undefined){
            // console.log(this.memory.minCreeps);
            for (let mr in this.memory.minCreeps){
                // console.log(numberOfCreeps[mr]);
                if (numberOfCreeps[mr]<this.memory.minCreeps[mr] && maxEnergy==room.energyAvailable){
                    name = this.createCustomCreep(maxEnergy,mr)
                }
                // console.log('jumlah creep: '+numberOfCreeps[mr]+' izin: '+this.memory.minCreeps[mr]+' Role:'+mr);
            }
        }

        //add console log for spawn new creep
        if (name != undefined && _.isString(name)){
            console.log(this.name + " spawned new creep: " + name + " (" + Game.creeps[name].memory.role + ")");
        }
        // console.log(name);
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
        //for every bodu part
        for (let nmb of bodyRole[roleName]){
            // for every numberOfPart
            for (let i = 0; i < numberOfPart; i++) {
                body.push(nmb);
            }
        }


        // console.log(this);
        return this.createCreep(body, undefined, { role: roleName, working: false });
        // return console.log(nmb);

    };

costCreatCreep =
    function (roleName) {
        let cost=0;
        let part;
        //    break down body part
        for (let part of bodyRole[roleName]){
                cost += BODYPART_COST[part]
        }
        return(cost);
    };



