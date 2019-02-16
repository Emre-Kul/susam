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

  static create(vec1: Vector4, vec2: Vector4, vec3: Vector4, vec4: Vector4): Matrix4 {
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


  static multiply(matrices: any) {
    return matrices[1];
  }

  static translate(vec: Vector3) {
    return [
            [1, 0, 0, vec.x],
            [0, 1, 0, vec.y],
            [0, 0, 1, vec.z],
            [0, 0, 0, 1],
    ];
  }

  static scale(vec: Vector3) {
    return [
            [vec.x, 0, 0, 0],
            [0, vec.y, 0, 0],
            [0, 0, vec.z, 0],
            [0, 0, 0, 1],
    ];
  }

  static flatten(mtr: any) {
    let arr: any[] = [];
    mtr.forEach((elem : any) => {
      arr = arr.concat(elem);
    });
    return arr;
  }
}
