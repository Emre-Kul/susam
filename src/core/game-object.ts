import Transform from './transform';
import Mesh from './mesh';
import Shader from './shader';
import MeshRenderer from './mesh-renderer';
import Scene from './scene';
import Material from '../graphics/material';

export default class GameObject {
  public transform: Transform;
  public mesh: Mesh;
  public shader: Shader;
  public renderer: MeshRenderer | null;
  public material: Material;

  constructor(transform: Transform, mesh: Mesh, shader: Shader, material: Material) {
    this.transform = transform;
    this.mesh = mesh;
    this.shader = shader;
    this.material = material;
    this.renderer = null;
  }

  render(scene: Scene) {
    if (!this.renderer) {
      this.renderer = new MeshRenderer(this, scene);
    }
    this.renderer.render();
  }

}
