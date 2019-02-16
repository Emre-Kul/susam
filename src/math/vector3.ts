export default class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y:number = 0, z:number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static create(x: number = 0, y: number = 0, z: number = 0) {
    return new Vector3(x, y, z);
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

  normalize() {
    const length = this.length();
    this.change(this.x / length, this.y / length, this.z / length);
  }

  substract(vec: Vector3) {
    const resultVector: Vector3 = Vector3.create();
    resultVector.x = this.x - vec.x;
    resultVector.y = this.y - vec.y;
    return resultVector;
  }

  static dot(vec1: Vector3, vec2: Vector3): number {
    return (vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z);
  }

  // https://www.mathsisfun.com/algebra/vectors-cross-product.html
  static cross(a: Vector3, b: Vector3): Vector3 {
    const crossProduct = new Vector3();
    crossProduct.x = a.y * b.z - a.z * b.y;
    crossProduct.y = a.z * b.x - a.x * b.z;
    crossProduct.z = a.x * b.y - a.y * b.x;
    return crossProduct;
  }
}
