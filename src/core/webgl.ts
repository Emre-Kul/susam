import { CustomWindow } from '../interfaces';
import Shader from './shader';
import Matrix4 from '../math/matrix4';
import Vector4 from '../math/vector4';
import Vector3 from '../math/vector3';

export default class WebGL {
  public canvas: any;
  private readonly attributes: string[];
  private readonly canvasId: string;
  public context: any;

  constructor(canvasId: string = 'ge-canvas', attributes: string[] = []) {
    this.canvasId = canvasId;
    this.attributes = attributes;
    this.context = null;
  }

  public init() {
    this.canvas = document.getElementById(this.canvasId);
    this.setup();

    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.context.enable(this.context.DEPTH_TEST);
    this.context.enable(this.context.CULL_FACE);
    this.context.depthMask(false);
    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.clearDepth(1.0);

    // this.context.depthFunc(this.context.LEQUAL);
    // this.context.cullFace(this.context.FRONT);

  }

  clear() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
  }

  draw(length: number, drawType: string = 'TRIANGLES', offset: number = 0) {
    this.context.drawElements(this.context[drawType], length, this.context.UNSIGNED_SHORT, offset);
  }
  useShader(shader: Shader) {
    const program = this.context.createProgram();
    this.context.attachShader(program, shader.vertex);
    this.context.attachShader(program, shader.fragment);
    this.context.linkProgram(program);
    return program;
  }

  loadLocations(program: any) {
    const location: any = {};
    location.aPosition = this.context.getAttribLocation(program, 'aPosition');
    location.aTexture = this.context.getAttribLocation(program, 'aTexture');
    location.aNormal = this.context.getAttribLocation(program, 'aNormal');

    location.uNormal  = this.context.getUniformLocation(program, 'uNormal');
    location.uModel  = this.context.getUniformLocation(program, 'uModel');
    location.uView  = this.context.getUniformLocation(program, 'uView');
    location.uProjection  = this.context.getUniformLocation(program, 'uProjection');
    location.uColor = this.context.getUniformLocation(program, 'uColor');
    location.uSampler = this.context.getUniformLocation(program, 'uSampler');
    location.uLightPoint = this.context.getUniformLocation(program, 'uLightPoint');
    location.uUseTexture = this.context.getUniformLocation(program, 'uUseTexture');

    return location;
  }

  setUniformMtr4(location: any, mtr: Matrix4) {
    const data = Matrix4.flatten(Matrix4.transpose(mtr));
    this.context.uniformMatrix4fv(location, false, data);
  }

  setUniformVec4(location: any, data: Vector4) {
    this.context.uniform4fv(location, [data.x, data.y, data.z, data.w]);
  }

  setUniformVec3(location: any, data: Vector3) {
    this.context.uniform3fv(location, [data.x, data.y, data.z]);
  }

  setUniform1i(location: any, data: any) {
    this.context.uniform1i(location, data);
  }

  bindBufferData(bufferType: string, data: any) {
    const bufferId = this.context.createBuffer();
    this.context.bindBuffer(this.context[bufferType], bufferId);
    this.context.bufferData(
        this.context[bufferType],
        data,
        this.context.STATIC_DRAW,
    );
    return bufferId;
  }

  private setup() {
    if (!(window as CustomWindow).WebGLRenderingContext) {
      this.context = null;
      return;
    }
    this.create3DContext();
    if (!this.context) {
      this.context = null;
    }
  }

  private create3DContext() {
    const names: string[] = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    for (const name of names) {
      try {
        this.context = this.canvas.getContext(name, this.attributes);
      } catch (e) {}
      if (this.context) {
        break;
      }
    }
  }

}
