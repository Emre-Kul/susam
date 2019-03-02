/* GLOBALS */
const G = {};

/* CREATION FUNCS */
function createScene() {
  G.scene = new GE.Core.Scene();
  G.scene.init();
  G.scene.clear();

}

function loadResources() {
  G.scene.loadShader("shader-default", "vertex-shader", "fragment-shader");
  G.scene.loadTexture("texture-js", document.getElementById("ytu-texture"));
  G.scene.loadTexture("texture-ytu", document.getElementById("js-texture"));
}

function createObjects() {
  G.objects = [];
  const cube = new GE.Physics.Cube();
  cube.createMesh();
  const shader = G.scene.resourceManager.resources["shader-default"];
  const texture = G.scene.resourceManager.resources["texture-js"];
  const transform = new GE.Core.Transform();
  G.objects.push( new GE.Core.GameObject(transform, cube.mesh, texture, shader));
}

function drawObjects() {
  G.renderer = new GE.Core.MeshRenderer(G.objects[0], G.scene);
  G.renderer.init();
  G.renderer.render();
}
function init() {
  createScene();
  loadResources();
  createObjects();
  drawObjects();
  console.log("G : ", G);
}

window.onload = init;
