/* GLOBALS */

const CUBE_COUNT = 1000;
const WORLD_SIZE = 100;
const G = {
  KEY : {}
};

/* CREATION FUNCS */
function createScene() {
  G.scene = new GE.Scene(new GE.FpsCamera(0.1));
  G.scene.init();
  G.scene.clear();
}

function createListeners() {
  window.addEventListener('resize', G.scene.resize);
  document.onkeydown = (e) => { G.KEY[e.key] = true };
  document.onkeyup = (e) => { G.KEY[e.key] = false };
  document.addEventListener('click', G.scene.setFullScreen);
}

function loadResources() {
  G.scene.resourceManager.loadShader("shader-default", "vertex-shader", "fragment-shader");
  G.scene.resourceManager.loadTexture("texture-js", document.getElementById("js-texture"));
  G.scene.resourceManager.loadTexture("texture-ytu", document.getElementById("ytu-texture"));
  G.scene.resourceManager.loadTexture("texture-cube1", document.getElementById("cube1-texture"));
  G.scene.resourceManager.loadTexture("texture-cube2", document.getElementById("cube2-texture"));
  G.scene.resourceManager.loadTexture("texture-skybox", document.getElementById("skybox-texture"));
  G.scene.resourceManager.loadTexture("texture-cube4", document.getElementById("cube4-texture"));
}

function randomTexture() {
  const textureIds = ["texture-cube1", "texture-cube2", "texture-cube4", "texture-ytu", "texture-js"];
  return textureIds[Math.floor(Math.random() * textureIds.length)];

}

function createObjects() {

  G.objects = [];
  const cube = new GE.Cube();
  cube.createMesh();
  const shader = G.scene.resourceManager.getShader("shader-default");
  for(let i = 0;i < CUBE_COUNT;i++){
   const texture = G.scene.resourceManager.getTexture(randomTexture());
   const color = new GE.Color();
   color.setRandom();
   const transform = new GE.Transform();
   transform.position = GE.Vector3.create(WORLD_SIZE / 2 - Math.random() * WORLD_SIZE, WORLD_SIZE / 2 - Math.random() * WORLD_SIZE, WORLD_SIZE / 2 - Math.random() * WORLD_SIZE);


   // transform.position = GE.Vector3.create(rand * i, 0, 0);
   // transform.scale = GE.Vector3.create(rand, rand, rand);
   let obj;
   if(i % 2 === 0){
    obj = new GE.GameObject(transform, cube.mesh, shader, new GE.TextureMaterial(texture));
   }
   else {
    obj = new GE.GameObject(transform, cube.mesh, shader, new GE.ColorMaterial(color));
   }

   G.objects.push(obj);
  }


}

function render() {
  moveCamera();
  G.scene.clear();
  for(let i = 0;i < G.objects.length;i++) {
   const r = G.objects[i].transform.rotate;
   const p = G.objects[i].transform.position;
   if(i%2 === 0) G.objects[i].transform.rotate = new GE.Vector3(r.x + Math.random(), r.y + Math.random(), r.z + Math.random());
   if(G.KEY["c"]) G.objects[i].transform.position = GE.Physics.move(p, GE.Vector3.create(), 0.1);
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
  my = 1;
 }
 if(G.KEY["s"]){
  my = -1;
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
  G.scene.camera.point2(lx, ly);
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
