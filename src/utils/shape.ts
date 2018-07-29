const SQRT_3 = Math.sqrt(3);

export default {
    
    rect: function (center, width, height) {
        return [
            center[0]-width/2,center[1]+height/2,
            center[0]+width/2,center[1]+height/2,

            center[0]+width/2,center[1]-height/2,
            center[0]-width/2,center[1]-height/2

        ];
        //top-left
        //top-right
        //bottom-right
        //bottom-left
    },
    
    triangle: function (center, size) {
        return [
            center[0] - size, center[1] - size,//left
            center[0], center[1] + size*2,//top
            center[0] + size, center[1] - size//right
        ];
    },
    
    triangle2: function (center, size) {
        let height = SQRT_3 * size;
        return [
            center[0] - size, center[1] - (height / 3.0),//left
            center[0], center[1] + (height * 2.0 / 3.0),//top
            center[0] + size, center[1] - (height / 3.0)//right
        ];
    },
}