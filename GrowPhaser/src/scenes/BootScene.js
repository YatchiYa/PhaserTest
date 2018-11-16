class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        
        this.levels = {TitleScene: 'assets/levels/title_screen.json', WorldScene: 'assets/levels/ForestGumpD.json', Cave: 'assets/levels/cave.json'};
    }
    
    preload () {
        for (let level_key in this.levels) {
            let level_path = this.levels[level_key];
            this.load.json(level_key, level_path);
        }
    }
    
    create (data) {
        let scene = data.scene;
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            scene = 'TitleScene';
        }
        let level_data = this.cache.json.get(scene);
        console.log(" the scene runing now : " + scene);
        this.scene.start('LoadingScene', {level_data: level_data, scene: scene});
    }
}

export default BootScene;