'use client'

import { Flex, Paper, Table } from '@mantine/core'
import { useState } from 'react'
import styles from './Sudoku.module.css'
import { clsx } from 'clsx'

type Props = {
  board: number[][]
  errorCells: string[]
  selectedCell: { row: number; col: number } | null
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ row: number; col: number } | null>
  >
}

/**
 * 数独のボードを表示するコンポーネント
 *
 * @component
 * @param {number[][]} board - 数独のボード
 * @param {string[]} errorCells - エラーセルの配列
 * @param {React.Dispatch<React.SetStateAction<{ row: number; col: number } | null>} setSelectedCell - 選択されたセルを設定する関数
 * @param {{ row: number; col: number } | null} selectedCell - 選択されたセル
 *
 * @returns
 */
export const SudokuBoard = ({
  board,
  errorCells,
  setSelectedCell,
  selectedCell,
}: Props) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  // 空のセルのみ選択可能
  const handleCellClick = (row: number, col: number, cell: number | null) => {
    setSelectedCell({ row, col })
    setSelectedNumber(cell)
  }

  const getCellClassName = (
    cell: number | null, // 数字またはnull
    rowIndex: number,
    colIndex: number,
  ) => {
    const isSelected =
      selectedCell &&
      selectedCell.row === rowIndex &&
      selectedCell.col === colIndex
    const isSameNumber = selectedNumber && cell && selectedNumber === cell
    const isInSameRowOrCol =
      selectedCell &&
      (selectedCell.row === rowIndex || selectedCell.col === colIndex)
    const isInAdjacentRow =
      selectedCell &&
      (selectedCell.row - 1 === rowIndex ||
        selectedCell.row + 1 === rowIndex) &&
      selectedCell.col === colIndex

    return clsx(styles.cell, {
      [styles.selected]: isSelected,
      [styles.sameNumber]: isSameNumber && !isSelected, // isSelectedが優先されるため、選択されたセルには適用しない
      [styles.sameRowCol]: isInSameRowOrCol && !isSelected, // isSelectedが優先されるため、選択されたセルには適用しない
      [styles.adjacentRow]: isInAdjacentRow && !isSelected, // isSelectedが優先されるため、選択されたセルには適用しない
      [styles.errorCell]: errorCells.includes(`${rowIndex}-${colIndex}`),
      [styles.thickLeft]: colIndex % 3 === 0,
      [styles.thickTop]: rowIndex % 3 === 0,
      [styles.thickRight]: colIndex === 8,
      [styles.thickBottom]: rowIndex === 8,
    })
  }

  return (
    <Paper
      p={12}
      mt={8}
      style={{ boxShadow: '0 0 4px #7e7e7e', borderRadius: 4 }}
    >
      <Flex justify={'center'}>
        <Table tabIndex={0}>
          <Table.Tbody>
            {board.map((row, rowIndex) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Table.Tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  return (
                    <Table.Td
                      p={2}
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={colIndex}
                      className={getCellClassName(cell, rowIndex, colIndex)}
                      onClick={() => handleCellClick(rowIndex, colIndex, cell)}
                    >
                      {cell !== 0 ? cell : ''}
                    </Table.Td>
                  )
                })}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Flex>
    </Paper>
  )
}
