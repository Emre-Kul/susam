const init = function () {
  const scene = new GE.Core.Scene('gl-canvas');
  scene.init();
  const shader = new GE.Core.Shader(scene.context, "vertex-shader", "fragment-shader");
  const rec = new GE.Physics.Rectangle();
  const cube = new GE.Physics.Cube();
  rec.createMesh();
  cube.createMesh();
  const meshRenderer = new GE.Core.MeshRenderer(rec.mesh, shader);
  //const meshRenderer = new GE.Core.MeshRenderer(cube.mesh, shader);
  meshRenderer.init();
  meshRenderer.render();
};


window.onload = init;

