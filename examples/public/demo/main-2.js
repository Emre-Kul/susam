/* GLOBALS */
const CUBE_COUNT = 2000;
const RAND_VAL = 50;
const G = {
  KEY : {}
};

/* CREATION FUNCS */
function createScene() {
  G.scene = new GE.Core.Scene(new GE.Core.FpsCamera(0.1));
  G.scene.init();
  G.scene.clear();
}

function createListeners() {
  window.addEventListener('resize', G.scene.resize.bind(G.scene));
  document.onkeydown = (e) => { G.KEY[e.key] = true };
  document.onkeyup = (e) => { G.KEY[e.key] = false };
}

function loadResources() {
  G.scene.loadShader("shader-default", "vertex-shader", "fragment-shader");
  G.scene.loadTexture("texture-js", document.getElementById("js-texture"));
  G.scene.loadTexture("texture-ytu", document.getElementById("ytu-texture"));
  G.scene.loadTexture("texture-cube1", document.getElementById("cube1-texture"));
  G.scene.loadTexture("texture-cube2", document.getElementById("cube2-texture"));
  G.scene.loadTexture("texture-skybox", document.getElementById("skybox-texture"));
  G.scene.loadTexture("texture-cube4", document.getElementById("cube4-texture"));
}

function randomTexture() {
  const textureIds = ["texture-cube1", "texture-cube2", "texture-cube4", "texture-ytu", "texture-js"];
  return textureIds[Math.floor(Math.random() * textureIds.length)];
}

function createObjects() {

  G.objects = [];
  const cube = new GE.Physics.Cube();
  cube.createMesh();
  const shader = G.scene.resourceManager.resources["shader-default"];
  for(let i = 0;i < CUBE_COUNT;i++){
   const texture = G.scene.resourceManager.resources[randomTexture()];
   const transform = new GE.Core.Transform();
   const rand = Math.random() * 2;

   transform.position = GE.Math.Vector3.create(RAND_VAL / 2 - Math.random() * RAND_VAL, RAND_VAL / 2 - Math.random() * RAND_VAL, RAND_VAL / 2 - Math.random() * RAND_VAL);
   // transform.position = GE.Math.Vector3.create(rand * i, 0, 0);
   // transform.scale = GE.Math.Vector3.create(rand, rand, rand);
   const obj = new GE.Core.GameObject(transform, cube.mesh, texture, shader);
   G.objects.push(obj);
  }
  G.objects[0].transform.position = GE.Math.Vector3.create();
  G.objects[0].transform.scale = GE.Math.Vector3.create(RAND_VAL * 10, RAND_VAL * 10, RAND_VAL * 10);
  G.objects[0].texture = G.scene.resourceManager.resources["texture-skybox"];


}

function render() {
  moveCamera();
  G.objects[0].render(G.scene);
  for(let i = 1;i < G.objects.length;i++) {
   const r = G.objects[i].transform.rotate;
   const p = G.objects[i].transform.position;
   G.objects[i].transform.rotate = new GE.Math.Vector3(r.x + Math.random(), r.y + Math.random(), r.z + Math.random());
   // object.transform.position = GE.Math.Vector3.create(p.x, p.y, - Math.random() * 10);
   G.objects[i].render(G.scene);
  }
  G.scene.run(render);
}

const moveCamera = () => {
 let lx = 0,ly = 0;
 let mx = 0,my = 0;
 if(G.KEY["a"]){
  mx = -0.1;
 }
 if(G.KEY["w"]){
  my = -1;
 }
 if(G.KEY["s"]){
  my = 1;
 }
 if(G.KEY["d"]){
  mx = 0.1;
 }
 if(G.KEY["ArrowLeft"]){
  lx = 10;
 }
 if(G.KEY["ArrowUp"]){
  ly = 10;
 }
 if(G.KEY["ArrowDown"]){
  ly = -10;
 }
 if(G.KEY["ArrowRight"]){
  lx = -10;
 }
 if(lx !== 0 || ly !== 0 || mx !== 0 || my !== 0){
  G.scene.camera.point(GE.Math.Vector3.create(lx, ly, 0));
  G.scene.camera.moveForward(my);
 }

};

function init() {
  createScene();
  createListeners();
  loadResources();
  createObjects();
  G.scene.run(render);
}

window.onload = init;
// window.addEventListener('resize', () => {alert("OK")});
