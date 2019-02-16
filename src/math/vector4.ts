import Vector3 from './vector3';

export default class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(vec: Vector3, w:number = 0) {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = w;
  }

  static create(vec: Vector3, w:number = 0) {
    return new Vector4(vec, w);
  }
}
