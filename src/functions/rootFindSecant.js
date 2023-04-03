import * as math from 'mathjs';
import next from 'next';


export function rootFindSecant({ userFunction, firstGuessPoint, secondGuessPoint, numberOfIterations, tolerance }) {
  // ? when user selected iterative approach, show c, f(c), Ɛ = | last iteration - previous iteration |
  // ? when user selected tolerance approach, c, f(c), number of iterations
  firstGuessPoint = parseInt(firstGuessPoint);
  secondGuessPoint = parseInt(secondGuessPoint);
  numberOfIterations = parseInt(numberOfIterations);
  tolerance = parseFloat(tolerance)
  if (numberOfIterations === 0) numberOfIterations = 100;

  // makes the array one-based index
  const result = [{}];
  const parsedUserFunction = math.parse(userFunction);
  const executableFunction = parsedUserFunction.compile();

  for (let i = 1; i <= numberOfIterations; ++i) {
      let firstPointScope = {
        x: i === 1 ?  firstGuessPoint : result[i - 1].secondPoint,
      }

      let secondPointScope = {
        x: i === 1 ?  secondGuessPoint : result[i - 1].nextPoint,
      }

      const currentIteration = ({
        iteration: i,
        firstPoint: firstPointScope.x,
        secondPoint: secondPointScope.x,
        firstPointOutput: executableFunction.evaluate(firstPointScope),
        secondPointOutput:  executableFunction.evaluate(secondPointScope)
      })

      currentIteration.nextPoint = currentIteration.secondPoint - ((currentIteration.secondPointOutput * (currentIteration.secondPoint - currentIteration.firstPoint))/(currentIteration.secondPointOutput - currentIteration.firstPointOutput))

      let nextPointScope = {
        x: currentIteration.nextPoint
      }

      currentIteration.nextPointOutput = executableFunction.evaluate(nextPointScope)

      
      result.push(currentIteration);

      const iterationTolerance = currentIteration.toleranceValue = math.abs(currentIteration.firstPoint - currentIteration.secondPoint);
      currentIteration.toleranceValue = iterationTolerance;
      if (iterationTolerance < tolerance || currentIteration.secondPoint === 0) {
        break;
      };
    }

  return result;
}

const exampleSecantInput = {
  userFunction: 'log(x+1, e)',
  firstGuessPoint: 0,
  secondGuessPoint: 1,
  // if user selected tolerance value
  numberOfIterations: 20 ?? 100,
  // if user selected iterative
  tolerance: 0.0001 ?? 0
}

export function testSecant() {
  console.log(rootFindSecant(exampleSecantInput));
}
