/* GLOBALS */

const CUBE_COUNT = 100;
const WORLD_SIZE = 5;
const G = {
  KEY : {},
};

/* CREATION FUNCS */
function createGame() {
  const scene = new GE.Scene(new GE.FpsCamera(0.1));
  G.game = new GE.Game(scene);
  G.game.init();
  G.game.scene.clear();
}

function createListeners() {
  window.addEventListener('resize', G.game.scene.resize);
  document.onkeydown = (e) => { G.KEY[e.key] = true };
  document.onkeyup = (e) => { G.KEY[e.key] = false };
  document.addEventListener('click', G.game.scene.setFullScreen);
}

function loadResources() {
  G.game.resourceManager.loadShader("shader-default", "assets/shaders/");
  G.game.resourceManager.loadTexture("texture-ytu", "assets/ytu-logo.jpg");
  G.game.resourceManager.loadTexture("texture-js", "assets/js-logo.png");
  G.game.resourceManager.loadTexture("texture-cube1", "assets/cube1.png");
  G.game.resourceManager.loadTexture("texture-cube2", "assets/cube2.jpg");
  G.game.resourceManager.loadTexture("texture-skybox", "assets/skybox.jpg");
  G.game.resourceManager.loadTexture("texture-cube4", "assets/cube4.jpg");
}

function randomTexture() {
  const textureIds = ["texture-cube1", "texture-cube2", "texture-cube4", "texture-ytu", "texture-js"];
  return textureIds[Math.floor(Math.random() * textureIds.length)];
}

function createObjects() {
  const cube = new GE.CubeGeometry();
  const shader = G.game.resourceManager.getShader("shader-default");

  G.LIGHT_OBJ = new GE.GameObject(new GE.Transform(), cube.getMesh(), shader, new GE.ColorMaterial(new GE.Color()), new GE.Body());
  G.LIGHT_OBJ.material.applyLighting = false;
  G.game.addObject(G.LIGHT_OBJ);

  for(let i = 1;i < CUBE_COUNT;i++){
   const texture = G.game.resourceManager.getTexture(randomTexture());
   const color = new GE.Color();
   color.setRandom();
   const transform = new GE.Transform();
   transform.position = GE.Vector3.create(WORLD_SIZE / 2 - Math.random() * WORLD_SIZE, WORLD_SIZE / 2 - Math.random() * WORLD_SIZE, WORLD_SIZE / 2 - Math.random() * WORLD_SIZE);

   let obj;
   if(i % 2 === 0){
    obj = new GE.GameObject(transform, cube.getMesh(), shader, new GE.TextureMaterial(texture));
   }
   else {
    obj = new GE.GameObject(transform, cube.getMesh(), shader, new GE.ColorMaterial(color));
   }
   // obj.material.applyLighting = false;
   G.game.addObject(obj);
  }



}

function render() {
  moveCamera();
  for(let i = 1;i < G.game.objects.length;i++) {
   const r = G.game.objects[i].transform.rotate;
   const p = G.game.objects[i].transform.position;
   if (i % 2 === 0) G.game.objects[i].transform.rotate = new GE.Vector3(r.x + Math.random(), r.y + Math.random(), r.z + Math.random());
   if (G.KEY["c"]) G.game.objects[i].transform.position = GE.Physics.move(p, GE.Vector3.create(), 0.1);
  }
  G.game.render();
  G.game.run(render);
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
  G.game.scene.light.position = GE.Physics.move(G.game.scene.light.position, new GE.Vector3(0, 0, 100), 1);
 }
 if(G.KEY["l"]){
  G.game.scene.light.position = GE.Physics.move(G.game.scene.light.position, new GE.Vector3(0, 0, -100), 1);
 }
 // G.LIGHT_OBJ.transform.position = G.game.scene.light.position;


 if(lx !== 0 || ly !== 0 || mx !== 0 || my !== 0){
  G.game.scene.camera.point2(lx, ly);
  G.game.scene.camera.moveForward(my);
 }

};

function init() {
  createGame();
  createListeners();
  loadResources();
  createObjects();
  G.game.run(render);
}


window.onload = init;
