import WebGL from './webgl';
import Camera from './camera';
import Projection from './projection';
import Window from './window';
import PointLight from './point-light';

export default class Scene {
  public camera: Camera;
  public readonly gl: WebGL;
  public projection: Projection;
  public light: PointLight;

  constructor(camera = new Camera()) {
    this.gl = new WebGL();
    this.camera = camera;
    this.projection = new Projection();
    this.light = new PointLight();

    this.setFullScreen = this.setFullScreen.bind(this);
    this.resize = this.resize.bind(this);

  }

  init() {
    this.gl.init();
    this.camera.update();
    this.resize();
  }

  clear() {
    this.gl.clear();
  }

  resize() {
    Window.resizeCanvas(this.gl.canvas);
    this.gl.context.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.projection.aspect = this.gl.canvas.width / this.gl.canvas.height;
    this.projection.calculate();
  }

  setFullScreen() {
    Window.setFullScreen(this.gl.canvas);
  }

  public requestFrame() {
    const w = (window as any);
    return w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.oRequestAnimationFrame ||
        w.msRequestAnimationFrame ||
        function (cb: any, time: number) {
          window.setTimeout(cb, time);
        };
  }

}
