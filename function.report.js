
module.exports = function (rooms) {
    console.log("REPORT PER 20 TICK");
    console.log('Running ' + Object.keys(rooms).length + ' Room(s)')
    
    for (let rm in rooms) {
        var rms = Game.rooms[rm];
        console.log('<span style="color:rgba(142, 68, 173,1.0);">' + rm + '</span>');
        console.log('<span style="color:rgba(142, 68, 173,1.0);">##################################################</span>');

        console.log(rms.energyAvailable + ' Energy for spawning from ' + rms.energyCapacityAvailable + ' Total spawning capacity')
        // console.log('Total energy avaiable in storage : ');
        var numberOfHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numberOfHaulier = _.sum(Game.creeps, (c) => c.memory.role == 'haulier');
        var numberOfUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numberOfBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var numberOfRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        var numberOfWallRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
        console.log('<span style="color:rgba(39, 174, 96,1.0);">Creep</span>')
        console.log("Number of Harvester     = " + numberOfHarvester)
        console.log("Number of Haulier       = " + numberOfHaulier)
        console.log("Number of Ugrader       = " + numberOfUpgrader)
        console.log("Number of Builder       = " + numberOfBuilder)
        console.log("Number of Repairer      = " + numberOfRepairer)
        console.log("Number of Wall Repairer = " + numberOfWallRepairer)

        console.log('<span style="color:rgba(39, 174, 96,1.0);">Structures</span>')
        var extenxions  = _.filter(Game.structures, s => s.structureType == STRUCTURE_EXTENSION);
        var towers      = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
        var containers  = _.filter(Game.structures, s => s.structureType == STRUCTURE_CONTAINER);
        console.log("Number of Extenxion = " + Object.keys(extenxions).length);
        console.log("Number of Extenxion = " + Object.keys(containers).length);
        console.log("Number of Tower     = " + Object.keys(towers).length);


    }

};