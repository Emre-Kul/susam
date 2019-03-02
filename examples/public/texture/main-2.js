/* GLOBALS */
const G = {};

/* CREATION FUNCS */
function createScene() {
  G.scene = new GE.Core.Scene();
  G.scene.init();
  G.scene.clear();
}

function createListeners() {
  window.addEventListener('resize', G.scene.resize.bind(G.scene));
}

function loadResources() {
  G.scene.loadShader("shader-default", "vertex-shader", "fragment-shader");
  G.scene.loadTexture("texture-js", document.getElementById("js-texture"));
  G.scene.loadTexture("texture-ytu", document.getElementById("ytu-texture"));
}

function createObjects() {
  G.objects = [];
  const cube = new GE.Physics.Cube();
  cube.createMesh();
  const shader = G.scene.resourceManager.resources["shader-default"];
  const texture = G.scene.resourceManager.resources["texture-js"];
  const transform = new GE.Core.Transform();
  G.objects.push( new GE.Core.GameObject(transform, cube.mesh, texture, shader));
  G.renderer = new GE.Core.MeshRenderer(G.objects[0], G.scene);
  G.renderer.init();
}

function render() {
  const r = G.objects[0].transform.rotate;
  G.objects[0].transform.rotate = new GE.Math.Vector3(r.x + 0.1, r.y + 0.1, r.z + 0.1);
  G.renderer.render();
  G.scene.run(render);
}
function init() {
  createScene();
  createListeners();
  loadResources();
  createObjects();
  G.scene.run(render);
}

window.onload = init;
// window.addEventListener('resize', () => {alert("OK")});
