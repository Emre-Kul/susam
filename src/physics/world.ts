import { World as CWorld} from 'cannon';
import Body from './body';

export default class World {

  private world: CWorld;

  constructor() {
    this.world = new CWorld();
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
