const maximizeArgs = [
  (result, item) => (item.value > result.value ? item : result),
  { value: Number.NEGATIVE_INFINITY },
]

const minimizeArgs = [
  (result, item) => (item.value < result.value ? item : result),
  { value: Number.POSITIVE_INFINITY },
]

const minimax = config => initialState => {
  const evaluateActions = (state = initialState, depth = 1) =>
    config.actions(state).map(action => ({
      value: value(config.nextState(state, action), depth + 1),
      action,
    }))

  const value = (nextState = initialState, depth = 1) => {
    const evaluations = evaluateActions(nextState, depth)
    return evaluations.length === 0
      ? config.score(nextState, Boolean(depth % 2))
      : evaluations.reduce(...(depth % 2 ? maximizeArgs : minimizeArgs)).value
  }

  const bestAction = evaluations => {
    const bestEvaluations = evaluations.reduce(
      (best, evaluation) => {
        if (evaluation.value > best[0].value) return [evaluation]
        if (evaluation.value === best[0].value) return [...best, evaluation]
        return best
      },
      [
        {
          value: Number.NEGATIVE_INFINITY,
        },
      ]
    )
    return bestEvaluations[Math.floor(Math.random() * bestEvaluations.length)]
  }

  const evaluations = evaluateActions()

  return { bestAction: bestAction(evaluations).action, evaluations }
}

module.exports = { minimax }
