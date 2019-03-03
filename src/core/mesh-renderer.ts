import GameObject from './game-object';
import Scene from './scene';
import Matrix4 from '../math/matrix4';
import Vector3 from '../math/vector3';

export default class MeshRenderer {

  public gameObject: GameObject;
  public scene: Scene;

  public program: any;

  private location: any;
  private normalMatrix: any;

  constructor(gameObject: GameObject, scene: Scene) {
    this.gameObject = gameObject;
    this.scene = scene;
    this.location = {};
    this.program = null;
  }

  init() {
    this.program = this.scene.gl.useShader(this.gameObject.shader);
    this.location = this.scene.gl.loadLocations(this.program);

    this.calculateNormalMatrix(this.gameObject.transform.modelMatrix, this.scene.camera.viewMatrix);

    /* VERTEX */
    this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.vertices));
    this.scene.gl.context.vertexAttribPointer(this.location.aPosition, 3, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.aPosition);

    /* TEXTURE */
    this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.textureVertices));
    this.scene.gl.context.vertexAttribPointer(this.location.aTexture, 2, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.aTexture);

    /* NORMAL */
    this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.normals));
    this.scene.gl.context.vertexAttribPointer(this.location.aNormal, 3, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.aNormal);

    /* INDEX */
    this.scene.gl.bindBufferData('ELEMENT_ARRAY_BUFFER', new Uint16Array(this.gameObject.mesh.indices));
  }

  render() {
    if (!this.program) this.init();
    this.scene.gl.context.useProgram(this.program);
    this.scene.gl.setUniformMtr4(this.location.uView, this.scene.camera.viewMatrix);
    this.scene.gl.setUniformMtr4(this.location.uProjection, this.scene.projection.matrix);
    this.scene.gl.setUniformMtr4(this.location.uModel, this.gameObject.transform.modelMatrix);
    this.scene.gl.setUniformMtr4(this.location.uNormal, this.normalMatrix);
    this.scene.gl.setUniformVec4(this.location.uColor, this.gameObject.mesh.color.code);
    this.scene.gl.setUniformVec3(this.location.uLightPoint, Vector3.create(0, 0, 0));
    if (this.gameObject.texture.data) {
      this.scene.gl.context.bindTexture(this.scene.gl.context.TEXTURE_2D, this.gameObject.texture.data);
    }
    this.scene.gl.draw(this.gameObject.mesh.indices.length);
  }

  private calculateNormalMatrix(model: Matrix4, view: Matrix4) {
    this.normalMatrix = Matrix4.transpose(Matrix4.multiply(model, view));
  }

}
