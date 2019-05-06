export default class Timer {
  private curentTime: number;
  private lastTime: number;
  private started: boolean;

  constructor() {
    this.curentTime = 0;
    this.lastTime = 0;
    this.started = false;
  }

  start() {
    this.started = true;
    this.curentTime = this.getCurrentMs();
  }

  tick() {
    if (!this.started) {
      this.start();
    }
    this.lastTime = this.curentTime;
    this.curentTime = this.getCurrentMs();
  }

  getDiff(): number {
    const diff = this.curentTime - this.lastTime;
    return (diff < 0) ? 0 : diff;
  }

  private getCurrentMs(): number {
    const date = new Date();
    return date.getMilliseconds();
  }

}
