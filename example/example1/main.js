const init = function () {
  const camera = new GE.Core.Camera();
  const scene = new GE.Core.Scene('gl-canvas');
  scene.init();
  const shader = new GE.Core.Shader(scene.context, "vertex-shader", "fragment-shader");
  const rec = new GE.Physics.Rectangle();
  const cube = new GE.Physics.Cube();
  rec.createMesh();
  cube.createMesh();
  camera.calculateView();
  let meshRenderer = new GE.Core.MeshRenderer(cube.mesh, shader, camera.viewMatrix);
  meshRenderer.init();
  meshRenderer.render();
};


window.onload = init;

