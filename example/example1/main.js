/*
let gl;

const init = function () {
  const canvas = document.getElementById('gl-canvas');

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl)
    alert("Webgl isn't avaliable!");

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  const program = glp.Shader.init(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  let vertices = [];
  for(let i = 1;i < 50;i++){
    vertices = glp.Shape.rect([0, 0], 0.05 * i, 0.05 * i).concat(vertices);
  }

  // Load the data into the GPU
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  const vPos = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPos, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPos);


  render(vertices.length);
}

const render = function (size) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  for(let i = 0;i < size;i+=4)
    gl.drawArrays(gl.LINE_LOOP, i, 4);

}

window.onload = init;
*/
