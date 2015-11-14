import THREE from 'three';

class Cube3D {

    constructor() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0x330000});
        this.mesh = new THREE.Mesh( geometry, material );
    }

    place(scene) {
        scene.add(this.mesh);
    }

    render() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }
    
}

export default Cube3D;