function simpleCalc(params) {
    var a = params.a, b = params.b;
    return { a: a, b: b, calculated: a + b };
}
module.exports = simpleCalc;
