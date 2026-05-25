import * as THREE from 'https://esm.sh/three@0.169.0';

import { OrbitControls }
from 'https://esm.sh/three@0.169.0/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader }
from 'https://esm.sh/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';



// ======================================================
// ESCENA
// ======================================================
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x222222);



// ======================================================
// CAMARA
// ======================================================
const camera = new THREE.PerspectiveCamera(

    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000

);

camera.position.set(0, 2, 5);



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



// ======================================================
// AGREGAR CANVAS
// ======================================================
document
    .getElementById('container3d')
    .appendChild(renderer.domElement);



// ======================================================
// CONTROLES
// ======================================================
const controls = new OrbitControls(

    camera,
    renderer.domElement

);

controls.enableDamping = true;



// ======================================================
// LUCES
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



// ======================================================
// GRID
// ======================================================
const grid = new THREE.GridHelper(

    100,
    100

);

scene.add(grid);



// ======================================================
// CARGAR MODELO GLB
// ======================================================
const loader = new GLTFLoader();

loader.load(

    './assets/models/Aulay8.glb',

    function(gltf){

        console.log('MODELO CARGADO');

        const model = gltf.scene;



        // ==============================================
        // ESCALA
        // ==============================================
        model.scale.set(1, 1, 1);



        // ==============================================
        // POSICION
        // ==============================================
        model.position.set(0, 0, 0);



        // ==============================================
        // SOMBRAS Y MATERIALES
        // ==============================================
        model.traverse((child) => {

            if(child.isMesh){

                child.castShadow = true;

                child.receiveShadow = true;

                child.material.side = THREE.DoubleSide;

            }

        });



        // ==============================================
        // AGREGAR A ESCENA
        // ==============================================
        scene.add(model);



        // ==============================================
        // CENTRAR
        // ==============================================
        const box = new THREE.Box3()
            .setFromObject(model);

        const center = box.getCenter(
            new THREE.Vector3()
        );



        model.position.x -= center.x;

        model.position.z -= center.z;

        model.position.y -= box.min.y;



        // ==============================================
        // AJUSTAR CAMARA
        // ==============================================
        const size = box.getSize(
            new THREE.Vector3()
        );



        camera.position.set(

            0,
            size.y,
            size.z * 2

        );



        controls.target.set(

            0,
            size.y / 2,
            0

        );



        controls.update();

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
// ANIMACION
// ======================================================
function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(

        scene,
        camera

    );

}

animate();