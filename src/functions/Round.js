import * as math from "mathjs";

export default function round(equation, decimalPlace) { 
  try {
    const trueValue = math.evaluate(equation);
    const roundedError = trueValue.toFixed(decimalPlace); 
    return roundedError;
  } catch (e) {
    console.log(e);
    return `There was a problem processing your request: ${e.message}`
  }
}


