/* GENERAL_DEFINATIONS */
const CUBE_COUNT = 2;
const KEY_STATUS = {};
const MOUSE = {
 x : 0,
 y : 0
};
let shader, cubes, renderer, scene, canvas;
/* LISTENERS */


/* DRAW */


const render = () => {
 moveCamera();
 scene.clear();
 renderCubes();
 scene.run(render);
};

const createCubes = () => {
 cubes = new Array(CUBE_COUNT);
 let meshes = new Array(CUBE_COUNT);
 let z = 0;
 for(let i = 0;i < CUBE_COUNT;i ++){
  cubes[i] = new GE.Physics.Cube();
  cubes[i].createMesh();
  cubes[i].mesh.transform.position = GE.Math.Vector3.create(i % 10 * 4, 0, z);
  // cubes[i].mesh.transform.scale = GE.Math.Vector3.create(i % 2 + 1, i % 2 + 1, i % 2 + 1);
  // cubes[i].mesh.color.setRandom();
  if(i % 2 === 0){
   cubes[i].mesh.texture = scene.textures['ytu-texture'];
   cubes[i].mesh.color.setYellow();
  }
  else {
   cubes[i].mesh.texture = scene.textures['js-texture'];
   cubes[i].mesh.color.setRed();
  }

  meshes[i] = cubes[i].mesh;
  if(i % 10 === 0){
   z -= 5;
  }
 }
 renderer = new GE.Core.MeshRenderer(meshes, shader, scene.camera.viewMatrix, scene.camera.projectionMtr);
 renderer.init();
};

const renderCubes = () => {
 const r = cubes[0].mesh.transform.rotate;
 // cubes[0].mesh.transform.position = scene.camera.target;
 // cubes[0].mesh.transform.scale = GE.Math.Vector3.create(0.2, 0.2, 0.2);
 // const r = cubes[0].mesh.transform.rotate;
 cubes[0].mesh.transform.rotate = GE.Math.Vector3.create(r.x + 0.2, r.y + 0.2, r.z + 0.2);

 renderer.render();
};

const moveCamera = () => {
 let lx = 0,ly = 0;
 let mx = 0,my = 0;
 if(KEY_STATUS["a"]){
  mx = -0.1;
 }
 if(KEY_STATUS["w"]){
  my = -0.1;
 }
 if(KEY_STATUS["s"]){
  my = 0.1;
 }
 if(KEY_STATUS["d"]){
  mx = 0.1;
 }
 if(KEY_STATUS["ArrowLeft"]){
  lx = 10;
 }
 if(KEY_STATUS["ArrowUp"]){
  ly = 10;
 }
 if(KEY_STATUS["ArrowDown"]){
  ly = -10;
 }
 if(KEY_STATUS["ArrowRight"]){
  lx = -10;
 }
 if(lx !== 0 || ly !== 0 || mx !== 0 || my !== 0){
  scene.camera.point(GE.Math.Vector3.create(lx, ly, 0));
  scene.camera.move(GE.Math.Vector3.create(mx, 0, my));
  // console.log(scene.camera);
  renderer.viewMtr = scene.camera.viewMatrix;
 }

};

window.onload = init;

