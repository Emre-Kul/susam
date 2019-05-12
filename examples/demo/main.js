/* GLOBALS */
const G = {
  KEY : {},
};

/* CREATION FUNCS */
function createGame() {
  const scene = new GE.Scene(new GE.FpsCamera(0.1, new GE.Vector3(0, 0, 5), new GE.Vector3(0, 0, -5)));
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
  G.game.resourceManager.loadTexture("texture-cube1", "assets/cube1.png");
  G.game.resourceManager.loadTexture("texture-cube2", "assets/cube2.jpg");
  G.game.resourceManager.loadTexture("texture-skybox", "assets/skybox.jpg");
  G.game.resourceManager.loadTexture("texture-grass", "assets/grass.jpg");
}

function createObjects() {
 createGround(G.game);
 createRandomObj(G.game, 100);
 createLight(G.game);
 G.game.sortObjectsByCamera(1);
}

function render() {
  moveCamera();
  G.game.render();
  G.game.run(render);
}

const moveCamera = () => {
 let lx = 0,ly = 0;
 let mx = 0,my = 0;
 if(G.KEY["a"]){
  mx = 0.05;
 }
 if(G.KEY["w"]){
  my = 0.05;
 }
 if(G.KEY["s"]){
  my = -0.05;
 }
 if(G.KEY["d"]){
  mx = -0.05;
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
  G.game.sortObjectsByCamera(1);
  const t = G.game.scene.camera.target;
  const e = G.game.scene.camera.eye;
  console.log(GE.Vector3.subtract(t, e).length2());
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
