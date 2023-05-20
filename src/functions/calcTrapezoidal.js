import * as math from 'mathjs';
import { EXPORT_MARKER } from 'next/dist/shared/lib/constants';

const deltaX = (x1, x2, n1) => {
  return (x2 - x1) / n1;
};
//  for i = a; i <= b; i += delta x

function calculateTangent(x) {
  if (Math.abs(x - Math.PI / 2) < 0.00001) {
    return 'undefined'; // Return "undefined" when x is close to π/2
  }

  return Math.tan(x); // Calculate tangent normally for other values of x
}

const trapezoidCalc = (a, b, n, expression) => {
  const numeratorFn = math.parse(expression).compile();
  let delta = deltaX(a, b, n);
  let points = [0];
  let pointsStack = [];
  let result = 0;

  for (let i = a; i < b; i += delta) {
    pointsStack.push(`[${i}, ${i + delta}]`);
    // for user defined, add additional parameter
    let isValidExpression =
      Number.isFinite(numeratorFn.evaluate({ x: i })) ||
      Number.isNaN(numeratorFn.evaluate({ x: i }));

    if (!isValidExpression) {
      return `Error - Function is divergent in the following interval(s): ${pointsStack.join(
        ', '
      )}`;
    }

    if (i === a) {
      points.push(numeratorFn.evaluate({ x: i }));
      continue;
    }

    points.push(2 * numeratorFn.evaluate({ x: i }));

    if (i + delta === b) {
      points.push(numeratorFn.evaluate({ x: i }));
    }
  }

  points.forEach(p => console.log(`===> ${p}`));

  points.forEach(p => (result += p));

  return (delta / 2) * result;
};

export default trapezoidCalc;
