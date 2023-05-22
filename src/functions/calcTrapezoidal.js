import * as math from 'mathjs';
import { EXPORT_MARKER } from 'next/dist/shared/lib/constants';

const deltaX = (x1, x2, n1) => {
  return (x2 - x1) / n1;
};

const trapezoidCalc = (a, b, n, expression) => {
  const numeratorFn = math.parse(expression).compile();
  let delta = deltaX(a, b, n);
  let pointsStack = [];
  let sum = 0;

  for (let i = 0; i < n; i++) {
    pointsStack.push(`[${a + i * delta}, ${a + (i + 1) + delta}]`);

    let isValidExpression =
      Number.isFinite(numeratorFn.evaluate({ x: a + i * delta })) ||
      Number.isNaN(numeratorFn.evaluate({ x: a + i * delta }));

    if (!isValidExpression) {
      return `Error - Function is divergent in the following interval(s): ${pointsStack.join(
        ', '
      )}`;
    }

    sum +=
      (numeratorFn.evaluate({ x: a + i * delta }) +
        numeratorFn.evaluate({ x: a + (i + 1) * delta })) /
      2;
  }

  // Return the integral
  return delta * sum;
};

export default trapezoidCalc;
