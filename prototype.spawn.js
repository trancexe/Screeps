var listOfRoles = ['harvester', 'haulier', 'builder' , 'upgrader', 'repairer'];
var bodyRole = {
     harvester  : [WORK, WORK, CARRY,CARRY, MOVE],
     haulier    : [CARRY,CARRY,CARRY,MOVE],
     builder    : [WORK,WORK,CARRY,MOVE],
     upgrader   : [WORK,WORK,CARRY,MOVE],
     repairer   : [WORK,WORK,CARRY,MOVE],
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
        if (name == undefined){
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
        for (let nmb in bodyRole[roleName]){
            // for every numberOfPart
            for (let i = 0; i < numberOfPart; i++) {
                body.push(bodyRole[roleName][nmb]);
            }
        }


        // console.log(this);
        return this.createCreep(body, undefined, { role: roleName, working: false });


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



