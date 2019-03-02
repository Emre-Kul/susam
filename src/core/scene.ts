import WebGL from './webgl';
import Camera from './camera';
import ResourceManager from './resource-manager';
import TextureLoader from '../loaders/texture-loader';
import ShaderLoader from '../loaders/shader-loader';
import Projection from './projection';

export default class Scene {
  public camera: Camera;
  public resourceManager: ResourceManager;

  public readonly gl: WebGL;
  public projection: Projection;
  constructor(camera = new Camera()) {
    this.gl = new WebGL();
    this.camera = camera;
    this.resourceManager = new ResourceManager();
    this.projection = new Projection();
  }

  init() {
    this.gl.init();
    this.camera.update();
    this.projection.calculate();
  }

  run(cb: any) {
    this.requestFrame()(cb);
  }

  clear() {
    this.gl.clear();
  }

  public loadTexture(id: string, image: any) {
    const textureLoader = new TextureLoader(this.gl, image);
    this.resourceManager.load(id, textureLoader);
  }

  public loadShader(id: string, vertexId: string, fragmentId: string) {
    const shaderLoader = new ShaderLoader(this.gl, vertexId, fragmentId);
    this.resourceManager.load(id, shaderLoader);
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
