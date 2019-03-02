import Transform from './transform';
import Mesh from './mesh';
import Texture from '../graphics/texture';
import Shader from './shader';
import MeshRenderer from './mesh-renderer';
import Scene from './scene';

export default class GameObject {
  public transform: Transform;
  public mesh: Mesh;
  public texture: Texture;
  public shader: Shader;
  public renderer: MeshRenderer | null;

  constructor(transform: Transform, mesh: Mesh, texture: Texture, shader: Shader) {
    this.transform = transform;
    this.mesh = mesh;
    this.texture = texture;
    this.shader = shader;
    this.renderer = null;
  }

  render(scene: Scene) {
    if (!this.renderer) {
      this.renderer = new MeshRenderer(this, scene);
    }
    this.renderer.render();
  }

}
