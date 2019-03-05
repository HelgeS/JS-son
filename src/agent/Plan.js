/**
 * JS-son plan generator
 * @param {function } head Determines if plan is active
 * @param {function} body Determines what actions to execute
 * @returns {object} JS-plan
 */

const Plan = (head, body) => {
  return {
    head,
    body,
    // run: executed body if head is true; else: return null
    run: beliefs => { return head(beliefs) === true ? body() : null; }
  };
};

module.exports = Plan;
