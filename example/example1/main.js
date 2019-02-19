let shader, cube, scene, s;
s = 1;
const init = function () {
  scene = new GE.Core.Scene();
  scene.init();
  shader = new GE.Core.Shader(scene.gl.context, "vertex-shader", "fragment-shader");
  cube = new GE.Physics.Cube();
  cube.createMesh();
  cube.mesh.color.setRed();
  scene.run(render);
};

const render = () => {
 cube.mesh.transform.rotate.x += 0.1;
 cube.mesh.transform.rotate.y += 0.1;
 cube.mesh.transform.rotate.z += 0.1;
 let meshRenderer = new GE.Core.MeshRenderer(cube.mesh, shader, scene.camera.viewMatrix, scene.camera.projectionMtr);
 meshRenderer.init();
 meshRenderer.render();
 scene.run(render);
};



const keyDown = (e) => {

 let px,py,pz;
 px = 0;
 py = 0;
 pz = 0;

 const translateSpeed = 0.1;
 const scaleSpeed = 0.1;
 if(e.key === "c"){
  cube.mesh.color.setRandom();
 }
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

};


document.onkeydown = keyDown;

window.onload = init;

