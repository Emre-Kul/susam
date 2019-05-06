import WebGL from './webgl';
import Camera from './camera';
import ResourceManager from './resource-manager';
import Projection from './projection';
import Window from './window';
import PointLight from './point-light';
import World from '../physics/world';
import Timer from './timer';

export default class Scene {
  public camera: Camera;
  public resourceManager: ResourceManager;
  public readonly gl: WebGL;
  public projection: Projection;
  public light: PointLight;
  public world: World | null;
  public timer: Timer;

  constructor(camera = new Camera(), world: World | null) {
    this.gl = new WebGL();
    this.camera = camera;
    this.resourceManager = new ResourceManager(this.gl);
    this.projection = new Projection();
    this.light = new PointLight();
    this.world = world;
    this.timer = new Timer();

    this.setFullScreen = this.setFullScreen.bind(this);
    this.resize = this.resize.bind(this);

  }

  init() {
    this.gl.init();
    this.camera.update();
    this.resize();
  }

  run(cb: any) {
    // TODO: CLEAR MAGIC NUMBERS
    this.timer.tick();
    const dt = this.timer.getDiff() / 1000;
    const requestFrameTime = dt < 1000 / 60 ? 1.0 / 60 : dt;
    if (this.world) {
      this.world.step(1.0 / 60, requestFrameTime, 3);
    }
    this.requestFrame()(cb, requestFrameTime);
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

  private requestFrame() {
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
