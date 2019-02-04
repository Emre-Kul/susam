export default class Mesh {
  private vertices: number[];

  constructor() {
    this.vertices = [];
  }

  getVertices() {
    return this.vertices;
  }

  setVertices(vertices: number[]) {
    this.vertices = vertices;
  }

}
