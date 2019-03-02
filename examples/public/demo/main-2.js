/* GLOBALS */
const CUBE_COUNT = 100;
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
}

function createObjects() {
  G.objects = [];
  G.renderers = [];
  const cube = new GE.Physics.Cube();
  cube.createMesh();
  const shader = G.scene.resourceManager.resources["shader-default"];
  for(let i = 0;i < CUBE_COUNT;i++){
   const texture = G.scene.resourceManager.resources[(i % 2) ? "texture-js" : "texture-ytu"];
   const transform = new GE.Core.Transform();
   transform.position = GE.Math.Vector3.create(- i * 2, 0, 0);
   const obj = new GE.Core.GameObject(transform, cube.mesh, texture, shader);
   G.objects.push(obj);
   G.renderers.push(new GE.Core.MeshRenderer(obj, G.scene));
  }



}

function render() {
  moveCamera();
  for(const object of G.objects) {
   const r = object.transform.rotate;
   object.transform.rotate = new GE.Math.Vector3(r.x + Math.random(), r.y + Math.random(), r.z + Math.random());
  }

  for(const renderer of G.renderers) {
    renderer.render();
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
  my = -0.1;
 }
 if(G.KEY["s"]){
  my = 0.1;
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
  G.scene.camera.move(GE.Math.Vector3.create(mx, 0, my));
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
