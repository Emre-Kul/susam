let shader, cube, scene,s;
s = -0.5;
const init = function () {
  scene = new GE.Core.Scene();
  scene.init();
  shader = new GE.Core.Shader(scene.gl.context, "vertex-shader", "fragment-shader");
  cube = new GE.Physics.Cube();
  cube.createMesh();
  render({ key: "t"});
};

const render = (e) => {
 let px,py,pz;
 px = 0;
 py = 0;
 pz = 0;

 const translateSpeed = 0.1;
 const scaleSpeed = 0.1;
 if(e.key === "a"){
   px = -translateSpeed;
 }
 if(e.key === "d"){
   px = translateSpeed;
 }
 if(e.key === "z"){
   pz = -translateSpeed;
 }
 if(e.key === "x"){
   pz = translateSpeed;
 }
 if(e.key === "w") {
  py = translateSpeed;
 }
 if(e.key === "s"){
   py = -translateSpeed;
 }
 if(e.key === "r"){
  s += scaleSpeed;
 }
 if(e.key === "f"){
  s -= scaleSpeed;
 }
 cube.mesh.transform.position = GE.Math.Vector3.create(
   cube.mesh.transform.position.x + px,
   cube.mesh.transform.position.y + py,
   cube.mesh.transform.position.z + pz
 );
 // SCALE TEST
 cube.mesh.transform.scale = GE.Math.Vector3.create(s, s, s);

 let meshRenderer = new GE.Core.MeshRenderer(cube.mesh, shader, scene.camera.viewMatrix, scene.camera.projectionMtr);
 meshRenderer.init();
 meshRenderer.render();
};

document.onkeydown = render;

window.onload = init;

