import Vector3 from '../math/vector3';
import Matrix4 from '../math/matrix4';
import Vector4 from '../math/vector4';

export default class Camera {
  public target: Vector3;
  public up: Vector3;
  public position: Vector3;

  public viewMatrix: any;
  public projectionMtr: any;

  constructor(position: Vector3 = new Vector3(4, 3, 3),
              target: Vector3 = Vector3.create(0, 0, 0),
              up: Vector3 = Vector3.create(0, 1, 0),
              ) {
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
  // https://github.com/Emre-Kul/YTU-WEBGL/blob/master/Common/MV.js#L496
  calculateProjection(fovy: number = 45, aspect: number = 1, near: number = -10, far: number = 100) {
    this.projectionMtr = Matrix4.create();
    const f = 1.0 / Math.tan((fovy * Math.PI / 180.0) / 2);
    const d = far - near;

    this.projectionMtr.matrix[0][0] = f / aspect;
    this.projectionMtr.matrix[1][1] = f;
    this.projectionMtr.matrix[2][2] = -(near + far) / d;
    this.projectionMtr.matrix[2][3] = -2 * near * far / d;
    this.projectionMtr.matrix[3][2] = -1;
    this.projectionMtr.matrix[3][3] = 0.0;
    console.log(this.projectionMtr.matrix);
  }
}
