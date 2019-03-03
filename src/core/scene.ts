import WebGL from './webgl';
import Camera from './camera';
import ResourceManager from './resource-manager';
import Projection from './projection';
import Window from './window';

export default class Scene {
  public camera: Camera;
  public resourceManager: ResourceManager;

  public readonly gl: WebGL;
  public projection: Projection;

  constructor(camera = new Camera()) {
    this.gl = new WebGL();
    this.camera = camera;
    this.resourceManager = new ResourceManager(this.gl);
    this.projection = new Projection();
  }

  init() {
    this.gl.init();
    this.camera.update();
    this.resize();
  }

  run(cb: any) {
    this.requestFrame()(cb);
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
