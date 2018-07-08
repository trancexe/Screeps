var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
}
    //Run role
Creep.prototype.runRole =
    function () {
    roles[this.memory.role].run(this);
    };

//creep get energy
Creep.prototype.getEnergy = 
    function (useContainer,userSource) {
        let container;

        // if use container
        if (useContainer) {
            // Find the closest container
            container = this.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: s=> (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                    s.store[RESOURCE_ENERGY] > 0
            });
            //was found
            if (container != undefined){
                // try to withdraw
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ){
                    this.moveTo(container);
                }
            }
        }
        // if no use container
        if (useContainer == false && userSource){
            // find source
            let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE){
                if (this.harvest(source) == ERR_NOT_IN_RANGE){
                    this.moveTo(source);
                }
            }
        }
    }