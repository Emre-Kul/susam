import GameObject from './game-object';
import Scene from './scene';

export default class MeshRenderer {

  public gameObject: GameObject;
  public scene: Scene;

  public program: any;
  private location: any;

  constructor(gameObject: GameObject, scene: Scene) {
    this.gameObject = gameObject;
    this.scene = scene;
    this.location = {};
    this.program = null;
  }

  init() {
    this.program = this.scene.gl.useShader(this.gameObject.shader);
    this.location = this.scene.gl.loadLocations(this.program);

    /* VERTEX */
    this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.vertices));
    this.scene.gl.context.vertexAttribPointer(this.location.position, 3, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.position);

    /* TEXTURE */
    this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.textureVertices));
    this.scene.gl.context.vertexAttribPointer(this.location.texture, 2, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.texture);

    this.scene.gl.bindBufferData('ELEMENT_ARRAY_BUFFER', new Uint16Array(this.gameObject.mesh.indices));
  }

  render() {
    if (!this.program) this.init();
    this.scene.gl.context.useProgram(this.program);
    this.scene.gl.setUniformMtr4(this.location.view, this.scene.camera.viewMatrix);
    this.scene.gl.setUniformMtr4(this.location.projection, this.scene.projection.matrix);
    this.scene.gl.setUniformMtr4(this.location.model, this.gameObject.transform.modelMatrix);
    this.scene.gl.setUniformVec4(this.location.color, this.gameObject.mesh.color.code);
    if (this.gameObject.texture.data) {
      this.scene.gl.context.bindTexture(this.scene.gl.context.TEXTURE_2D, this.gameObject.texture.data);
    }
    this.scene.gl.draw(this.gameObject.mesh.indices.length);
  }

}
