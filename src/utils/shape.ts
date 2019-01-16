import Vector3 from '../math/vector3.js';

const SQRT_3 = Math.sqrt(3);

export default {
    
    rect: function (center: Vector3, width: number, height: number) {
        return [
            center.x-width/2,center.y+height/2,
            center.x+width/2,center.y+height/2,
            center.x+width/2,center.y-height/2,
            center.x-width/2,center.y-height/2

        ];
    },
    
    triangle: function (center: Vector3, size: number) {
        return [
            center.x - size, center.y - size,//left
            center.x, center.y + size*2,//top
            center.x + size, center.y - size//right
        ];
    },
    
    triangle2: function (center: Vector3, size: number) {
        let height = SQRT_3 * size;
        return [
            center.x - size, center.y - (height / 3.0),//left
            center.x, center.y + (height * 2.0 / 3.0),//top
            center.x + size, center.y - (height / 3.0)//right
        ];
    },
}