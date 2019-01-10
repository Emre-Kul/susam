import Vector3 from "../physics/vector3";

export default class Transform {
    public position : Vector3;
    public scale : Vector3;
    public rotate : Vector3;

    constructor(){
        this.position = new Vector3();
        this.scale = new Vector3();
        this.rotate = new Vector3();
    }

}