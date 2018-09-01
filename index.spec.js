const { minimax } = require('./index')

describe('generic-minimax', () => {
  test('', () => {
    console.log(
      JSON.stringify(
        minimax({
          actions: state =>
            state.reduce(
              (result, tokens, line) =>
                tokens > 0
                  ? [
                      ...result,
                      ...new Array(tokens)
                        .fill('1')
                        .map((_, i) => ({ line, tokens: i + 1 })),
                    ]
                  : result,
              []
            ),
          play: (state, action) =>
            state.map(
              (tokens, line) =>
                line === action.line ? tokens - action.tokens : tokens
            ),
          score: state => (state.every(tokens => tokens === 0) ? 1 : 0),
        })([1, 3, 5, 0]),
        null,
        2
      )
    )
  })
})
