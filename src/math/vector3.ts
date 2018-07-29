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


    change(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    changeX(x) {
        this.x = x;
    }

    changeY(y) {
        this.y = y;
    }

    changeZ(z) {
        this.z = z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize(vec) {
        const length = this.length();
        this.change(vec.x / length, vec.y / length, vec.z / length);
    }

    dot(vec) {
        return (this.x * vec.x + this.y * vec.y + this.z * vec.z);
    }

    substract(vec) {
        const resultVector = Vector3.create();
        resultVector.x = this.x - vec.x;
        resultVector.y = this.y - vec.y;
        return resultVector;
    }

}


