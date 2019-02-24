import WebGL from './webgl';
import Camera from './camera';
import Texture from '../graphics/texture';
import TextureLoader from '../graphics/texture-loader';

export default class Scene {
  public gl: WebGL;
  public camera: Camera;

  private textures: Texture[];

  constructor(camera = new Camera()) {
    this.gl = new WebGL();
    this.camera = camera;
    this.textures = [];
  }

  init() {
    this.gl.init();
    this.loadTextures();
    this.camera.update();
  }

  run(cb: any) {
    this.requestFrame()(cb);
  }

  clear() {
    this.gl.clear();
  }

  addTexture(id: string, image: any) {
    this.textures.push(new Texture(id, image));
  }

  private loadTextures() {
    for (const texture of this.textures) {
      const textureLoader = new TextureLoader(this.gl.context, texture);
      textureLoader.load();
    }
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
