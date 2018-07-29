export default class MathLib {
    static randomInt(low : number, high : number) : number{
         return Math.floor(Math.random()*(high-low)+low);
    }
    static randomFloat(low : number, high : number) : number{
        return Math.random()*(high-low)+low;
    }
}