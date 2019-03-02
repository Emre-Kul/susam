import WebGL from '../core/webgl';
import Shader from '../core/shader';
import Logger from '../utils/logger';

export default class ShaderLoader {

  public gl: WebGL;
  public vertexId: string;
  public fragmentId: string;

  constructor(gl: WebGL, vertexId: string, fragmentId: string) {
    this.gl = gl;
    this.vertexId = vertexId;
    this.fragmentId = fragmentId;
  }

  load() {
    const vertex = this.loadShader(this.vertexId, this.gl.context.VERTEX_SHADER);
    const fragment = this.loadShader(this.fragmentId, this.gl.context.FRAGMENT_SHADER);
    return new Shader(vertex, fragment);
  }

  private loadShader(id: string, type: any) {
    const elem: any = document.getElementById(id);
    if (!elem) {
      Logger.error(`Unable to load ${id}`);
      return -1;
    }

    const shader = this.gl.context.createShader(type);
    this.gl.context.shaderSource(shader, elem.text);
    this.gl.context.compileShader(shader);

    if (!this.gl.context.getShaderParameter(shader, this.gl.context.COMPILE_STATUS)) {
      Logger.error(`Fragment shader failed to compile.  The error log is: ${this.gl.context.getShaderInfoLog(shader)}`);
      return -1;
    }

    return shader;
  }
}
