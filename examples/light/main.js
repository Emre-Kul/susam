/* GLOBALS */
const G = {
 KEY : {},
 lz : 0,
 lx : 0
};

/* CREATION FUNCS */
function createGame() {
 const scene = new GE.Scene(new GE.FpsCamera(0.1, new GE.Vector3(0, 10, 3), new GE.Vector3(0, 0, -50)));
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
 G.game.resourceManager.loadObject("obj-sphere", "assets/objects/sphere.obj");
 G.game.resourceManager.loadTexture("texture-cube1", "assets/img/cube1.png");
 G.game.resourceManager.loadTexture("texture-cube2", "assets/img/cube2.jpg");
 G.game.resourceManager.loadTexture("texture-cube3", "assets/img/cube3.jpg");
 G.game.resourceManager.loadTexture("texture-grass", "assets/img/grass.jpg");
 G.game.resourceManager.loadTexture("texture-ytu", "assets/img/ytu.jpg");
}

function createObjects() {
 createLight(G.game);
 createRandomObj(G.game);
 G.game.sortObjectsByCamera(1);
}

function render() {
 moveLight();
 G.game.render();
 G.game.run(render);
}



const moveLight = () => {

 if(G.KEY["ArrowUp"]){
  G.lz += - 1;
 }
 if(G.KEY["ArrowDown"]){
  G.lz += 1;
 }
 if(G.KEY["ArrowLeft"]){
  G.lx += -1;
 }
 if(G.KEY["ArrowRight"]){
  G.lx += 1;
 }

 G.game.scene.light.position = GE.Vector3.create(G.lx, G.game.scene.light.position.y, G.lz);
 G.game.objects[0].transform.position = G.game.scene.light.position;

};

function init() {
 createGame();
 createListeners();
 loadResources();
 createObjects();
 G.game.run(render);
}


window.onload = init;
