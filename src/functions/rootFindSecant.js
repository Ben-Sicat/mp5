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


function rootFindSecant({userFunction, firstGuessPoint, secondGuessPoint, numberOfIterations}) {
  // makes the array one-based index
  const result = [{}];
  const parsedUserFunction = math.parse(userFunction);
  const executableFunction = parsedUserFunction.compile();
  
  
  // let firstPointScope = {
  //   x: 0,
  // }

  // let secondPointScope = {
  //   x: 0
  // }

  // if (i === 1) {
    let firstPointScope = {
      x: firstGuessPoint,
    }

    let secondPointScope = {
      x: secondGuessPoint,
    }

    const firstIteration = ({
      iteration: 1,
      firstPoint: firstGuessPoint,
      secondPoint: secondGuessPoint,
      firstPointOutput: executableFunction.evaluate(firstPointScope),
      secondPointOutput: executableFunction.evaluate(secondPointScope),
    })
    
    firstIteration.nextPoint = secondGuessPoint - ((firstIteration.secondPointOutput * (firstIteration.secondPoint - firstIteration.firstPoint))/(firstIteration.secondPointOutput - firstIteration.firstPointOutput))

    let nextPointScope = {
      x: firstIteration.nextPoint
    }

    firstIteration.nextPointOutput = executableFunction.evaluate(nextPointScope)
  result.push(firstIteration);
  // }
  // for (let i = 1; i <= numberOfIterations; i++) {
    // reassignment will execute first, index - 1
    // else {
    //   firstPointScope = {
    //     x: result[i - 1].secondPoint,
    //   }

    //   secondPointScope = {
    //     x: result[i - 1].nextPoint,
    //   }
    //   result.push({
    //     iteration: i,
    //     firstPoint: result[i - 1].secondPoint,
    //     secondPoint: result[i - 1].nextPoint,
    //     firstPointOutput: executableFunction.evaluate(firstPointScope),
    //     secondPointOutput: executableFunction.evaluate(secondPointScope),
    //     nextPoint: secondGuessPoint - ((secondPointOutput * (secondGuessPoint - firstGuessPoint))/(secondPointOutput - firstPointOutput)),
        // nextPointOutput: executableFunction.evaluate(nextPoint)
  //     })
  //   }
  // }

  return result;
}

const exampleSecantInput = {
  userFunction: '3x^3-x-1',
  firstGuessPoint: -1,
  secondGuessPoint: 1,
  numberOfIterations: 1
}

export default function testSecant() {
  console.log(rootFindSecant(exampleSecantInput));
}
