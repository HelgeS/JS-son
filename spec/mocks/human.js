const Belief = require('../../src/agent/Belief');
const Desire = require('../../src/agent/Desire');
const Plan = require('../../src/agent/Plan');

const beliefs = {
  ...Belief('dogNice', true),
  ...Belief('dogHungry', false)
};

const desires = {
  ...Desire('praiseDog', beliefs => { return beliefs.dogNice; }),
  ...Desire('feedDog', beliefs => { return beliefs.dogNice && beliefs.dogHungry; })
};

const preferenceFunctionGen = (beliefs, desires) => {
  return desireKey => {
    if (!desires[desireKey](beliefs)) {
      return false;
    } else if (desireKey === 'feedDog' || !desires['feedDog'](beliefs)) {
      return true;
    } else {
      return false;
    }
  };
};

const plans = [
  Plan(intentions => { return intentions.praiseDog; }, () => {
    return {
      actions: ['Good dog!']
    };
  }),
  Plan(intentions => { return intentions.feedDog; }, () => {
    return {
      actions: ['Here, take some food!']
    };
  })
];

module.exports = {
  beliefs,
  desires,
  preferenceFunctionGen,
  plans
};
