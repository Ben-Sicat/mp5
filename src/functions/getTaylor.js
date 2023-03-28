import * as math from 'mathjs';

export default function getTaylor(degree) {
  let taylorEquation = `x`;
  for (let i = 2; i <= degree; i++) {
    const constant = math.pow(-1, i + 1);
    let temp;
    temp = `+${constant}/${i}x^${i}`;
    if (i % 2 == 0) {
      temp = `${constant}/${i}x^${i}`
    }
    taylorEquation += temp;
  }
  taylorEquation = math.parse(taylorEquation);
  return taylorEquation.toTex();
}