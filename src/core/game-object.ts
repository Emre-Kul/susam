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
    this.updateObject(true);
  }

  render(scene: Scene) {
    if (!this.renderer) {
      this.renderer = new MeshRenderer(this, scene);
    }
    this.renderer.render();
  }

  public updateObject(reverse: boolean = false) {
    if (this.body) {
      const bp = this.body.cBody.position;
      // const br = this.body.getRotation();
      if (reverse) {
        this.body.setPosition(this.transform.position);
        this.body.addShape(this.transform.scale);
      } else {
        this.transform.position = Vector3.create(bp.x, bp.y, bp.z);
        // this.transform.rotationAngle = 2 * Math.cos(br.w);
        // this.transform.rotate = Vector3.create(br.x, br.y, br.z);
        // console.log(br.w);
      }
    }
  }

}
