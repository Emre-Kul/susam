let main;

const init = function () {
    main = new glp.Main('gl-canvas', WebGLUtils);
    main.gl.viewport(0, 0, main.canvas.width, main.canvas.height);
    main.gl.clearColor(1.0, 1.0, 1.0, 1.0);

    let vertices = createScene();

    // Load the data into the GPU
    const bufferId = main.gl.createBuffer();
    main.gl.bindBuffer(main.gl.ARRAY_BUFFER, bufferId);
    main.gl.bufferData(main.gl.ARRAY_BUFFER, new Float32Array(vertices), main.gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    const vPos = main.gl.getAttribLocation(main.program, "vPosition");
    main.gl.vertexAttribPointer(vPos, 2, main.gl.FLOAT, false, 0, 0);
    main.gl.enableVertexAttribArray(vPos);

    render(vertices.length);
}

const createScene = function(){
    let vertices = [];
    for (let i = 1; i < 50; i++) {
        vertices = glp.Shape.rect([0, 0], 0.05 * i, 0.05 * i).concat(vertices);
    }
    return vertices;
}

const render = function (size) {
    main.gl.clear(main.gl.COLOR_BUFFER_BIT);
    for (let i = 0; i < size; i += 4){
        main.gl.drawArrays(main.gl.LINE_LOOP, i, 4);
    }
}

window.onload = init;