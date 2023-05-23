import * as math from 'mathjs';

const deltaX = (x1, x2, n1) => {
  return (x2 - x1) / n1;
};

function checkExpressionIsValid(a, i, delta, expression) {
  // return `Error - Function is not integrable`;
}

const simpsonCalc = (a, b, n, expression) => {
  const numeratorFn = math.parse(expression).compile();
  let delta = deltaX(a, b, n);
  let pointsStack = [];

  let sum = 0;

  if (n % 2 !== 0) return 'Error: n must be even';

  for (let i = 1; i < n; i++) {
    pointsStack.push(`[${a + i * delta}, ${a + (i + 1) * delta}]`);
    console.log(`[${a + i * delta}, ${a + (i + 1) * delta}]`);
    if (pointsStack.length > 5) {
      return `Error - Function is divergent in the following interval(s): ${pointsStack.join(
        ', '
      )}`;
    }

    if (!Number.isFinite(math.evaluate(expression, { x: a + i * delta }))) {
      console.log('infinity issue');
      return `Error - Function is divergent in the following interval(s): ${pointsStack.join(
        ', '
      )}`;
    }

    if (math.isNaN(numeratorFn.evaluate({ x: a + i * delta }))) {
      console.log('NaN issue');
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
