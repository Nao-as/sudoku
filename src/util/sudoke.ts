import type { GameMode } from '@/types/game'

/**
 * 空の9x9数独盤を作成します。
 * @returns {number[][]} ゼロで埋められた9x9の配列。
 */
const createEmptyBoard = (): number[][] => {
  return Array.from({ length: 9 }, () => Array(9).fill(0))
}

/**
 * バックトラッキングを使用して数独盤を完全に埋めます。
 * @param {number[][]} board - 埋めるための数独盤。
 * @returns {boolean} 盤が成功裏に埋められた場合はtrue、それ以外はfalse。
 */
const fillBoard = (board: number[][]): boolean => {
  return solveSudoku(board)
}

/**
 * 与えられた数独盤をバックトラッキングを使用して解きます。
 * @param {number[][]} board - 解くための数独盤。
 * @returns {boolean} 盤が解けた場合はtrue、それ以外はfalse。
 */
const solveSudoku = (board: number[][]): boolean => {
  const emptyCell = findEmptyCell(board)
  if (!emptyCell) return true
  const [row, col] = emptyCell

  // 1から9までの数字をランダムにシャッフル
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])

  for (const num of numbers) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num
      if (solveSudoku(board)) return true
      board[row][col] = 0
    }
  }
  return false
}

/**
 * 配列をランダムにシャッフルします。
 * @param {number[]} array - シャッフルする配列。
 * @returns {number[]} シャッフルされた配列。
 */
const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * 数独盤内の空のセルを探します。
 * @param {number[][]} board - 検索する数独盤。
 * @returns {[number, number] | null} 空のセルの座標、または見つからなければnull。
 */
const findEmptyCell = (board: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return [row, col]
    }
  }
  return null
}

/**
 * 指定されたセルに数字を配置するのが有効かどうかを確認します。
 * @param {number[][]} board - 数独盤。
 * @param {number} row - セルの行インデックス。
 * @param {number} col - セルの列インデックス。
 * @param {number} num - セルに配置する数字。
 * @returns {boolean} 数字を配置できる場合はtrue、それ以外はfalse。
 */
const isValid = (
  board: number[][],
  row: number,
  col: number,
  num: number,
): boolean => {
  // 行のチェック
  if (board[row].includes(num)) return false
  // 列のチェック
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false
  }

  // 3x3ブロックのチェック
  const boxRowStart = Math.floor(row / 3) * 3
  const boxColStart = Math.floor(col / 3) * 3
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (board[r][c] === num) return false
    }
  }
  return true
}

/**
 * ランダムにセルを削除して数独パズルを作成します。
 * @param {number[][]} board - 完全に埋まった数独盤。
 * @param {number} attempts - 削除するセルの数。
 */
const removeCells = (board: number[][], attempts: number): void => {
  const maxAttempts = attempts * 2 // 最大試行回数を設定
  let removedCells = 0
  let tries = 0

  while (removedCells < attempts && tries < maxAttempts) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (board[row][col] !== 0) {
      const backup = board[row][col]
      board[row][col] = 0

      const copy = board.map(row => [...row])
      if (hasUniqueSolution(copy)) {
        removedCells++
      } else {
        board[row][col] = backup
      }
    }
    tries++
  }
}

/**
 * 数独盤が一意の解を持つかどうかを確認します。
 * @param {number[][]} board - チェックする数独盤。
 * @returns {boolean} 一意の解がある場合はtrue、それ以外はfalse。
 */
const hasUniqueSolution = (board: number[][]): boolean => {
  const solutions = solveSudokuWithCount(board, 0)
  return solutions === 1
}

/**
 * 数独盤の解の数をカウントします。
 * @param {number[][]} board - 解くための数独盤。
 * @param {number} count - 現在の解の数。
 * @returns {number} 見つかった解の総数。
 */
const solveSudokuWithCount = (board: number[][], count: number): number => {
  const emptyCell = findEmptyCell(board)
  let newCount = count
  if (!emptyCell) return newCount + 1
  const [row, col] = emptyCell

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num
      newCount = solveSudokuWithCount(board, newCount)
      if (newCount > 1) return newCount // 解が2つ以上見つかったら即座に返す
      board[row][col] = 0
    }
  }
  return newCount
}

/**
 * 新しい数独パズルを生成します。
 * @returns {number[][]} 一部のセルが空の生成された数独盤。
 */
const generateSudoku = (mode: GameMode): number[][] => {
  const board = createEmptyBoard()
  fillBoard(board)

  let attempts: number
  if (mode === 'easy') {
    attempts = 45
  } else if (mode === 'normal') {
    attempts = 65
  } else {
    attempts = 75
  }

  removeCells(board, attempts)
  return board
}

export { isValid, generateSudoku }
