const IContext = {
  approximationMethod: ""
}

export const context = Object.create(IContext);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
// https://refactoring.guru/design-patterns/strategy

const strategy = {
  setStrategy: function (approximationMethod) {
    this.approximationMethod = approximationMethod;
  },

  calculate: function (equation, decimalPlace) {
    return this.approximationMethod.approximate(equation, decimalPlace);
  }
}

Object.setPrototypeOf(context, strategy);