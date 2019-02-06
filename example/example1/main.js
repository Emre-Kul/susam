const init = function () {
  const scene = new GE.Core.Scene('gl-canvas');
  scene.init();
  const shader = new GE.Core.Shader(scene.context, "vertex-shader", "fragment-shader");

  let vertices = [0,0,0,
                  0.5,0,0,
                  0.5,0.5,0,
                  0,0.5,0
                  ];

  const mesh = new GE.Core.Mesh(vertices, shader);
  mesh.init();
  mesh.render();
};


window.onload = init;

