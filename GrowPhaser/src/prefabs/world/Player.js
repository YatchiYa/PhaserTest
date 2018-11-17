import Prefab from '../Prefab';

class Player extends Prefab {
    
    constructor(scene, name, position, properties) {
        super(scene, name, position, properties);
        
        // setting the speed
        this.walking_speed = +properties.walking_speed;

        //physic collision 
        this.body.collideWorldBound = true;

        // this.scene.physics.add.collider(this, this.scene.layers.trees);
       	
       	// console.log(this.scene.layers.trees.layer.properties.collision);

       	for (let lay in this.scene.layers){
       		
       		if(this.scene.layers[lay].layer.properties.collision){
       			 this.scene.physics.add.collider(this, this.scene.layers[lay]);
       		}
       	}

       	// the movement config
       	this.move_left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       	this.move_right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       	this.move_up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       	this.move_down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

       	if(!this.scene.anims.anims.has('walking_down')){
       		this.scene.anims.create({
       			key: 'walking_down',
       			frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [0,1,2]}),
       			frameRate: 6,
       			repeat: -1
       		});
       	}

       	if(!this.scene.anims.anims.has('walking_up')){
       		this.scene.anims.create({
       			key: 'walking_up',
       			frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [9,10,11]}),
       			frameRate: 6,
       			repeat: -1
       		});
       	}

       	if(!this.scene.anims.anims.has('walking_left')){
       		this.scene.anims.create({
       			key: 'walking_left',
       			frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [3,4,5]}),
       			frameRate: 6,
       			repeat: -1
       		});
       	}

       	if(!this.scene.anims.anims.has('walking_right')){
       		this.scene.anims.create({
       			key: 'walking_right',
       			frames: this.scene.anims.generateFrameNumbers(this.texture.key, {frames: [6,7,8]}),
       			frameRate: 6,
       			repeat: -1
       		});
       	}

       	this.stopped_frames = [0,9,0,3,6];

        this.z = -1 ;
        console.log(this);

    }

        update(){

          if(this.body){


            	if(this.move_left.isDown && this.body.velocity.x <=0){
    				this.body.velocity.x = -this.walking_speed;
    				if(this.body.velocity.y === 0){
    					this.anims.play('walking_left', true);
    				}
            	}
            	else if (this.move_right.isDown && this.body.velocity.x >=0){
    				this.body.velocity.x = +this.walking_speed;
    				if(this.body.velocity.y === 0){
    					this.anims.play('walking_right', true);
    				}
            	}
            	else {
            		this.body.velocity.x = 0;
            	}


            	if(this.move_up.isDown && this.body.velocity.y <=0){
    				this.body.velocity.y = -this.walking_speed;
    				if(this.body.velocity.x === 0){
    					this.anims.play('walking_up', true);
    				}
            	}
            	else if (this.move_down.isDown && this.body.velocity.y >=0){
    				this.body.velocity.y = +this.walking_speed;
    				if(this.body.velocity.x === 0){
    					this.anims.play('walking_down', true);
    				}
            	}
            	else {
            		this.body.velocity.y = 0;
            	}

            	if(this.body.velocity.x === 0 && this.body.velocity.y === 0){
            		this.anims.stop();
            		this.setFrame(this.stopped_frames[this.body.facing - 10]);
            	}

                 // camera following the player      
                this.scene.cameras.main.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
                this.scene.cameras.main.startFollow(this);

          }
        }
}

export default Player;