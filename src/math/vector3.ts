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

  negate() {
    this.x = 0 - this.x;
    this.y = 0 - this.y;
    this.z = 0 - this.z;
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

  length2() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  normalizeWith(length: number) {
    if (this.x === 0 && this.y === 0 && this.z === 0) return;
    this.change(this.x / length, this.y / length, this.z / length);
  }

  normalize() {
    if (this.x === 0 && this.y === 0 && this.z === 0) return;
    const length = this.length();
    this.change(this.x / length, this.y / length, this.z / length);
  }

  add(vec: Vector3) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  multiply(vec: Vector3) {
    this.x = this.x * vec.x;
    this.y = this.y * vec.y;
    this.z = this.z * vec.z;
  }

  static dot(vec1: Vector3, vec2: Vector3): number {
    return (vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z);
  }

  static subtract(vec1: Vector3, vec2: Vector3): Vector3 {
    const x = vec1.x - vec2.x;
    const y = vec1.y - vec2.y;
    const z = vec1.z - vec2.z;
    return Vector3.create(x, y, z);
  }

  // https://www.mathsisfun.com/algebra/vectors-cross-product.html
  static cross(a: Vector3, b: Vector3): Vector3 {
    const crossProduct = Vector3.create();
    crossProduct.x = a.y * b.z - a.z * b.y;
    crossProduct.y = a.z * b.x - a.x * b.z;
    crossProduct.z = a.x * b.y - a.y * b.x;
    return crossProduct;
  }
}
