import WebGL from '../core/webgl';
import Shader from '../core/shader';
import Logger from '../utils/logger';
import Loader from './loader';

export default class ShaderLoader extends Loader {

  public gl: WebGL;

  constructor(gl: WebGL, url: string = '') {
    super(url);
    this.gl = gl;
  }

  load() {
    const shader = new Shader();
    Promise.all(
      [this.requestUrl(`${this.url}/vertex.shader`),
        this.requestUrl(`${this.url}/fragment.shader`)],
    ).then((data) => {
      shader.vertex = this.loadShader(data[0] as any, this.gl.context.VERTEX_SHADER);
      shader.fragment = this.loadShader(data[1] as any, this.gl.context.FRAGMENT_SHADER);
      shader.ready = true;
    });
    return shader;
  }

  private loadShader(data: string, type: any) {
    const shader = this.gl.context.createShader(type);
    this.gl.context.shaderSource(shader, data);
    this.gl.context.compileShader(shader);

    if (!this.gl.context.getShaderParameter(shader, this.gl.context.COMPILE_STATUS)) {
      Logger.error(`Fragment shader failed to compile.  The error log is: ${this.gl.context.getShaderInfoLog(shader)}`);
      return -1;
    }

    return shader;
  }
}
