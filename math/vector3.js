
const Vector3 = function () {
    let x = 0;
    let y = 0;
    let z = 0;
}

Vector3.prototype.change = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.changeX = function (x) {
    this.x = x;
}

Vector3.prototype.changeY = function (y) {
    this.y = y;
}

Vector3.prototype.changeZ = function (z) {
    this.z = z;
}

Vector3.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vector3.prototype.normalize = function (vec) {
    const length = this.length();
    this.change(vec.x / length, vec.y / length, vec.z / length);
}

Vector3.prototype.dot = function (vec) {
    return (this.x * vec.x + this.y * vec.y + this.z * vec.z);
}

