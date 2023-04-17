import * as math from "mathjs";

export default function chop(trueValue, decimalPlace) {
    // let trueValue = parseFloat(math.evaluate(equation));
    const decimal = math.pow(10, decimalPlace);
    const resultChopped = math.floor(trueValue * decimal) / decimal;

    return resultChopped;
}
