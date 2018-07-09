var roles = {
    harvester: require('role.harvester'),
    haulier: require('role.haulier'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
};
    //Run role
Creep.prototype.runRole =
    function () {
    roles[this.memory.role].run(this);
    // console.log(this.memory.role);
    };

//creep get energy
Creep.prototype.getEnergy = 
    function (useContainer,userSource) {
        let container;
        let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
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
            //try to harvest energy from source when no container
            else if (container == undefined){
                if (this.harvest(source) == ERR_NOT_IN_RANGE){
                    this.moveTo(source);
                }
            }
        }
        // if no use container
        if (useContainer == false && userSource){
            // find source
            if (this.harvest(source) == ERR_NOT_IN_RANGE){
                this.moveTo(source);
            }
        }
}
