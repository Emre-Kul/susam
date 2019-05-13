import GameObject from './game-object';
import Scene from './scene';
import Matrix4 from '../math/matrix4';
import { COLORING_TYPE } from './enums';
import ColorMaterial from '../graphics/color-material';
import TextureMaterial from '../graphics/texture-material';

export default class MeshRenderer {

  public gameObject: GameObject;
  public scene: Scene;

  public program: any;
  private bufferIds: any;

  private location: any;
  private normalMatrix: any;
  constructor(gameObject: GameObject, scene: Scene) {
    this.gameObject = gameObject;
    this.scene = scene;
    this.location = {};
    this.bufferIds = {};
    this.program = null;
  }

  init() {
    this.program = this.scene.gl.useShader(this.gameObject.shader);
    this.location = this.scene.gl.loadLocations(this.program);
    this.calculateNormalMatrix(this.gameObject.transform.modelMatrix, this.scene.camera.viewMatrix);
    this.initBuffers();
  }

  render() {
    if (!this.gameObject.shader.ready || !this.gameObject.mesh.ready) return;
    if (!this.program) this.init();
    this.scene.gl.context.useProgram(this.program);
    this.bindBuffers();
    this.loadMatrices();
    this.loadLight();
    this.loadColoring();
    this.scene.gl.draw(this.gameObject.mesh.indices.length, this.gameObject.material.drawType);
  }

  private loadMatrices() {
    this.scene.gl.setUniformMtr4(this.location.uView, this.scene.camera.viewMatrix);
    this.scene.gl.setUniformMtr4(this.location.uProjection, this.scene.projection.matrix);
    this.scene.gl.setUniformMtr4(this.location.uModel, this.gameObject.transform.modelMatrix);
    this.scene.gl.setUniformMtr4(this.location.uNormal, this.normalMatrix);
  }

  private loadLight() {
    this.scene.gl.setUniform1i(this.location.uEnableLight,
                               this.gameObject.material.applyLighting && this.scene.light.activate);
    this.scene.gl.setUniformVec3(this.location.uLightPosition, this.scene.light.position);
    this.scene.gl.setUniformVec4(this.location.uLightColor, this.scene.light.color.code);
  }

  private loadColoring() {
    if (this.gameObject.material.coloringType === COLORING_TYPE.COLOR) {
      this.scene.gl.setUniformVec4(this.location.uColor, (this.gameObject.material as ColorMaterial).color.code);
    } else if (this.gameObject.material.coloringType === COLORING_TYPE.TEXTURE) {
      this.scene.gl.setUniform1i(this.location.uEnableTexture, true);
      this.scene.gl.context.bindTexture(this.scene.gl.context.TEXTURE_2D, (this.gameObject.material as TextureMaterial).texture.data);
    }
  }

  private initBuffers() {
    console.log('Emre Kul');
    console.log(this.gameObject.mesh);
    /* VERTEX */
    this.bufferIds['VERTEX'] = this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.vertices));
    this.scene.gl.context.vertexAttribPointer(this.location.aPosition, 3, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.aPosition);

    if (this.gameObject.mesh.textureVertices.length > 0) {
      /* TEXTURE */
      this.bufferIds['TEXTURE'] = this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.textureVertices));
      this.scene.gl.context.vertexAttribPointer(this.location.aTexture, 2, this.scene.gl.context.FLOAT, false, 0, 0);
      this.scene.gl.context.enableVertexAttribArray(this.location.aTexture);
    }

    if (this.gameObject.mesh.normals.length > 0) {
      /* NORMAL */
      this.bufferIds['NORMAL'] = this.scene.gl.bindBufferData('ARRAY_BUFFER', new Float32Array(this.gameObject.mesh.normals));
      this.scene.gl.context.vertexAttribPointer(this.location.aNormal, 3, this.scene.gl.context.FLOAT, false, 0, 0);
      this.scene.gl.context.enableVertexAttribArray(this.location.aNormal);

    }

    /* INDEX */
    this.bufferIds['INDEX'] = this.scene.gl.bindBufferData('ELEMENT_ARRAY_BUFFER', new Uint16Array(this.gameObject.mesh.indices));

  }

  private bindBuffers() {
    this.scene.gl.context.disableVertexAttribArray(this.location.aPosition);
    this.scene.gl.context.disableVertexAttribArray(this.location.aTexture);
    this.scene.gl.context.disableVertexAttribArray(this.location.aNormal);
    /* VERTEX */
    this.scene.gl.context.bindBuffer(this.scene.gl.context['ARRAY_BUFFER'], this.bufferIds['VERTEX']);
    this.scene.gl.context.vertexAttribPointer(this.location.aPosition, 3, this.scene.gl.context.FLOAT, false, 0, 0);
    this.scene.gl.context.enableVertexAttribArray(this.location.aPosition);

    if (this.gameObject.mesh.textureVertices.length > 0) {
      /* TEXTURE */
      this.scene.gl.context.bindBuffer(this.scene.gl.context['ARRAY_BUFFER'], this.bufferIds['TEXTURE']);
      this.scene.gl.context.vertexAttribPointer(this.location.aTexture, 2, this.scene.gl.context.FLOAT, false, 0, 0);
      this.scene.gl.context.enableVertexAttribArray(this.location.aTexture);
    }

    if (this.gameObject.mesh.normals.length > 0) {
      /* NORMAL */
      this.scene.gl.context.bindBuffer(this.scene.gl.context['ARRAY_BUFFER'], this.bufferIds['NORMAL']);
      this.scene.gl.context.vertexAttribPointer(this.location.aNormal, 3, this.scene.gl.context.FLOAT, false, 0, 0);
      this.scene.gl.context.enableVertexAttribArray(this.location.aNormal);
    }

    /* INDEX */
    this.scene.gl.context.bindBuffer(this.scene.gl.context['ELEMENT_ARRAY_BUFFER'], this.bufferIds['INDEX']);

  }

  private calculateNormalMatrix(model: Matrix4, view: Matrix4) {
    this.normalMatrix = Matrix4.transpose(Matrix4.multiply(model, view));
  }

}
