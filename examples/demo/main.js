/* GLOBALS */

const CUBE_COUNT = 100;
const WORLD_SIZE = 5;
const G = {
  KEY : {},
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
  G.scene.resourceManager.loadShader("shader-default", "assets/shaders/");
  G.scene.resourceManager.loadTexture("texture-ytu", "assets/ytu-logo.jpg");
  G.scene.resourceManager.loadTexture("texture-js", "assets/js-logo.png");
  G.scene.resourceManager.loadTexture("texture-cube1", "assets/cube1.png");
  G.scene.resourceManager.loadTexture("texture-cube2", "assets/cube2.jpg");
  G.scene.resourceManager.loadTexture("texture-skybox", "assets/skybox.jpg");
  G.scene.resourceManager.loadTexture("texture-cube4", "assets/cube4.jpg");
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

  G.LIGHT_OBJ = new GE.GameObject(new GE.Transform(), cube.mesh, shader, new GE.ColorMaterial(new GE.Color()) );
  G.LIGHT_OBJ.material.applyLighting = false;

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
   // obj.material.applyLighting = false;
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
  G.LIGHT_OBJ.render(G.scene);
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
 if(G.KEY["o"]){
  G.scene.light.position = GE.Physics.move(G.scene.light.position, new GE.Vector3(0, 0, 100), 1);
 }
 if(G.KEY["l"]){
  G.scene.light.position = GE.Physics.move(G.scene.light.position, new GE.Vector3(0, 0, -100), 1);
 }
 G.LIGHT_OBJ.transform.position = G.scene.light.position;


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
