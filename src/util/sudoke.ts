/**
 * 空の9x9数独盤を作成します。
 * @returns {number[][]} ゼロで埋められた9x9の配列。
 */
const createEmptyBoard = (): number[][] => {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
};

/**
* バックトラッキングを使用して数独盤を完全に埋めます。
* @param {number[][]} board - 埋めるための数独盤。
* @returns {boolean} 盤が成功裏に埋められた場合はtrue、それ以外はfalse。
*/
const fillBoard = (board: number[][]): boolean => {
  return solveSudoku(board);
};

/**
* 与えられた数独盤をバックトラッキングを使用して解きます。
* @param {number[][]} board - 解くための数独盤。
* @returns {boolean} 盤が解けた場合はtrue、それ以外はfalse。
*/
const solveSudoku = (board: number[][]): boolean => {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) return true;
  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
};

/**
* 数独盤内の空のセルを探します。
* @param {number[][]} board - 検索する数独盤。
* @returns {[number, number] | null} 空のセルの座標、または見つからなければnull。
*/
const findEmptyCell = (board: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return [row, col];
    }
  }
  return null;
};

/**
* 指定されたセルに数字を配置するのが有効かどうかを確認します。
* @param {number[][]} board - 数独盤。
* @param {number} row - セルの行インデックス。
* @param {number} col - セルの列インデックス。
* @param {number} num - セルに配置する数字。
* @returns {boolean} 数字を配置できる場合はtrue、それ以外はfalse。
*/
const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  // 行のチェック
  if (board[row].includes(num)) return false;
  // 列のチェック
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // 3x3ブロックのチェック
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
};

/**
* ランダムにセルを削除して数独パズルを作成します。
* @param {number[][]} board - 完全に埋まった数独盤。
*/
const removeCells = (board: number[][]): void => {
  let attempts = 5; // 難易度に応じて調整可能
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      const backup = board[row][col];
      board[row][col] = 0;

      const copy = board.map(row => [...row]);
      if (!hasUniqueSolution(copy)) {
        board[row][col] = backup;
        attempts--;
      }
    }
  }
};

/**
* 数独盤が一意の解を持つかどうかを確認します。
* @param {number[][]} board - チェックする数独盤。
* @returns {boolean} 一意の解がある場合はtrue、それ以外はfalse。
*/
const hasUniqueSolution = (board: number[][]): boolean => {
  return solveSudokuWithCount(board, 0) === 1;
};

/**
* 数独盤の解の数をカウントします。
* @param {number[][]} board - 解くための数独盤。
* @param {number} count - 現在の解の数。
* @returns {number} 見つかった解の総数。
*/
const solveSudokuWithCount = (board: number[][], count: number): number => {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) return count + 1;
  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      count = solveSudokuWithCount(board, count);
      board[row][col] = 0;
    }
  }
  return count;
};

/**
* 新しい数独パズルを生成します。
* @returns {number[][]} 一部のセルが空の生成された数独盤。
*/
const generateSudoku = (): number[][] => {
  const board = createEmptyBoard();
  fillBoard(board);
  removeCells(board);
  return board;
};


export { createEmptyBoard, fillBoard, isValid, removeCells, solveSudoku, solveSudokuWithCount, generateSudoku };