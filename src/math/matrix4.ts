export default class Matrix4 {

    unit() {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    multiply() { }

    translate(vec) {
        return [
            [1, 0, 0, vec.x],
            [0, 1, 0, vec.y],
            [0, 0, 1, vec.z],
            [0, 0, 0, 1]
        ]
    }

    scale(vec) {
        return [
            [vec.x, 0, 0, 0],
            [0, vec.y, 0, 0],
            [0, 0, vec.z, 0],
            [0, 0, 0, 1]
        ]
    }

    rotateX(angle) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    rotateY(angle) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    rotateZ(angle) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }
}

