import * as math from 'mathjs';

export const calculateTrueError = (trueValue, approximateValue) => {
  return math.abs(trueValue - approximateValue);
}

export const calculateRelativeError = (trueValue, approximateValue) => {
  return math.abs((trueValue - approximateValue) / trueValue) * 100;
}