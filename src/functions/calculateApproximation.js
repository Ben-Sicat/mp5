import * as math from 'mathjs';

export const calculateTrueError = (trueValue, approximateValue) => {
  console.log(trueValue - approximateValue);
  return math.abs(trueValue - approximateValue);
}

export const calculateRelativeError = (trueValue, approximateValue) => {
  const trueError = calculateTrueError(trueValue, approximateValue);
  console.log((trueError / trueValue) * 100);
  return math.abs(trueError / trueValue) * 100;
}