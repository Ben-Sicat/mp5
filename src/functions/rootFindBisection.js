import * as math from 'mathjs';

export function rootFindBisection({userFunction, firstGuessPoint, secondGuessPoint, numberOfIterations, tolerance}) {
  
  if (firstGuessPoint * secondGuessPoint > 0) throw new Error('Interval must have opposite signs');

  // makes the array one-based index
  const result = [{}];
  const parsedUserFunction = math.parse(userFunction);
  const executableFunction = parsedUserFunction.compile();

  let currentIteration = 1;
  
  while (currentIteration <= numberOfIterations) {
    let midpoint = (firstGuessPoint + secondGuessPoint) / 2;
    let midpointOutput = executableFunction.evaluate({ x: midpoint });
  
    result.push({
        iteration: currentIteration,
        firstPoint: firstGuessPoint,
        secondPoint: secondGuessPoint,
        toleranceValue: secondGuessPoint - firstGuessPoint,
        midpoint,
        midpointOutput
      });
    
    if (midpointOutput === 0 || (secondGuessPoint - firstGuessPoint) / 2 < tolerance)
      break;
    
    let firstPointOutput = executableFunction.evaluate({ x: firstGuessPoint });
    
    currentIteration++;
    
    if (midpointOutput * firstPointOutput > 0)
      firstGuessPoint = midpoint;
    else
      secondGuessPoint = midpoint;
  }
  
  return result;
}

const exampleBisectionInput = {
  userFunction: 'log(x+1, e)',
  firstGuessPoint: 0,
  secondGuessPoint: 10,
  numberOfIterations: 20,
  tolerance: 0.0001
}

export function testBisection() {
  console.log(rootFindBisection(exampleBisectionInput));
}
