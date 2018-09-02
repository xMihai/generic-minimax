const { minimax } = require('./index')

describe('generic-minimax', () => {
  test('', () => {
    const output = minimax({
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
    })([1, 3, 5, 0])

    // console.log(JSON.stringify(output, null, 2))

    const expected = {
      bestAction: {
        line: 2,
        tokens: 3,
      },
      evaluations: [
        {
          value: -1,
          action: {
            line: 0,
            tokens: 1,
          },
        },
        {
          value: -1,
          action: {
            line: 1,
            tokens: 1,
          },
        },
        {
          value: -1,
          action: {
            line: 1,
            tokens: 2,
          },
        },
        {
          value: -1,
          action: {
            line: 1,
            tokens: 3,
          },
        },
        {
          value: -1,
          action: {
            line: 2,
            tokens: 1,
          },
        },
        {
          value: -1,
          action: {
            line: 2,
            tokens: 2,
          },
        },
        {
          value: 1,
          action: {
            line: 2,
            tokens: 3,
          },
        },
        {
          value: -1,
          action: {
            line: 2,
            tokens: 4,
          },
        },
        {
          value: -1,
          action: {
            line: 2,
            tokens: 5,
          },
        },
      ],
    }

    expect(output).toEqual(expected)
  })
})
