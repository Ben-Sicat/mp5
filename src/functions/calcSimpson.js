import * as math from 'mathjs';

const deltaX = (x1, x2, n1) => {
  return (x2 - x1) / n1;
};
const simpsonCalc = (a, b, n, expression) => {
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

    if (i % 2 === 0) {
      sum += 2 * numeratorFn.evaluate({ x: a + i * delta });
    } else {
      sum += 4 * numeratorFn.evaluate({ x: a + i * delta });
    }
  }

  // Return the integral
  return (delta * sum) / 3;
};

export default simpsonCalc;
