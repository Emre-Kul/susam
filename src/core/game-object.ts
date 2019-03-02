import Transform from './transform';
import Mesh from './mesh';
import Texture from '../graphics/texture';
import Shader from './shader';

export default class GameObject {
  public transform: Transform;
  public mesh: Mesh;
  public texture: Texture;
  public shader: Shader;

  constructor(transform: Transform, mesh: Mesh, texture: Texture, shader: Shader) {
    this.transform = transform;
    this.mesh = mesh;
    this.texture = texture;
    this.shader = shader;
  }

}
