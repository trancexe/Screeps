require('prototype.spawn');
require('prototype.creep');
var TrxRoom = require('prototype.structure');
var report = require('function.report');

module.exports.loop = function () {

    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for each creeps
    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].runRole();
        Game.creeps[name].buildRoad();
    }

    //for each spawn
    for (let spawnName in Game.spawns ){
        Game.spawns[spawnName].creepCheckForSpawn();
    }

    //for each room
    for (let rms in Game.rooms){
        TrxRoom.tower(rms);
    }

    //function report
    if (Game.time % 20 === 0) {
        report(Game.rooms);
    }
}