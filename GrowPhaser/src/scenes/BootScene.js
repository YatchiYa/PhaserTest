class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        
        this.levels = {title: {key: 'TitleScene', path: 'assets/levels/title_screen.json'}, 
        WorldScene: {key: 'WorldScene', path: 'assets/levels/ForestGumpD.json'}, 
        cave: {key: 'WorldScene', path:'assets/levels/cave.json'},
     };
    }
    
    preload () {
        for (let level_name in this.levels) {
            let level = this.levels[level_name];
            this.load.json(level_name, level.path);
        }
    }
    
    create (data) {
        let scene = data.scene;
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            scene = 'title';
        }
        let level_data = this.cache.json.get(scene);
        this.scene.start('LoadingScene', {level_data: level_data, scene: this.levels[scene].key});
    }
}

export default BootScene;