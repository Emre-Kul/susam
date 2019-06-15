/* GLOBALS */

const G = {
 stage: 0,
 KEY : {},
};

/* CREATION FUNCS */
function createGame() {
 const scene = new GE.Scene();
 G.game = new GE.Game(scene);
 G.game.init();
 G.game.scene.clear();
}

function createListeners() {
 window.addEventListener('resize', G.game.scene.resize);
 document.addEventListener('click', G.game.scene.setFullScreen);
}

function loadResources() {
 G.game.resourceManager.loadShader("shader-default", "assets/shaders/");
 G.game.resourceManager.loadObject("obj-teapot", "assets/objects/teapot.obj");
}

function createObjects() {
 createTeaPot(G.game);
}

function render() {
 keyPress();
 G.game.render();
 G.game.run(render);
}

const keyPress = () => {
 document.onkeydown = () => { G.stage++ };

 const r = G.game.objects[0].transform.rotate;
 const s = G.game.objects[0].transform.scale;
 const p = G.game.objects[0].transform.position;

 if(G.stage > 0 && s.x < 1.25) G.game.objects[0].transform.scale = GE.Vector3.create(s.x + 0.01, s.y + 0.01, s.z + 0.01);
 if(G.stage > 1) G.game.objects[0].transform.rotate = GE.Vector3.create(r.x, r.y + 0.1, r.z);
};

function init() {
 createGame();
 createListeners();
 loadResources();
 createObjects();
 G.game.run(render);
}


window.onload = init;
