export default class Random {

  static int(low : number, high : number) : number {
    return Math.floor(Math.random() * (high - low) + low);
  }

  static float(low : number, high : number) : number {
    return Math.random() * (high - low) + low;
  }

}
