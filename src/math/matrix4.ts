import Vector3 from './vector3';
import Vector4 from './vector4';

export default class Matrix4 {
  public data : any;

  constructor(vec1: Vector4 = Vector4.create(Vector3.create(1)),
              vec2: Vector4 = Vector4.create(Vector3.create(0, 1)),
              vec3: Vector4 = Vector4.create(Vector3.create(0, 0, 1)),
              vec4: Vector4 = Vector4.create(Vector3.create(), 1)) {
    this.data = [
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
    const u = mtr1.data;
    const v = mtr2.data;
    t.data = [];
    for (let i = 0; i < 4; ++i) {
      t.data.push([]);

      for (let j = 0; j < 4; ++j) {
        let sum = 0.0;
        for (let k = 0; k < 4; ++k) {
          sum += u[i][k] * v[k][j];
        }
        t.data[i].push(sum);
      }
    }
    return t;
  }

  static multiplyV3(mtr: Matrix4, vec3: Vector3) {
    const result = [];
    const v = [vec3.x, vec3.y, vec3.z, 1.0];
    let i: number;
    let j: number;
    let sum = 0;
    for (i = 0; i < v.length; i++) {
      sum = 0.0;
      for (let j = 0; j < v.length; j++) {
        sum += mtr.data[i][j] * v[j];
      }
      result.push(sum);
    }
    return Vector3.create(result[0], result[1], result[2]);

  }

  static flatten(mtr: Matrix4) {
    let arr: any[] = [];
    mtr.data.forEach((elem : any) => {
      arr = arr.concat(elem);
    });
    return arr;
  }

  static transpose(mtr: Matrix4) {
    const result = Matrix4.create();
    for (let i = 0; i < mtr.data.length; i++) {
      for (let j = 0; j < mtr.data[i].length; j++) {
        result.data[i][j] = mtr.data[j][i];
      }
    }
    return result;
  }

  translate(vec: Vector3) {
    this.data = [
      [1, 0, 0, vec.x],
      [0, 1, 0, vec.y],
      [0, 0, 1, vec.z],
      [0, 0, 0, 1],
    ];
  }

  scale(vec: Vector3) {
    this.data = [
      [vec.x, 0, 0, 0],
      [0, vec.y, 0, 0],
      [0, 0, vec.z, 0],
      [0, 0, 0, 1],
    ];
  }

  rotateX(angle: number) {
    const c = Math.cos(angle * Math.PI / 180.0);
    const s = Math.sin(angle * Math.PI / 180.0);
    this.data = [
        [1, 0.0, 0.0, 0.0],
        [0, c, -s, 0.0],
        [0, s, c, 0.0],
        [0, 0.0, 0.0, 1.0],
    ];
  }
  rotateY(angle: number) {
    const c = Math.cos(angle * Math.PI / 180.0);
    const s = Math.sin(angle * Math.PI / 180.0);
    this.data = [
      [c, 0.0, s, 0.0],
      [0.0, 1.0, 0.0, 0.0],
      [-s, 0.0, c, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];
  }
  rotateZ(angle: number) {
    const c = Math.cos(angle * Math.PI / 180.0);
    const s = Math.sin(angle * Math.PI / 180.0);
    this.data = [
      [c, -s, 0.0, 0.0],
      [s, c, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.0],
      [0.0, 0.0, 0.0, 1.0],
    ];
  }

  static inverse(m: Matrix4) {
    const a = Matrix4.create();
    const d = Matrix4.det4(m);

    const a00 = [
      Vector3.create(m.data[1][1], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[2][1], m.data[2][2], m.data[2][3]),
      Vector3.create(m.data[3][1], m.data[3][2], m.data[3][3]),
    ];
    const a01 = [
      Vector3.create(m.data[1][0], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[2][0], m.data[2][2], m.data[2][3]),
      Vector3.create(m.data[3][0], m.data[3][2], m.data[3][3]),
    ];
    const a02 = [
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][3]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][3]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][3]),
    ];
    const a03 = [
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][2]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][2]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][2]),
    ];
    const a10 = [
      Vector3.create(m.data[0][1], m.data[0][2], m.data[0][3]),
      Vector3.create(m.data[2][1], m.data[2][2], m.data[2][3]),
      Vector3.create(m.data[3][1], m.data[3][2], m.data[3][3]),
    ];
    const a11 = [
      Vector3.create(m.data[0][0], m.data[0][2], m.data[0][3]),
      Vector3.create(m.data[2][0], m.data[2][2], m.data[2][3]),
      Vector3.create(m.data[3][0], m.data[3][2], m.data[3][3]),
    ];
    const a12 = [
      Vector3.create(m.data[0][0], m.data[0][1], m.data[0][3]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][3]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][3]),
    ];
    const a13 = [
      Vector3.create(m.data[0][0], m.data[0][1], m.data[0][2]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][2]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][2]),
    ];
    const a20 = [
      Vector3.create(m.data[0][1], m.data[0][2], m.data[0][3]),
      Vector3.create(m.data[1][1], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[3][1], m.data[3][2], m.data[3][3]),
    ];
    const a21 = [
      Vector3.create(m.data[0][0], m.data[0][2], m.data[0][3]),
      Vector3.create(m.data[1][0], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[3][0], m.data[3][2], m.data[3][3]),
    ];
    const a22 = [
      Vector3.create(m.data[0][0], m.data[0][1], m.data[0][3]),
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][3]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][3]),
    ];
    const a23 = [
      Vector3.create(m.data[0][0], m.data[0][1], m.data[0][2]),
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][2]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][2]),
    ];

    const a30 = [
      Vector3.create(m.data[0][1], m.data[0][2], m.data[0][3]),
      Vector3.create(m.data[1][1], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[2][1], m.data[2][2], m.data[2][3]),
    ];
    const a31 = [
      Vector3.create(m.data[0][0], m.data[0][2], m.data[0][3]),
      Vector3.create(m.data[1][0], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[2][0], m.data[2][2], m.data[2][3]),
    ];
    const a32 = [
      Vector3.create(m.data[0][0], m.data[0][1], m.data[0][3]),
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][3]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][3]),
    ];
    const a33 = [
      Vector3.create(m.data[0][0], m.data[0][1], m.data[0][2]),
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][2]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][2]),
    ];

    a.data[0][0] = Matrix4.det3(a00) / d;
    a.data[0][1] = -Matrix4.det3(a10) / d;
    a.data[0][2] = Matrix4.det3(a20) / d;
    a.data[0][3] = -Matrix4.det3(a30) / d;
    a.data[1][0] = -Matrix4.det3(a01) / d;
    a.data[1][1] = Matrix4.det3(a11) / d;
    a.data[1][2] = -Matrix4.det3(a21) / d;
    a.data[1][3] = Matrix4.det3(a31) / d;
    a.data[2][0] = Matrix4.det3(a02) / d;
    a.data[2][1] = -Matrix4.det3(a12) / d;
    a.data[2][2] = Matrix4.det3(a22) / d;
    a.data[2][3] = -Matrix4.det3(a32) / d;
    a.data[3][0] = -Matrix4.det3(a03) / d;
    a.data[3][1] = Matrix4.det3(a13) / d;
    a.data[3][2] = -Matrix4.det3(a23) / d;
    a.data[3][3] = Matrix4.det3(a33) / d;

    return a;
  }

  static det4(m: Matrix4): number {
    const m0 = [
      Vector3.create(m.data[1][1], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[2][1], m.data[2][2], m.data[2][3]),
      Vector3.create(m.data[3][1], m.data[3][2], m.data[3][3]),
    ];
    const m1 = [
      Vector3.create(m.data[1][0], m.data[1][2], m.data[1][3]),
      Vector3.create(m.data[2][0], m.data[2][2], m.data[2][3]),
      Vector3.create(m.data[3][0], m.data[3][2], m.data[3][3]),
    ];
    const m2 = [
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][3]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][3]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][3]),
    ];
    const m3 = [
      Vector3.create(m.data[1][0], m.data[1][1], m.data[1][2]),
      Vector3.create(m.data[2][0], m.data[2][1], m.data[2][2]),
      Vector3.create(m.data[3][0], m.data[3][1], m.data[3][2]),
    ];
    return m.data[0][0] * Matrix4.det3(m0) - m.data[0][1] * Matrix4.det3(m1)
        + m.data[0][2] * Matrix4.det3(m2) - m.data[0][3] * Matrix4.det3(m3);
  }

  static det3(m: any): number {
    const d = m[0].x * m[1].y * m[2].z
        + m[0].y * m[1].z * m[2].x
        + m[0].z * m[2].y * m[1].x
        - m[2].x * m[1].y * m[0].z
        - m[1].x * m[0].y * m[2].z
        - m[0].x * m[1].z * m[2].y
    ;
    return d;
  }
}
