export function createAntiderivative(func){
    return function(x){
        return JXG.Math.Numerics.I([0,x],func);
    };
}