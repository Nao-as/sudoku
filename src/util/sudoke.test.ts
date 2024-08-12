import { generateSudoku } from './sudoke'

const testCases = [
  { mode: 'easy', count: 25 },
  { mode: 'normal', count: 65 },
  { mode: 'hard', count: 75 },
]

testCases.forEach(({ mode, count }) => {
  test(`数独生成:${mode}`, () => {
    const [board] = generateSudoku(mode as 'easy' | 'normal' | 'hard')
    // 9x9の盤が生成されていること
    expect(board.length).toBe(9)
  })
})
