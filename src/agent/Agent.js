const Intentions = require('./Intentions');

/**
 * JS-son agent generation function
 * @param {string} id unique identifier for the agent
 * @param {object} beliefs initial beliefs of the agents
 * @param {object} desires the agent's desires
 * @param {array} plans the agent's plans
 * @param {function} determinePreferences preference function
 * @returns {object} JS-son agent object
 */

function Agent (id, beliefs, desires, plans, determinePreferences) {
  this.id = id;
  this.beliefs = beliefs;
  this.desires = desires;
  this.plans = plans;
  this.preferenceFunction = determinePreferences;
  this.isActive = true;
  this.next = function (beliefs) {
    this.beliefs = {
      ...this.beliefs,
      ...beliefs
    };
    if (this.isActive) {
      if (Object.keys(desires).length === 0 && determinePreferences === undefined) {
        this.intentions = this.beliefs;
      } else {
        this.intentions = Intentions(this.beliefs, this.desires, this.preferenceFunction);
      }
      return this.plans.map(
        plan => { return plan.run(this.intentions); }
      ).filter(
        result => { return result !== null; }
      );
    }
  };
  this.stop = () => { return (this.isActive = false); };
  this.start = () => { return (this.isActive = true); };
}

module.exports = Agent;
