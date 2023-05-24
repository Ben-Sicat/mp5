import * as math from 'mathjs';

export default function rootFindBisection({
  userFunction,
  firstGuessPoint,
  secondGuessPoint,
  tolerance,
  numberOfIterations = 0,
}) {
  // if (firstGuessPoint * secondGuessPoint > 0) throw new Error('Interval must have opposite signs');

  // makes the array one-based index
  firstGuessPoint = parseFloat(firstGuessPoint);
  secondGuessPoint = parseFloat(secondGuessPoint);
  numberOfIterations = parseFloat(numberOfIterations);
  tolerance = parseFloat(tolerance);
  if (numberOfIterations === 0) numberOfIterations = 100;

  const result = [{}];
  const parsedUserFunction = math.parse(userFunction);
  const executableFunction = parsedUserFunction.compile();

  let currentIteration = 1;

  while (currentIteration <= parseInt(numberOfIterations)) {
    let nextPoint = (firstGuessPoint + secondGuessPoint) / 2;
    let nextPointOutput = executableFunction.evaluate({ x: nextPoint });

    result.push({
      iteration: currentIteration,
      firstPoint: firstGuessPoint,
      secondPoint: secondGuessPoint,
      toleranceValue: secondGuessPoint - firstGuessPoint,
      nextPoint,
      nextPointOutput,
    });

    if (
      nextPointOutput === 0 ||
      (secondGuessPoint - firstGuessPoint) / 2 < tolerance
    ) {
      return {
        message: `The function has a root in ${nextPointOutput} in interval [${firstGuessPoint}, ${secondGuessPoint}], non-integrable`,
        stack: result,
      };
    }

    let firstPointOutput = executableFunction.evaluate({ x: firstGuessPoint });

    currentIteration++;

    if (nextPointOutput * firstPointOutput > 0) firstGuessPoint = nextPoint;
    else secondGuessPoint = nextPoint;
  }
  console.log(result);

  return result;
  // return `The function has a root in ${result.nextPointOutput} in interval [${result.firstPoint}, ${result.secondPoint}], non-integrable`;
}

// const exampleBisectionInput = {
//   userFunction: 'log(x+1, e)',
//   firstGuessPoint: 0,
//   secondGuessPoint: 10,
//   numberOfIterations: 20,
//   tolerance: 0.0001,
// };

// export function testBisection() {
//   console.log(rootFindBisection(exampleBisectionInput));
// }
