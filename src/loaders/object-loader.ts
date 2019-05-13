import Loader from './loader';
import Mesh from '../core/mesh';
import { Mesh as WOLMesh } from 'webgl-obj-loader';

export default class ObjectLoader extends Loader {

  constructor(url: string) {
    super(url);
    this.url = url;
  }

  load() {
    const mesh = new Mesh();
    mesh.ready = false;
    this.requestUrl().then((data) => {
      const loadedMesh = new WOLMesh(data as string);
      mesh.vertices = loadedMesh.vertices;
      mesh.indices = loadedMesh.indices;
      mesh.textureVertices = loadedMesh.textures;
      mesh.normals = loadedMesh.vertexNormals;
      mesh.ready = true;
    });
    return mesh;
  }

}
