const maximizeArgs = [
  (result, item) => (item.value > result.value ? item : result),
  { value: Number.NEGATIVE_INFINITY },
]

const minimizeArgs = [
  (result, item) => (item.value < result.value ? item : result),
  { value: Number.POSITIVE_INFINITY },
]

const minimax = config => initialState => {
  const evaluateActions = (state = initialState, maximize = true) =>
    config.actions(state).map(action => ({
      value: value(config.play(state, action), !maximize),
      action,
    }))

  const value = (nextState = initialState, maximize = true) => {
    const evaluations = evaluateActions(nextState, maximize)
    return evaluations.length === 0
      ? maximize
        ? config.score(nextState)
        : -config.score(nextState)
      : evaluations.reduce(...(maximize ? maximizeArgs : minimizeArgs)).value
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
