import Shader from './shader';
import Mesh from './mesh';

export default class MeshRenderer {

  public shader: Shader;
  public mesh: Mesh;

  constructor(mesh: Mesh, shader: Shader) {
    this.mesh = mesh;
    this.shader = shader;
  }

  init() {
    this.shader.load();
    const bufferId = this.shader.context.createBuffer();
    this.shader.context.bindBuffer(this.shader.context.ARRAY_BUFFER, bufferId);
    this.shader.context.bufferData(
        this.shader.context.ARRAY_BUFFER,
        new Float32Array(this.mesh.vertices),
        this.shader.context.STATIC_DRAW,
    );

    const vPos = this.shader.context.getAttribLocation(this.shader.program, 'vPosition');
    this.shader.context.vertexAttribPointer(vPos, 3, this.shader.context.FLOAT, false, 0, 0);
    this.shader.context.enableVertexAttribArray(vPos);
  }

  render() {
    this.shader.context.useProgram(this.shader.program);
    this.shader.context.clear(this.shader.context.COLOR_BUFFER_BIT);
    this.shader.context.drawArrays(this.shader.context.LINE_LOOP, 0, 4);
  }
}
