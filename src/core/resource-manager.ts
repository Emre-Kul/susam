import WebGL from './webgl';
import TextureLoader from '../loaders/texture-loader';
import ShaderLoader from '../loaders/shader-loader';
import ObjectLoader from '../loaders/object-loader';

export default class ResourceManager {

  private readonly resources: any;
  private readonly gl: WebGL;

  constructor(gl: WebGL) {
    this.resources = {
      TEXTURE: {},
      SHADER: {},
      OBJ: {},
    };
    this.gl = gl;
  }

  loadTexture(id: string, url: string) {
    this.load(id, 'TEXTURE', new TextureLoader(this.gl, url));
  }

  loadShader(id: string, url: string) {
    this.load(id, 'SHADER', new ShaderLoader(this.gl, url));
  }

  loadObject(id: string, url: string) {
    this.load(id, 'OBJ', new ObjectLoader(url));
  }

  getTexture(id: string) {
    return this.resources.TEXTURE[id];
  }

  getShader(id: string) {
    return this.resources.SHADER[id];
  }

  getObject(id: string) {
    return this.resources.OBJ[id];
  }

  private load(id: string, type: string, loader: TextureLoader | ShaderLoader | ObjectLoader) {
    this.resources[type][id] = loader.load();
  }
}
