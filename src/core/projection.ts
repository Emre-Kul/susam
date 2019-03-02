import Matrix4 from '../math/matrix4';

export default class Projection {
  get matrix() : Matrix4 {
    return this._matrix;
  }

  public fovy: number;
  public aspect: number;
  public near: number;
  public far: number;

  private _matrix: Matrix4;

  constructor(fovy: number = 45, aspect: number = 1, near: number = -10, far: number = 100) {
    this.fovy = fovy;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
    this._matrix = Matrix4.create();
  }

  public calculate() {
    this._matrix = Matrix4.create();
    const f = 1.0 / Math.tan((this.fovy * Math.PI / 180.0) / 2);
    const d = this.far - this.near;

    this._matrix.data[0][0] = f / this.aspect;
    this._matrix.data[1][1] = f;
    this._matrix.data[2][2] = -(this.near + this.far) / d;
    this._matrix.data[2][3] = -2 * this.near * this.far / d;
    this._matrix.data[3][2] = -1;
    this._matrix.data[3][3] = 0.0;
  }

}
