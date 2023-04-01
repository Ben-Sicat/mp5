import * as math from 'mathjs';
import next from 'next';

// ? formula logic
// * the loop is dependent to the number of iterations
// * at first iteration: 
// * first guess value is used to find the first point user defined function output
// * second guess value is used to find the second point user defined function output
// * first and second point user defined output will be used to find the next point using the secant formula
// * 
// * then the next point will always be assigned to second point on following iterations

// ? can number of iterations and accuracy be both provided the user? if yes, find a logic that satisfies that
// ? in part 2, are we only tasked to use one method for finding the root of user defined function?
// ? in part 1, we only have to implement two methods, one of them is bisection, do we have to choose for the second one? it makes sense to use the assigned method (?) for part 2

// ? part 1:
// ? predefined function from previous machine problem - ln(x + 1)
// ? use bisection and secant.
// ? part 2:
// ? user defined function
// ? same shit from part 1

// ! todo: review for refactoring

function rootFindSecant({userFunction, firstGuessPoint, secondGuessPoint, numberOfIterations = 100, tolerance}) {
  // ? when user selected iterative approach, show c, f(c), Ɛ = last iteration - previous iteration
  // ? when user selected tolerance approach, c, f(c), number of iterations
  // ? c = nextPoint, f(c) = nextPointOutput
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

      if (tolerance && math.abs(currentIteration.firstPoint - currentIteration.secondPoint) < tolerance ) break;
    }

  return result;
}

const exampleSecantInput = {
  userFunction: '3x^3-x-1',
  firstGuessPoint: -1,
  secondGuessPoint: 1,
  // if user selected tolerance value
  numberOfIterations: 20 ?? 100,
  // if user selected iterative
  tolerance: 0.0001 ?? 0
}

export default function testSecant() {
  console.log(rootFindSecant(exampleSecantInput));
}
