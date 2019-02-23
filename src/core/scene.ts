import WebGL from './webgl';
import Camera from './camera';

export default class Scene {
  public gl: WebGL;
  public camera: Camera;

  constructor(camera = new Camera()) {
    this.gl = new WebGL();
    this.camera = camera;
  }

  init() {
    this.gl.init();
    this.camera.update();
  }

  run(cb: any) {
    this.requestFrame()(cb);
  }

  clear() {
    this.gl.clear();
  }

  private requestFrame() {
    const w = (window as any);
    return w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.oRequestAnimationFrame ||
        w.msRequestAnimationFrame ||
        function (cb: any) { window.setTimeout(cb, 1000 / 60); };
  }

}
