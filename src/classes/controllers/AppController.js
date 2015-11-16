import THREE from 'three';
import Cube3D from '../components/Cube3D';

class AppController {
    
    constructor(selector) {

        this.selector = selector;
        this.elements = [];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 5; 

        this.renderer = new THREE.WebGLRenderer();

        this.selector.appendChild( this.renderer.domElement );
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this), false);

        this.addElement(new Cube3D());
        this.render();
    }

    addElement(element) {
        this.elements.push(element);
        element.place(this.scene);
    }

    handleResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.elements.forEach(function(element) {
            element.render();
        });
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

export default AppController;