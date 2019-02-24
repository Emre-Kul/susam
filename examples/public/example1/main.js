/* GENERAL_DEFINATIONS */
const CUBE_COUNT = 1000;
const KEY_STATUS = {};
const MOUSE = {
 x : 0,
 y : 0
};
let shader, cubes, renderer, scene;
/* LISTENERS */

function eventKeyDown(e) {
 console.log("Key Down : " , e);
 KEY_STATUS[e.key] = true;
}

function eventKeyUp(e) {
 console.log("Key Up: " , e);
 KEY_STATUS[e.key] = false;
}

function eventMouseClick(e) {
 e.preventDefault();
 e.stopPropagation();
}

function eventMouseMove(e) {
 e.preventDefault();
 e.stopPropagation();

 MOUSE.x = (e.x - e.target.offsetLeft) / 600;
 MOUSE.y = (e.y - e.target.offsetTop) / 600;
}

const initListeners = () => {
 const canvas = document.getElementById("ge-canvas");
 document.onkeydown = eventKeyDown;
 document.onkeyup = eventKeyUp;
 canvas.onmousedown = eventMouseClick;
 canvas.onmousemove = eventMouseMove;
};
/* DRAW */
const init = function () {
  initListeners();
  scene = new GE.Core.Scene();
  scene.init();
  shader = new GE.Core.Shader(scene.gl.context, "vertex-shader", "fragment-shader");
  createCubes();
  scene.run(render);
};

const render = () => {
 scene.clear();
 moveCamera();
 renderCubes();
 scene.run(render);
};

const createCubes = () => {
 cubes = new Array(CUBE_COUNT);
 let meshes = new Array(CUBE_COUNT);
 for(let i = 0;i < CUBE_COUNT;i ++){
  cubes[i] = new GE.Physics.Cube();
  cubes[i].createMesh();
  cubes[i].mesh.transform.position = GE.Math.Vector3.create(0, 5 - i * 1.5, -10);
  cubes[i].mesh.color.setRandom();
  meshes[i] = cubes[i].mesh;
 }
 renderer = new GE.Core.MeshRenderer(meshes, shader, scene.camera.viewMatrix, scene.camera.projectionMtr);
 renderer.init();
 console.log(meshes);
};

const renderCubes = () => {
 for(let i = 0;i < CUBE_COUNT / 2;i ++){
  const r = cubes[i].mesh.transform.rotate;
  cubes[i].mesh.transform.rotate = GE.Math.Vector3.create(
    r.x + Math.random() * 0.5,
    r.y + Math.random() * 0.5,
    r.z + Math.random() * 0.5);
 }
 renderer.render();
};

const moveCamera = () => {
 let x = 0,y = 0;
 if(KEY_STATUS["a"]){
  x = 0.1;
 }
 if(KEY_STATUS["w"]){
  y = -0.1;
 }
 if(KEY_STATUS["s"]){
  y = 0.1;
 }
 if(KEY_STATUS["d"]){
  x = -0.1;
 }
 if(x !== 0 || y !== 0){
  scene.camera.target = GE.Math.Vector3.create(scene.camera.target.x + x, scene.camera.target.y + y, 0);
  renderer.viewMtr = scene.camera.viewMatrix;
 }

};

window.onload = init;

