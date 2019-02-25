import Shader from './shader';
import Mesh from './mesh';
import Matrix4 from '../math/matrix4';

export default class MeshRenderer {

  public shader: Shader;
  public meshes: Mesh[];
  public viewMtr: Matrix4;
  public projectionMtr: Matrix4;

  private location: any;
  private mergedMeshes: any;

  constructor(meshes: Mesh[] = [], shader: Shader, viewMtr: Matrix4, projectionMtr: Matrix4) {
    this.meshes = meshes;
    this.shader = shader;
    this.viewMtr = viewMtr;
    this.projectionMtr = projectionMtr;
    this.location = {};
  }

  init() {
    this.shader.load();
    this.getLocations();
    this.mergedMeshes = Mesh.merge(this.meshes);

    /* VERTEX */
    this.shader.bindBufferData('ARRAY_BUFFER', new Float32Array(this.mergedMeshes.vertices));
    this.shader.context.vertexAttribPointer(this.location.position, 3, this.shader.context.FLOAT, false, 0, 0);
    this.shader.context.enableVertexAttribArray(this.location.position);

    /* TEXTURE */
    this.shader.bindBufferData('ARRAY_BUFFER', new Float32Array(this.mergedMeshes.textureVertices));
    this.shader.context.vertexAttribPointer(this.location.texture, 2, this.shader.context.FLOAT, false, 0, 0);
    this.shader.context.enableVertexAttribArray(this.location.texture);

    this.shader.bindBufferData('ELEMENT_ARRAY_BUFFER', new Uint16Array(this.mergedMeshes.indices));
  }

  render() {
    this.shader.prepareDraw();
    this.shader.setUniformMtr4(this.location.view, this.viewMtr);
    this.shader.setUniformMtr4(this.location.projection, this.projectionMtr);

    for (const mesh of this.meshes) {
      this.shader.setUniformMtr4(this.location.model, mesh.transform.modelMatrix);
      this.shader.setUniformVec4(this.location.color, mesh.color.code);

      if (mesh.texture.data) {
        console.log(mesh.texture.data);
        this.shader.context.bindTexture(this.shader.context.TEXTURE_2D, mesh.texture.data);
      }

      this.shader.draw(mesh.indices.length);
    }
  }
  private getLocations() {
    this.location.position = this.shader.getAttribLocation('vPosition');
    this.location.texture = this.shader.getAttribLocation('vTexture');
    this.location.model  = this.shader.getUniformLocation('uModel');
    this.location.view  = this.shader.getUniformLocation('uView');
    this.location.projection  = this.shader.getUniformLocation('uProjection');
    this.location.color = this.shader.getUniformLocation('uColor');
    this.location.sampler = this.shader.getUniformLocation('uSampler');
  }
}
