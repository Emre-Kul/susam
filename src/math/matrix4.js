const Matrix4 = function () { }

Matrix4.prototype.unit = function () {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

Matrix4.prototype.multiply = function () { }

Matrix4.prototype.translate = function (vec) {
    return [
        [1, 0, 0, vec.x],
        [0, 1, 0, vec.y],
        [0, 0, 1, vec.z],
        [0, 0, 0, 1]
    ]
}

Matrix4.prototype.scale = function (vec) {
    return [
        [vec.x, 0, 0, 0],
        [0, vec.y, 0, 0],
        [0, 0, vec.z, 0],
        [0, 0, 0, 1]
    ]
}

Matrix4.prototype.rotateX = function (angle) {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

Matrix4.prototype.rotateY = function (angle) {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

Matrix4.prototype.rotateZ = function (angle) {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

Matrix4.prototype.rotate = function () { }

module.exports = Matrix4;