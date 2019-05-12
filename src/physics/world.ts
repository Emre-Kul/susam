import { World as CWorld, NaiveBroadphase, RaycastResult, Vec3 } from 'cannon';
import Body from './body';
import Vector3 from '../math/vector3';

export default class World {

  private world: CWorld;

  constructor() {
    this.world = new CWorld();
    this.world.broadphase = new NaiveBroadphase();
    this.world.solver.iterations = 5;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e6;
    this.world.defaultContactMaterial.contactEquationRelaxation = 10;
  }

  setGravity(x: number, y: number, z: number) {
    this.world.gravity.set(x, y, z);
  }

  addBody(body: Body) {
    this.world.addBody(body.cBody);
  }

  step(fixedTimeStep: number, dt: number, maxSubSteps: number) {
    this.world.step(fixedTimeStep, dt, maxSubSteps);
  }

  rayCast(from: Vector3, to: Vector3) {
    const result = new RaycastResult();
    this.world.rayTest(new Vec3(from.x, from.y, from.z), new Vec3(to.x, to.y, to.z), result);
    // console.log(result);
    if (result.body && (result.body as any).id) {
      return (result.body as any).id;
    }
    return null;
  }
}
