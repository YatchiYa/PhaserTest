

class Camera extends Phaser.Camera {
    constructor(scene, name, position, properties) {
        super(scene, position.x, position.y, properties.texture, properties.frame);
            console.log(scene);
        }
}

export default Camera;