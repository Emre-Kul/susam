import Vector4 from '../math/vector4';
import Vector3 from '../math/vector3';

export default class Color {
  code: Vector4;

  constructor(code: Vector4 = Vector4.create()) {
    this.code = code;
  }
  setRed() {
    this.code = Vector4.create(Vector3.create(1), 1);
  }
  setGreen() {
    this.code = Vector4.create(Vector3.create(0, 1), 1);
  }
  setBlue() {
    this.code = Vector4.create(Vector3.create(0, 0, 1), 1);
  }
  setYellow() {
    this.code = Vector4.create(Vector3.create(1, 1, 0), 1);
  }
  setBlack() {
    this.code = Vector4.create(Vector3.create(), 1);
  }
  setWhite() {
    this.code = Vector4.create(Vector3.create(1, 1, 1), 1);
  }
  setRandom() {
    this.code = Vector4.create(Vector3.create(Math.random(), Math.random(), Math.random()), 1);
  }

}
