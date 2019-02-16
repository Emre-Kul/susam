import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';
import Vector4 from '../math/vector4';

export default class Camera {
  public target: Vector3;
  public up: Vector3;
  public position: Vector3;

  public viewMatrix: any;

  constructor(target: Vector3, up: Vector3, position: Vector3 = new Vector3()) {
    this.position = position;
    this.target = target;
    this.up = up;
    this.viewMatrix = null;
  }

  // http://webglfactory.blogspot.com/2011/06/how-to-create-view-matrix.html
  lookAt() {
    const p = this.position;
    const t = this.target;
    const vz = new Vector3(p.x - t.x, p.y - t.y, p.z - t.z);
    vz.normalize();
    const vx = Vector3.cross(this.up, vz);
    vx.normalize();
    const vy = Vector3.cross(vx, vz);
    const mtr = Matrix4.create(Vector4.create(vx),
                               Vector4.create(vy),
                               Vector4.create(vz),
                               Vector4.create(this.position, 1));
    this.viewMatrix = mtr; // will inverse
  }
}
