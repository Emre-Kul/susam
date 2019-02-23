import Shader from './shader';
import Mesh from './mesh';
import Matrix4 from '../math/matrix4';

export default class MeshRenderer {

  public shader: Shader;
  public meshes: Mesh[];
  public viewMtr: Matrix4;
  public projectionMtr: Matrix4;

  private locationModelMtr: any;
  private locationViewMtr: any;
  private locationProjectionMtr: any;
  private locationColor: any;

  constructor(meshes: Mesh[] = [], shader: Shader, viewMtr: Matrix4, projectionMtr: Matrix4) {
    this.meshes = meshes;
    this.shader = shader;
    this.viewMtr = viewMtr;
    this.projectionMtr = projectionMtr;
  }

  init() {
    this.shader.load();

    let vertices: number[] = [];
    let indices: number[] = [];
    for (const mesh of this.meshes) {
      vertices = vertices.concat(mesh.vertices);
      indices = indices.concat(mesh.indices);
    }

    this.shader.bindBufferData('ARRAY_BUFFER', new Float32Array(vertices));
    this.shader.bindBufferData('ELEMENT_ARRAY_BUFFER', new Uint16Array(indices));

    /* Will Clear */
    const vPos = this.shader.context.getAttribLocation(this.shader.program, 'vPosition');
    this.shader.context.vertexAttribPointer(vPos, 3, this.shader.context.FLOAT, false, 0, 0);
    this.shader.context.enableVertexAttribArray(vPos);

    this.locationModelMtr  = this.shader.getUniformLocation('uModel');
    this.locationViewMtr  = this.shader.getUniformLocation('uView');
    this.locationProjectionMtr  = this.shader.getUniformLocation('uProjection');
    this.locationColor = this.shader.getUniformLocation('uColor');
  }

  render() {
    this.shader.prepareDraw();
    this.shader.setUniformMtr4(this.locationViewMtr, this.viewMtr);
    this.shader.setUniformMtr4(this.locationProjectionMtr, this.projectionMtr);

    for (const mesh of this.meshes) {
      this.shader.setUniformMtr4(this.locationModelMtr, mesh.transform.modelMatrix);
      this.shader.setUniformVec4(this.locationColor, mesh.color.code);
      this.shader.draw(mesh.indices.length);
    }

  }
}
