import Phaser from 'phaser';

import JSONLevelScene from './JSONLevelScene';
import Prefab from '../prefabs/Prefab.js';
import TextPrefab from '../prefabs/TextPrefab.js';
import Player from '../prefabs/world/Player';
import Door from '../prefabs/world/Door';

class WorldScene extends JSONLevelScene {
    constructor() {
        super('WorldScene');
        
        this.prefab_classes = {
            player: Player.prototype.constructor,
            door: Door.prototype.constructor
        }
    }
    
    create() {
        // create map and set tileset
        this.map = this.add.tilemap(this.level_data.map.key);
        let tileset_index = 0;
        this.tilesets = {};
        this.map.tilesets.forEach(function (tileset) {
            let map_tileset = this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
            this.tilesets[this.level_data.map.tilesets[tileset_index]] = map_tileset;
            tileset_index += 1;
        }, this);
	
        // create map layers before groups
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createStaticLayer(layer.name, this.tilesets[layer.properties.tileset]);

            // checking the collision propreties
            if (layer.properties.collision) { // collision layer
                this.map.setCollisionByExclusion([-1], true, layer.name);
            }

            // cheking the depth properties
            if (layer.properties.depth) { // collision layer
                this.layers[layer.name].setDepth(layer.properties.depth_z);
            }

        }, this);


        super.create();
        
        this.map.objects.forEach(function (object_layer) {
            object_layer.objects.forEach(this.create_object, this);
        }, this);

        // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
       //  this.cameras.main.startFollow(this.prefab_classes.player);
       //  console.log(this.cameras.main.follow(this.player));
        // this.cameras.main.roundPixels = true;

        
    }
    
    create_object(object) {
        // tiled coordinates starts in the bottom left corner
        let position = {"x": object.x + (object.width / 2), "y": object.y + (object.height / 2)};
        // create object according to its type
        if (this.prefab_classes.hasOwnProperty(object.type)) {
            let prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
        }
    }
}

export default WorldScene;