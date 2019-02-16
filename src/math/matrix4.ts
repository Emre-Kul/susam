import Vector3 from './vector3';

export default class Matrix4 {

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
