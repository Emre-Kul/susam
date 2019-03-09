import Vector3 from '../math/vector3';

export default class Physics {

  static move(point: Vector3, target: Vector3, speed: number) {
    const path = Vector3.subtract(target, point);
    const length = path.length();
    if (length < speed) return target;
    path.normalizeWith(length);
    path.multiply(Vector3.create(speed, speed, speed));
    path.add(point);
    return path;
  }

}
