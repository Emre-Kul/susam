let shader, cube, camera;

const init = function () {
  camera = new GE.Core.Camera();
  const scene = new GE.Core.Scene('gl-canvas');
  scene.init();
  shader = new GE.Core.Shader(scene.context, "vertex-shader", "fragment-shader");
  cube = new GE.Physics.Cube();
  cube.createMesh();
  camera.calculatePV();
  render("t");
};

const render = (e) => {
 let x,y,z;
 x = 0;
 y = 0;
 z = 0;

 if(e.key === "a"){
   x = -0.01;
 }
 if(e.key === "d"){
   x = 0.01;
 }
 if(e.key === "z"){
   z = -0.01;
 }
 if(e.key === "x"){
   z = 0.01;
 }
 if(e.key === "w") {
  y = 0.01;
 }
 if(e.key === "s"){
   y = -0.01;
 }
 console.log(e.key);
 cube.mesh.transform.position = GE.Math.Vector3.create(
   cube.mesh.transform.position.x + x,
   cube.mesh.transform.position.y + y,
   cube.mesh.transform.position.z + z);
 cube.mesh.transform.calcModelMatrix();
 console.log(cube.mesh.transform.modelMatrix);
 let meshRenderer = new GE.Core.MeshRenderer(cube.mesh, shader, camera.viewMatrix, camera.projectionMtr);
 meshRenderer.init();
 meshRenderer.render();
};

document.onkeydown = render;

window.onload = init;

