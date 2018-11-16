// test 

import 'phaser';
import TitleScene from './scenes/TitleScene';
import WorldScene from './scenes/WorldScene';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';
import JSONLevelScene from './scenes/JSONLevelScene';

let bootScene = new BootScene();
let loadingScene = new LoadingScene();
let titleScene = new TitleScene();
let worldScene = new WorldScene();

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
    	default : 'arcade',
    	arcade: {
    		gravity:{
    			y: 0 
    		}
    	}
    }
};

let game = new Phaser.Game(config);
game.scene.add('BootScene', bootScene);
game.scene.add('LoadingScene', loadingScene);
game.scene.add('TitleScene', titleScene);
game.scene.add('WorldScene', worldScene);
game.scene.start("BootScene");
