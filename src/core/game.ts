import Scene from './scene';
import ResourceManager from './resource-manager';
import World from '../physics/world';
import Timer from './timer';
import GameObject from './game-object';
import Vector3 from '../math/vector3';

export default class Game {
  public scene: Scene;
  public resourceManager: ResourceManager;
  public world: World;
  public timer: Timer;
  public objects: GameObject[];

  constructor(scene: Scene, world: World = new World()) {
    this.scene = scene;
    this.resourceManager = new ResourceManager(this.scene.gl);
    this.timer = new Timer();
    this.world = world;
    this.objects = [];
  }

  init() {
    this.world.setGravity(0, -9.5, 0);
    this.scene.init();
  }

  run(cb: any) {
    this.timer.tick();
    const dt = this.timer.getDiff() / 1000;
    const requestFrameTime = dt < 1000 / 60 ? 1.0 / 60 : dt;
    if (this.world) {
      this.updateWorld();
      this.world.step(1.0 / 60, requestFrameTime, 3);
    }
    this.scene.requestFrame()(cb, requestFrameTime);
  }

  render() {
    this.scene.clear();
    for (const gameObject of this.objects) {
      gameObject.render(this.scene);
    }
  }

  sortObjectsByCamera(start: number, size: number = this.objects.length) {
    const camPos = this.scene.camera.eye;
    this.objects = this.objects.slice(0, start).concat(this.objects.slice(start, size).sort((obj1, obj2): any => {
      const dist1 = Vector3.subtract(obj1.transform.position, camPos).length2();
      const dist2 = Vector3.subtract(obj2.transform.position, camPos).length2();
      return dist2 - dist1;
    })).concat(this.objects.slice(start + size, this.objects.length - start - size));
  }

  addObject(gameObject: GameObject, id?: string) {
    if (id) {
      this.objects[id as any] = gameObject;
    } else {
      this.objects.push(gameObject);
    }
    if (gameObject.body) {
      this.world.addBody(gameObject.body);
    }
  }

  private updateWorld() {
    for (const o of this.objects) {
      o.updateObject();
    }
  }

}
