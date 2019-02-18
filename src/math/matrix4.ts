import Vector3 from './vector3';
import Vector4 from './vector4';

export default class Matrix4 {
  public matrix : any;

  constructor(vec1: Vector4 = Vector4.create(Vector3.create(1)),
              vec2: Vector4 = Vector4.create(Vector3.create(0, 1)),
              vec3: Vector4 = Vector4.create(Vector3.create(0, 0, 1)),
              vec4: Vector4 = Vector4.create(Vector3.create(), 1)) {
    this.matrix = [
        [vec1.x, vec1.y, vec1.z, vec1.w],
        [vec2.x, vec2.y, vec2.z, vec2.w],
        [vec3.x, vec3.y, vec3.z, vec3.w],
        [vec4.x, vec4.y, vec4.z, vec4.w],
    ];
  }

  static create(vec1: Vector4 = Vector4.create(Vector3.create(1)),
                vec2: Vector4 = Vector4.create(Vector3.create(0, 1)),
                vec3: Vector4 = Vector4.create(Vector3.create(0, 0, 1)),
                vec4: Vector4 = Vector4.create(Vector3.create(), 1)): Matrix4 {
    return new Matrix4(vec1, vec2, vec3, vec4);
  }

  static unit() {
    return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
    ];
  }

  static multiply(mtr1: Matrix4, mtr2: Matrix4) {
    const t = Matrix4.create();
    const u = mtr1.matrix;
    const v = mtr2.matrix;
    t.matrix = [];
    for (let i = 0; i < 4; ++i) {
      t.matrix.push([]);

      for (let j = 0; j < 4; ++j) {
        let sum = 0.0;
        for (let k = 0; k < 4; ++k) {
          sum += u[i][k] * v[k][j];
        }
        t.matrix[i].push(sum);
      }
    }
    return t;
  }

  static flatten(mtr: Matrix4) {
    mtr.transpose();
    let arr: any[] = [];
    mtr.matrix.forEach((elem : any) => {
      arr = arr.concat(elem);
    });
    return arr;
  }

  transpose() {
    const result = Matrix4.unit();
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        result[i][j] = this.matrix[j][i];
      }
    }
    this.matrix = result;
  }

  translate(vec: Vector3) {
    this.matrix = [
      [1, 0, 0, vec.x],
      [0, 1, 0, vec.y],
      [0, 0, 1, vec.z],
      [0, 0, 0, 1],
    ];
  }

  scale(vec: Vector3) {
    this.matrix = [
      [vec.x, 0, 0, 0],
      [0, vec.y, 0, 0],
      [0, 0, vec.z, 0],
      [0, 0, 0, 1],
    ];
  }

  // rotateX(vec: Vector3) {}
  // rotateY(vec: Vector3) {}
  // rotateZ(vec: Vector3) {}
  // rotate(vec: Vector3) {}

}
