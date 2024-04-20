const models = {
  'gpt-4-turbo': { input: 10.00, output: 30.00, name: 'gpt-4-turbo' },
  'gpt-4': { input: 30.00, output: 60.00, name: 'gpt-4' },
  'gpt-3.5-turbo': { input: 0.5, output: 1.5, name: 'gpt-3.5-turbo' },
};

function calculateCost(model, inputTokens, completionTokens) {
    const inputPrice = models[model].input / 1000000;
    const outputPrice = models[model].output / 1000000;
  
    const inputCost = inputTokens * inputPrice;
    const outputCost = completionTokens * outputPrice;
  
    return (inputCost + outputCost).toFixed(6);
  }
  

module.exports = {
    models,
    calculateCost
  }