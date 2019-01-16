export default class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  static create() {
    return new Vector3();
  }

  change(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  changeX(x: number) {
    this.x = x;
  }

  changeY(y: number) {
    this.y = y;
  }

  changeZ(z: number) {
    this.z = z;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize(vec: Vector3) {
    const length = this.length();
    this.change(vec.x / length, vec.y / length, vec.z / length);
  }

  dot(vec: Vector3) {
    return (this.x * vec.x + this.y * vec.y + this.z * vec.z);
  }

  substract(vec: Vector3) {
    const resultVector: Vector3 = Vector3.create();
    resultVector.x = this.x - vec.x;
    resultVector.y = this.y - vec.y;
    return resultVector;
  }

}
