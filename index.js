// Reducer arguments for choosing best evaluation for maximizing player
const maximizeArgs = [
  (result, item) => (item.value > result.value ? item : result),
  { value: Number.NEGATIVE_INFINITY },
]

// Reducer arguments for choosing best evaluation for minimizing player
const minimizeArgs = [
  (result, item) => (item.value < result.value ? item : result),
  { value: Number.POSITIVE_INFINITY },
]

const minimax = config => initialState => {
  // Get possible actions for this game state and get their values
  const evaluateActions = (state = initialState, depth = 1) =>
    config.actions(state).map(action => ({
      action,
      value: value(config.nextState(state, action), depth + 1),
    }))

  // Calculate the value of a game state
  const value = (state = initialState, depth = 1) => {
    // Get possible actions and their values
    const evaluations = evaluateActions(state, depth)

    return evaluations.length === 0
      ? // If there are no actions/evaluations, this is a end-game state. Get score.
        config.score(state, Boolean(depth % 2))
      : // otherwise get best action value
        evaluations.reduce(...(depth % 2 ? maximizeArgs : minimizeArgs)).value
  }

  // Best action for maximizing player
  const bestAction = evaluations => {
    // Aggregate a list of evaluations having the greatest value
    const bestEvaluations = evaluations.reduce(
      (best, evaluation) => {
        // This evaluation is better than the best, reset list
        if (evaluation.value > best[0].value) return [evaluation]

        // This evaluation is the same as the best, add to list
        if (evaluation.value === best[0].value) return [...best, evaluation]

        // This evaluation is worse than the best, return existing list
        return best
      },
      [
        {
          value: Number.NEGATIVE_INFINITY,
        },
      ]
    )

    // Out of the best evaluations, choose one at random to create diversity
    return bestEvaluations.length > 1
      ? bestEvaluations[Math.floor(Math.random() * bestEvaluations.length)]
      : bestEvaluations[0]
  }

  const evaluations = evaluateActions()

  return { bestAction: bestAction(evaluations).action, evaluations }
}

module.exports = { minimax }
