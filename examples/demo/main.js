/* GLOBALS */
const G = {
 KEY : {},
};

/* CREATION FUNCS */
function createGame() {
 const scene = new GE.Scene(new GE.FpsCamera(0.1, new GE.Vector3(0, 0.5, 5), new GE.Vector3(0, 0.5, -5)));
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
 G.game.resourceManager.loadObject("obj-cube", "assets/objects/cube.obj");
 G.game.resourceManager.loadObject("obj-teapot", "assets/objects/teapot.obj");
 G.game.resourceManager.loadObject("obj-elephant", "assets/objects/elephant.obj");
 G.game.resourceManager.loadObject("obj-skybox", "assets/objects/skybox.obj");
 G.game.resourceManager.loadObject("obj-sphere", "assets/objects/sphere.obj");
 G.game.resourceManager.loadTexture("texture-cube1", "assets/img/cube1.png");
 G.game.resourceManager.loadTexture("texture-cube2", "assets/img/cube2.jpg");
 G.game.resourceManager.loadTexture("texture-cube3", "assets/img/cube3.jpg");
 G.game.resourceManager.loadTexture("texture-grass", "assets/img/grass.jpg");
 G.game.resourceManager.loadTexture("texture-ytu", "assets/img/ytu.jpg");
 G.game.resourceManager.loadTexture("texture-skybox", "assets/img/skybox-large.png");
 G.game.resourceManager.loadTexture("texture-ground", "assets/img/ground2.jpg");
}

function createObjects() {
 createSkybox(G.game);
 createGround(G.game);
 createRandomObj(G.game);
 createLight(G.game);
 createTeaPot(G.game);
 createElephant(G.game);
 G.game.sortObjectsByCamera(2);
}

function render() {
 moveCamera();
 controlHit();
 G.game.render();
 G.game.run(render);
}


const controlHit = () => {
 const id = G.game.world.rayCast(G.game.scene.camera.eye, G.game.scene.camera.target);
 if(id) {
  const obj = G.game.getObjectByBodyId(id);
  const force = GE.Vector3.subtract(G.game.scene.camera.target, G.game.scene.camera.eye);
  force.multiply(GE.Vector3.create(0.1, 0, 0.1));
  force.normalize();
  obj.body.applyForce(force, GE.Vector3.create());
 }
};

const moveCamera = () => {
 let lx = 0,ly = 0;
 let mx = 0,my = 0;
 let speed = 0.1;

 if(G.KEY["Shift"]){
  speed = 1;
 }
 if(G.KEY["a"]){
  mx = speed;
 }
 if(G.KEY["w"]){
  my = speed;
 }
 if(G.KEY["s"]){
  my = -speed;
 }
 if(G.KEY["d"]){
  mx = -speed;
 }
 if(G.KEY["ArrowLeft"]){
  lx = 1;
 }
 if(G.KEY["ArrowUp"]){
  ly = -1;
 }
 if(G.KEY["ArrowDown"]){
  ly = 1;
 }
 if(G.KEY["ArrowRight"]){
  lx = -1;
 }

 if(lx !== 0 || ly !== 0 || mx !== 0 || my !== 0){
  G.game.scene.camera.point(lx, ly);
  G.game.scene.camera.moveForward(my);
  G.game.scene.camera.moveSide(mx);
  G.game.sortObjectsByCamera(2);
  const t = G.game.scene.camera.target;
  const e = G.game.scene.camera.eye;
  // console.log(GE.Vector3.subtract(t, e).length2());
 }

 // G.game.objects[2].transform.position = G.game.scene.camera.target;

};

function init() {
 createGame();
 createListeners();
 loadResources();
 createObjects();
 G.game.run(render);
}


window.onload = init;
