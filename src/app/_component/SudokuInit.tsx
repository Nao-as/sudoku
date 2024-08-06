'use client'

import { generateSudoku, isValid } from '@/util/sudoke'
import {
  ActionIcon,
  Group,
  LoadingOverlay,
  UnstyledButton,
} from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { SudokuBoard } from './SudokuBoard'
import { GameOverModal } from './GameOverModal'
import { GameClearModal } from './GameClearModal'
import { GameStartModal } from './GameStartModal'
import { GameProgress } from './GameProgress'
import type { GameMode } from '@/types/game'
import { gameComplete } from '../_action'

export const SudokuInit = () => {
  const [isStart, setIsStart] = useState<boolean>(false)
  const [mode, setMode] = useState<GameMode>('easy')
  const [board, setBoard] = useState<number[][]>([])
  const [selectedCell, setSelectedCell] = useState<{
    row: number
    col: number
  } | null>(null)
  const [errorCells, setErrorCells] = useState<string[]>([]) // エラーセルの管理
  const [errorCount, setErrorCount] = useState<number>(0) // エラーカウント数を管理
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0) // ゲーム時間を秒単位で管理
  const [status, setStatus] = useState<null | 'CLEAR' | 'OUT'>(null) // ゲーム状態を管理
  const [disableNumberCounts, setDisableNumberCounts] = useState<
    Map<number, number>
  >(new Map()) // 数字の使用回数を管理
  const [visible, setVisible] = useState(false)

  // ここに数独のロジックを書く
  useEffect(() => {
    if (!isStart) return
    const generateBoard = generateSudoku(mode)
    setBoard(generateBoard)
    calculateNumberCounts(generateBoard)

    setSelectedCell(null)
    setErrorCells([])
    setIsTimerRunning(true)
  }, [isStart, mode])

  const calculateNumberCounts = (board: number[][]) => {
    const counts = new Map<number, number>()
    // biome-ignore lint/complexity/noForEach: <explanation>
    board.forEach(row => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      row.forEach(num => {
        if (num !== 0) counts.set(num, (counts.get(num) || 0) + 1)
      })
    })

    setDisableNumberCounts(counts)
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      timerId = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    } else if (!isTimerRunning && timeElapsed !== 0) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clearInterval(timerId!)
    }

    return () => {
      if (timerId) clearInterval(timerId)
    }
  }, [isTimerRunning, timeElapsed])

  const checkGameWin = useCallback(() => {
    if (board.length === 0) return false
    if (errorCells.length === 3) return false

    // すべてのセルが埋まっており、エラーがないことを確認
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0 || errorCells.includes(`${row}-${col}`)) {
          return false
        }
      }
    }
    return true
  }, [board, errorCells])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleGameComplete = async () => {
      setVisible(true)
      const ss = await gameComplete({
        time: timeElapsed,
        missCount: errorCount,
        mode: mode,
      })

      setVisible(false)

      if (ss) {
        setIsTimerRunning(false) // タイマーを停止
        if (errorCount !== 3) {
          setStatus('CLEAR')
        } else {
          setStatus('OUT')
        }
      }
    }

    if (checkGameWin() || errorCount === 3) handleGameComplete()
  }, [errorCount, checkGameWin])

  const handleNumberClick = (number: number) => {
    if (selectedCell) {
      const { row, col } = selectedCell
      if (board[row][col] === 0) {
        const newBoard = board.map((rowArr, rowIndex) =>
          rowArr.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? number : cell,
          ),
        )

        if (isValid(board, row, col, number)) {
          setBoard(newBoard)
          setErrorCells(prev => prev.filter(cell => cell !== `${row}-${col}`))
          setSelectedCell(null) // 選択解除
          calculateNumberCounts(newBoard)
        } else {
          setBoard(newBoard)
          setErrorCells(prev => [...prev, `${row}-${col}`])
          setErrorCount(prev => prev + 1) // エラーカウントを増加
          setSelectedCell({ row, col })
        }
      }
    }
  }

  const deleteNumberClick = () => {
    if (selectedCell) {
      const { row, col } = selectedCell
      if (board[row][col] !== 0) {
        const newBoard = board.map((rowArr, rowIndex) =>
          rowArr.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? 0 : cell,
          ),
        )
        setBoard(newBoard)
        // エラーセルの状態を更新して、削除されたセルをエラーリストから除外
        setErrorCells(prev => prev.filter(cell => cell !== `${row}-${col}`))
        // セルの選択を解除
        setSelectedCell(null)
      }
    }
  }

  return (
    <>
      {isStart === false ? (
        <GameStartModal setIsStart={() => setIsStart(true)} setMode={setMode} />
      ) : (
        <div style={{ position: 'relative' }}>
          {/* 進行状況 */}
          <GameProgress
            mode={mode}
            errorCells={errorCount}
            timeElapsed={timeElapsed}
          />
          {/* 盤面 */}
          <SudokuBoard
            board={board}
            selectedCell={selectedCell}
            errorCells={errorCells}
            setSelectedCell={setSelectedCell}
          />
          {/* 操作ボタン */}
          <Group mt={12} justify='center' gap={8}>
            {/* delete */}
            <ActionIcon
              variant='light'
              onClick={() => deleteNumberClick()}
              w={{ base: 30, md: 48 }}
              h={{ base: 30, md: 48 }}
            >
              <TbTrash color='gray' />
            </ActionIcon>
            {/* TODO:他のボタン機能の追加 */}
          </Group>
          <Group mt={12} justify='center' gap={6}>
            {Array.from({ length: 9 }, (_, i) => i + 1).map(number => (
              <UnstyledButton
                key={number}
                color='lime'
                onClick={() => handleNumberClick(number)}
                disabled={disableNumberCounts.get(number) === 9}
                w={{ base: 30, md: 48 }}
                h={{ base: 30, md: 48 }}
                fz={{ base: 'xs', md: 'lg' }}
                p={{ base: 'xs', md: 'sm' }}
                c={disableNumberCounts.get(number) === 9 ? 'gray' : 'lime'}
                fw='bold'
              >
                {number}
              </UnstyledButton>
            ))}
          </Group>
          {/* ゲームクリアモーダル */}
          <GameClearModal
            mode={mode}
            timeElapsed={timeElapsed}
            status={status === 'CLEAR'}
          />
          {/* ゲームオーバーモーダル */}
          <GameOverModal status={status === 'OUT'} />
          {/* データ送信中の表示 */}
          <LoadingOverlay
            visible={visible}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'green', type: 'bars' }}
          />
        </div>
      )}
    </>
  )
}
