import WebGL from './webgl';
import Camera from './camera';

export default class Scene {
  public gl: WebGL;
  public camera: Camera;

  constructor(gl: WebGL = new WebGL(), camera = new Camera()) {
    this.gl = gl;
    this.camera = camera;
  }

  init() {
    this.gl.init();
    this.camera.calculatePV();
  }

}
