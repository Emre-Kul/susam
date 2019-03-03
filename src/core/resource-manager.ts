import WebGL from './webgl';
import TextureLoader from '../loaders/texture-loader';
import ShaderLoader from '../loaders/shader-loader';

export default class ResourceManager {

  private readonly resources: any;
  private readonly gl: WebGL;

  constructor(gl: WebGL) {
    this.resources = {
      TEXTURE: {},
      SHADER: {},
    };
    this.gl = gl;
  }

  loadTexture(id: string, image: any) {
    this.load(id, 'TEXTURE', new TextureLoader(this.gl, image));
  }

  loadShader(id: string, vertexId: string, fragmentId: string) {
    this.load(id, 'SHADER', new ShaderLoader(this.gl, vertexId, fragmentId));
  }

  getTexture(id: string) {
    return this.resources.TEXTURE[id];
  }
  getShader(id: string) {
    return this.resources.SHADER[id];
  }

  private load(id: string, type: string, loader: TextureLoader | ShaderLoader) {
    this.resources[type][id] = loader.load();
  }
}
