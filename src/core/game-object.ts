import Transform from './transform';
import Mesh from './mesh';
import Shader from './shader';
import MeshRenderer from './mesh-renderer';
import Scene from './scene';
import Material from '../graphics/material';
import Body from '../physics/body';
import Vector3 from '../math/vector3';

export default class GameObject {
  public transform: Transform;
  public mesh: Mesh;
  public shader: Shader;
  public renderer: MeshRenderer | null;
  public material: Material;
  public body: Body | undefined;

  constructor(transform: Transform, mesh: Mesh, shader: Shader, material: Material, body?: Body) {
    this.transform = transform;
    this.mesh = mesh;
    this.shader = shader;
    this.material = material;
    this.renderer = null;
    this.body = body;
  }

  render(scene: Scene) {
    if (!this.renderer) {
      this.renderer = new MeshRenderer(this, scene);
    }
    this.renderer.render();
  }

  public updateObject() {
    if (this.body) {
      const p = this.body.cBody.position;
      // this.transform.position = new Vector3(p.x, p.y, p.z);
    }
  }
}
