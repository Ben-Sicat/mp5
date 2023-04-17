import * as math from "mathjs";

export default function round(trueValue, decimalPlace) { 
    const decimal = math.pow(10, decimalPlace);
    const rounded = Math.round(trueValue * decimal) / decimal;
    return rounded;
}


