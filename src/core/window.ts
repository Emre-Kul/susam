import WebGL from './webgl';

export default class Window {

  static resizeCanvas(gl: WebGL) {
    const canvas = gl.canvas;
    const realToCSSPixels = window.devicePixelRatio;
    const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
    const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
    gl.context.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

}
