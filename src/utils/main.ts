import Shader from './shader.js';

export default class Main{
    canvas: any;
    program: any;
    gl: any;
    constructor(canvasId,WebGLUtils){
        this.canvas = document.getElementById(canvasId);
        this.gl = WebGLUtils.setupWebGL(this.canvas);
        if(!this.gl){
            throw new Error("Webgl isn't avaliable");
        }
        this.program = Shader.init(this.gl,"vertex-shader","fragment-shader");
        this.gl.useProgram(this.program);
    }
}