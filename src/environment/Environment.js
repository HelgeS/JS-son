/**
 * JS-son environment generator
 * @param {array} agents JS-son agents to run
 * @param {object} state Initial environment state
 * @param {function} update Update function, in particular for processing agent actions
 * @param {function} render Visualization function of the environment's current state
 * @param {function} stateFilter Function for filtering state that agents should receive
 * @returns {object} JS-son environment object
*/
function Environment (
  agents,
  state,
  update,
  render = state => { return console.log(state); },
  stateFilter = state => { return state; }
) {
  this.agents = {};
  agents.forEach(agent => { return (this.agents[agent.id] = agent); });
  this.state = state;
  this.update = update;
  this.render = render;
  this.stateFilter = stateFilter;
  this.history = [];
  this.reset = () => { return (this.history = []); };
  this.run = iterations => {
    this.history.push(this.state);
    const run = () => {
      Object.keys(this.agents).forEach(agentKey => {
        const proposedUpdate = this.agents[agentKey].next(
          this.stateFilter(this.state, agentKey, this.agents[agentKey].beliefs)
        );
        const stateUpdate = this.update(proposedUpdate, agentKey, this.state);
        this.state = {
          ...this.state,
          ...stateUpdate
        };
      });
      this.history.push(this.state);
      this.render(this.state);
    };
    if (iterations) {
      Array(iterations).fill(0).forEach(run);
    } else {
      while (true) run();
    }
    return this.history;
  };
}

module.exports = Environment;
