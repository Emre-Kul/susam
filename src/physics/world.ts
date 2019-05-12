import { World as CWorld, NaiveBroadphase } from 'cannon';
import Body from './body';

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

}
