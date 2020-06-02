module.exports = args => ({
  to(...steps) {
    return steps.reduce((result, nextStep) => nextStep(result), args);
  },
  toAsync(...steps) {
    return steps.reduce(
      (result, nextStep) => result.then(nextStep),
      global.Promise.resolve(args)
    );
  }
});
