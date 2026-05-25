## 🎮 FPS Three.js - Simulador de Colisiones 3D

Este proyecto es un entorno interactivo en primera persona desarrollado con **Three.js**, donde el usuario puede recorrer un escenario tridimensional y lanzar esferas verdes con físicas y colisiones en tiempo real.

El sistema implementa detección de colisiones avanzada mediante `Octree` y `Capsule`, optimizando el rendimiento y permitiendo movimientos fluidos dentro del entorno 3D.

---

## 🚀 Características Principales

- **Movimiento FPS Completo**
  - Cámara en primera persona.
  - Movimiento con teclado `W A S D`.
  - Salto con `SPACE`.
  - Control de cámara con el mouse mediante *Pointer Lock*.

- **Sistema de Colisiones**
  - Uso de `Octree` para las colisiones del escenario.
  - Uso de `Capsule` para el collider del jugador.
  - Física optimizada para navegación en tiempo real.

- **Sistema de Proyectiles**
  - Lanzamiento de esferas 3D.
  - Proyectiles con físicas dinámicas.
  - Rebotes contra el entorno y otros objetos.
  - Color verde personalizado para todas las esferas.

- **Renderizado Avanzado**
  - Sombras dinámicas.
  - Iluminación direccional y ambiental.
  - Niebla atmosférica para profundidad visual.

---

## 🛠️ Tecnologías Utilizadas

![Three.js](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![WebGL](https://img.shields.io/badge/WebGL-990000?style=for-the-badge&logo=webgl&logoColor=white)

### 📊 Porcentaje de Uso

- **JavaScript (Lógica y físicas):** 85%
- **HTML5/CSS3 (Estructura e interfaz):** 15%

---

## 🎮 Controles

| Acción | Control |
|---|---|
| Moverse | W A S D |
| Saltar | SPACE |
| Mirar alrededor | Mouse |
| Lanzar esfera | Click Izquierdo |

---

## 👨‍💻 Información del Desarrollador

- **Nombre:** Agustin Modce Granados Martinez
- **Universidad:** Instituto Tecnológico de Pachuca
- **Carrera:** Ingeniería en Sistemas Computacionales

---

## 📂 Estructura del Proyecto

```text
📦 THREEJS-3D-GAME
 ┣ 📂 assets
 ┃ ┣ 📂 build
 ┃ ┃ ┣ 📜 three.core.js
 ┃ ┃ ┗ 📜 three.module.js
 ┃ ┣ 📂 css
 ┃ ┃ ┗ 📜 style.css
 ┃ ┣ 📂 js
 ┃ ┃ ┗ 📜 main.js
 ┃ ┣ 📂 jsm
 ┃ ┃ ┣ 📂 helpers
 ┃ ┃ ┃ ┗ 📜 OctreeHelper.js
 ┃ ┃ ┣ 📂 libs
 ┃ ┃ ┃ ┣ 📜 lil-gui.module.min.js
 ┃ ┃ ┃ ┗ 📜 stats.module.js
 ┃ ┃ ┣ 📂 loaders
 ┃ ┃ ┃ ┗ 📜 GLTFLoader.js
 ┃ ┃ ┣ 📂 math
 ┃ ┃ ┃ ┣ 📜 Capsule.js
 ┃ ┃ ┃ ┗ 📜 Octree.js
 ┃ ┃ ┗ 📂 utils
 ┃ ┃   ┣ 📜 BufferGeometryUtils.js
 ┃ ┃   ┗ 📜 SkeletonUtils.js
 ┃ ┗ 📂 models
 ┃   ┗ 📂 gltf
 ┃     ┗ 📦 collision-world.glb
 ┗ 📜 index.html