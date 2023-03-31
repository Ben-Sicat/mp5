import * as math from 'mathjs';

// input: Function f, 
//        endpoint values a, b, 
//        tolerance TOL, 
//        maximum iterations NMAX
// conditions: a < b, 
//             either f(a) < 0 and f(b) > 0 or f(a) > 0 and f(b) < 0
// output: value which differs from a root of f(x) = 0 by less than TOL
 
// N ← 1
// while N ≤ NMAX do // limit iterations to prevent infinite loop
//     c ← (a + b)/2 // new midpoint
//     if f(c) = 0 or (b – a)/2 < TOL then // solution found
//         Output(c)
//         Stop
//     end if
//     N ← N + 1 // increment step counter
//     if sign(f(c)) = sign(f(a)) then a ← c else b ← c // new interval
// end while

function rootFindBisection({userFunction, firstGuessPoint, secondGuessPoint, numberOfIterations, tolerance}) {
  if (firstGuessPoint * secondGuessPoint > 0) throw new Error('Interval must have opposite signs');

  
  // makes the array one-based index
  const result = [{}];
  const parsedUserFunction = math.parse(userFunction);
  const executableFunction = parsedUserFunction.compile();

  let currentIteration = 1;
  
  while (currentIteration <= numberOfIterations) {
    let midpoint = (firstGuessPoint + secondGuessPoint) / 2;
    let midpointOutput = executableFunction.evaluate({ x: midpoint });

    result.push({ midpoint, midpointOutput });

    if (midpointOutput === 0 || (secondGuessPoint - firstGuessPoint) / 2 < tolerance) {
      break;
    }

    let firstPointOutput = executableFunction.evaluate({ x: firstGuessPoint });
    
    currentIteration++;

    if (midpointOutput * firstPointOutput > 0) {
      firstGuessPoint = midpoint;
    } else {
      secondGuessPoint = midpoint;
    }

  }


  // result.push(firstIteration);
  return result;
}

const exampleBisectionInput = {
  userFunction: '3x^3-x-1',
  firstGuessPoint: -1,
  secondGuessPoint: 1,
  numberOfIterations: 20,
  tolerance: 0.0001
}

export default function testBisection() {
  console.log(rootFindBisection(exampleBisectionInput));
}
