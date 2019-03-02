export default class Window {

  static resizeCanvas(canvas: any) {
    const realToCSSPixels = window.devicePixelRatio;
    const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
    const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  }

}
