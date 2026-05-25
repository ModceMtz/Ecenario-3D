// assets/js/main.js



// ======================================================
// IMPORTACIONES
// ======================================================
import * as THREE from 'https://esm.sh/three@0.169.0';

import { PointerLockControls }
from 'https://esm.sh/three@0.169.0/examples/jsm/controls/PointerLockControls.js';

import { GLTFLoader }
from 'https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';

import { VRButton }
from 'https://esm.sh/three@0.169.0/examples/jsm/webxr/VRButton.js';



// ======================================================
// ESCENA
// ======================================================
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x444444);

scene.fog = new THREE.Fog(
    0x444444,
    20,
    300
);



// ======================================================
// CAMARA
// ======================================================
const camera = new THREE.PerspectiveCamera(

    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000

);

camera.position.set(0, 1.7, 5);



// ======================================================
// RENDERER
// ======================================================
const renderer = new THREE.WebGLRenderer({

    antialias: true

});

renderer.setSize(

    window.innerWidth,
    window.innerHeight

);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.xr.enabled = true;

document
    .getElementById('container3d')
    .appendChild(renderer.domElement);



// ======================================================
// BOTON VR
// ======================================================
document.body.appendChild(

    VRButton.createButton(renderer)

);



// ======================================================
// CONTROLES FPS
// ======================================================
const controls = new PointerLockControls(

    camera,
    document.body

);



// ======================================================
// CLICK PARA BLOQUEAR MOUSE
// ======================================================
document.addEventListener(

    'click',

    () => {

        controls.lock();

    }

);



// ======================================================
// MOVIMIENTO
// ======================================================
const keys = {

    w: false,
    a: false,
    s: false,
    d: false

};



// ======================================================
// TECLAS PRESIONADAS
// ======================================================
document.addEventListener(

    'keydown',

    (event) => {

        switch(event.key.toLowerCase()){

            case 'w':
                keys.w = true;
                break;

            case 'a':
                keys.a = true;
                break;

            case 's':
                keys.s = true;
                break;

            case 'd':
                keys.d = true;
                break;

        }

    }

);



// ======================================================
// TECLAS SOLTADAS
// ======================================================
document.addEventListener(

    'keyup',

    (event) => {

        switch(event.key.toLowerCase()){

            case 'w':
                keys.w = false;
                break;

            case 'a':
                keys.a = false;
                break;

            case 's':
                keys.s = false;
                break;

            case 'd':
                keys.d = false;
                break;

        }

    }

);



// ======================================================
// ILUMINACION
// ======================================================
const ambientLight = new THREE.AmbientLight(

    0xffffff,
    3

);

scene.add(ambientLight);



const directionalLight = new THREE.DirectionalLight(

    0xffffff,
    5

);

directionalLight.position.set(10, 20, 10);

scene.add(directionalLight);



const hemiLight = new THREE.HemisphereLight(

    0xffffff,
    0x444444,
    5

);

scene.add(hemiLight);



// ======================================================
// GRID
// ======================================================
const grid = new THREE.GridHelper(

    100,
    100

);

scene.add(grid);



// ======================================================
// SUELO
// ======================================================
const floorGeometry = new THREE.PlaneGeometry(

    500,
    500

);

const floorMaterial = new THREE.MeshStandardMaterial({

    color: 0x777777

});

const floor = new THREE.Mesh(

    floorGeometry,
    floorMaterial

);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);



// ======================================================
// CARGAR MODELO
// ======================================================
const loader = new GLTFLoader();

loader.load(

    './assets/models/Aulay8.glb',

    function(gltf){

        const model = gltf.scene;



        // ==============================================
        // DEBUG
        // ==============================================
        console.log(model);



        // ==============================================
        // ESCALA
        // ==============================================
        model.scale.set(1, 1, 1);



        // ==============================================
        // POSICION
        // ==============================================
        model.position.set(0, 0, 0);



        // ==============================================
        // ROTACION
        // ==============================================
        model.rotation.set(0, 0, 0);



        // ==============================================
        // HACER VISIBLES TODOS LOS MATERIALES
        // ==============================================
        model.traverse((child) => {

            if(child.isMesh){

                child.material.side = THREE.DoubleSide;

                child.material.transparent = false;

                child.material.opacity = 1;

                console.log(child);

            }

        });



        // ==============================================
        // AGREGAR
        // ==============================================
        scene.add(model);



        // ==============================================
        // CAJA
        // ==============================================
        const box = new THREE.Box3()
            .setFromObject(model);

        console.log(box);



        // ==============================================
        // TAMAÑO
        // ==============================================
        const size = box.getSize(
            new THREE.Vector3()
        );

        console.log(size);



        // ==============================================
        // CENTRO
        // ==============================================
        const center = box.getCenter(
            new THREE.Vector3()
        );

        console.log(center);



        // ==============================================
        // CENTRAR
        // ==============================================
        model.position.x -= center.x;

        model.position.z -= center.z;

        model.position.y -= box.min.y;



        // ==============================================
        // CAMARA
        // ==============================================
        camera.position.set(

            0,
            size.y,
            size.z * 2

        );



        controls.getObject().position.set(

            0,
            1.7,
            size.z * 2

        );



        console.log('MODELO CARGADO');

    },



    function(xhr){

        console.log(
            (xhr.loaded / xhr.total * 100)
            + '% cargado'
        );

    },



    function(error){

        console.error(error);

    }

);



// ======================================================
// VELOCIDAD
// ======================================================
const speed = 0.1;



// ======================================================
// DIRECCION
// ======================================================
const direction = new THREE.Vector3();



// ======================================================
// ANIMACION
// ======================================================
function animate(){

    // ==============================================
    // ADELANTE
    // ==============================================
    if(keys.w){

        controls.moveForward(speed);

    }



    // ==============================================
    // ATRAS
    // ==============================================
    if(keys.s){

        controls.moveForward(-speed);

    }



    // ==============================================
    // IZQUIERDA
    // ==============================================
    if(keys.a){

        controls.moveRight(-speed);

    }



    // ==============================================
    // DERECHA
    // ==============================================
    if(keys.d){

        controls.moveRight(speed);

    }



    // ==============================================
    // ALTURA FIJA
    // ==============================================
    camera.position.y = 1.7;



    renderer.render(

        scene,
        camera

    );

}



// ======================================================
// RESPONSIVE
// ======================================================
window.addEventListener(

    'resize',

    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,
            window.innerHeight

        );

    }

);



// ======================================================
// LOOP VR
// ======================================================
renderer.setAnimationLoop(animate);