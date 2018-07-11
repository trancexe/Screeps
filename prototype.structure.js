
module.exports = {

//    Tower
    tower: function (roomV) {
        let room = Game.rooms[roomV];
        let towers = room.find(FIND_MY_STRUCTURES, {
            filter: s=> s.structureType == STRUCTURE_TOWER
        });

        _.forEach(towers, function (tower) {
            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let closestCreeps = tower.pos.findClosestByRange(FIND_CREEPS,{
                filter: c=> c.hits < c.hitsMax
            });
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            else if (closestCreeps){
                tower.heal(closestCreeps);
            }
            else if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

        })

        //
        // //Attack target
        // if (hostiles.length >0) {
        //     for (let t of towers){
        //         for (let h of hostiles){
        //             t.attack(h);
        //         }
        //     }
        // }
        // else if (hostiles.length == 0) {
        // //    Heal creeps
        // //     for
        // }
    }


};