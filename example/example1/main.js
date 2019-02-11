const init = function () {
  const scene = new GE.Core.Scene('gl-canvas');
  scene.init();
  const shader = new GE.Core.Shader(scene.context, "vertex-shader", "fragment-shader");
  const rec = new GE.Physics.Rectangle();
  rec.createMesh();
  const meshRenderer = new GE.Core.MeshRenderer(rec.mesh, shader);
  meshRenderer.init();
  meshRenderer.render();
};


window.onload = init;

