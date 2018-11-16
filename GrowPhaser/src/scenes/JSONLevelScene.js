class JSONLevelScene extends Phaser.Scene {
    constructor(key) {
        super({
            key: key
        });
    }
    
    init (data) {
        this.level_data = data.level_data;
    }
    
    create () {        
        this.groups = {};
        this.level_data.groups.forEach(function (group_name) {
            this.groups[group_name] = this.physics.add.group();
        }, this);

        this.prefabs = {};
        for (var prefab_name in this.level_data.prefabs) {
            var prefab_data = this.level_data.prefabs[prefab_name];
            if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
                var prefab = new this.prefab_classes[prefab_data.type](this, prefab_data.name, prefab_data.position, prefab_data.properties);
            }
        }
    }

    update() {
        for( let prefab_name in this.prefabs){
            this.prefabs[prefab_name].update();
        }
    }
}

export default JSONLevelScene;