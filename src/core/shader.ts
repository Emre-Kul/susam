export default class Shader {
  private context: any;
  private vertexShaderId: string;
  private fragmentShaderId: string;

  constructor(context: any, vertexShaderId: string, fragmentShaderId: string) {
    this.context = context;
    this.vertexShaderId = vertexShaderId;
    this.fragmentShaderId = fragmentShaderId;
  }

  public init() {
    const vertexShader = this.loadShader(this.vertexShaderId, 'vertex', this.context.VERTEX_SHADER);
    const fragmentShader = this.loadShader(this.fragmentShaderId, 'fragment', this.context.FRAGMENT_SHADER);

    const program = this.context.createProgram();
    this.context.attachShader(program, vertexShader);
    this.context.attachShader(program, fragmentShader);
    this.context.linkProgram(program);

    if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
      const msg = 'Shader program failed to link.  The error log is:'
            + '<pre>' + this.context.getProgramInfoLog(program) + '</pre>';
      alert(msg);
      return -1;
    }

    return program;
  }

  private loadShader(id: string, name: string, type: any) {
    const elem: any = document.getElementById(id);
    if (!elem) {
      alert('Unable to load ' + name + id);
      return -1;
    }

    const shader = this.context.createShader(type);
    this.context.shaderSource(shader, elem.text);
    this.context.compileShader(shader);
    if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
      const msg = 'Fragment shader failed to compile.  The error log is:'
          + '<pre>' + this.context.getShaderInfoLog(shader) + '</pre>';
      alert(msg);
      return -1;
    }
    return shader;
  }

}
