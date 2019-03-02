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
  // rotate(vec: Vector3) {}

}
