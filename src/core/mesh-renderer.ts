import Shader from './shader';
import Mesh from './mesh';
import Matrix4 from '../math/matrix4';

export default class MeshRenderer {

  public shader: Shader;
  public mesh: Mesh;
  public viewMtr: Matrix4;

  private locationModelMtr: any;
  private locationViewMtr: any;

  constructor(mesh: Mesh, shader: Shader, viewMtr: Matrix4) {
    this.mesh = mesh;
    this.shader = shader;
    this.viewMtr = viewMtr;
  }

  init() {
    this.mesh.transform.calcModelMatrix();
    this.shader.load();

    this.bindBufferData(this.shader.context.ARRAY_BUFFER,
                        this.shader.context,
                        new Float32Array(this.mesh.vertices));
    this.bindBufferData(this.shader.context.ELEMENT_ARRAY_BUFFER,
                        this.shader.context,
                        new Uint16Array(this.mesh.indices));

    const vPos = this.shader.context.getAttribLocation(this.shader.program, 'vPosition');
    this.shader.context.vertexAttribPointer(vPos, 3, this.shader.context.FLOAT, false, 0, 0);
    this.shader.context.enableVertexAttribArray(vPos);

    this.locationModelMtr  = this.shader.context.getUniformLocation(this.shader.program, 'uModel');
    this.locationViewMtr  = this.shader.context.getUniformLocation(this.shader.program, 'uView');
  }

  render() {
    this.shader.context.useProgram(this.shader.program);

    // console.log(this.viewMtr.multiply(this.mesh.transform.modelMatrix));

    this.shader.context.uniformMatrix4fv(this.locationModelMtr,
                                         false,
                                         Matrix4.flatten(this.mesh.transform.modelMatrix.matrix));

    this.shader.context.uniformMatrix4fv(this.locationViewMtr,
                                         false,
                                         Matrix4.flatten(this.viewMtr.matrix));

    this.shader.context.clear(this.shader.context.COLOR_BUFFER_BIT);

    this.shader.context.drawElements(this.shader.context.TRIANGLES,
                                     this.mesh.indices.length,
                                     this.shader.context.UNSIGNED_SHORT,
                                     0);
  }

  private bindBufferData(bufferType: any, context: any, data: any) {
    const bufferId = context.createBuffer();
    context.bindBuffer(bufferType, bufferId);
    context.bufferData(
        bufferType,
        data,
        context.STATIC_DRAW,
    );
    return bufferId;
  }
}
