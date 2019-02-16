import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';
import Vector4 from '../math/vector4';

export default class Camera {
  public target: Vector3;
  public up: Vector3;
  public position: Vector3;

  public viewMatrix: any;

  constructor(target: Vector3 = Vector3.create(0, 0, -5),
              up: Vector3 = Vector3.create(0, 1, 0),
              position: Vector3 = new Vector3(0, 0, 5)) {
    this.position = position;
    this.target = target;
    this.up = up;
    this.viewMatrix = null;
  }

  // https://github.com/Emre-Kul/YTU-WEBGL/blob/master/Common/MV.js#L434
  calculateView() {
    const p = this.position;
    const t = this.target;
    const v = Vector3.subtract(p, t);
    v.normalize();
    const n = Vector3.cross(this.up, v);
    n.normalize();
    const u = Vector3.cross(n, v);
    u.normalize();
    v.negate();
    this.viewMatrix = Matrix4.create(Vector4.create(n, - Vector3.dot(n, p)),
                                     Vector4.create(u, - Vector3.dot(u, p)),
                                     Vector4.create(v, - Vector3.dot(v, p)),
                                     Vector4.create());
  }
}
