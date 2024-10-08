'use client'

import { createEmptyBoard, generateSudoku, validateInput } from '@/util/sudoke'
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Text,
  Title,
} from '@mantine/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TbTrash } from 'react-icons/tb'
import { GameOverModal } from './GameOverModal'
import { GameClearModal } from './GameClearModal'
import { GameStartModal } from './GameStartModal'
import { GameProgress } from './GameProgress'
import { SudokuBoard } from './SudokuBoard'
import { gameComplete } from '../_action'
import type { GameMode } from '@/types/game'
import useTimer from '@/hooks/useTimer'

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
  const [status, setStatus] = useState<null | 'CLEAR' | 'OUT'>(null) // ゲーム状態を管理
  const [disableNumberCounts, setDisableNumberCounts] = useState<
    Map<number, number>
  >(new Map()) // 数字の使用回数を管理
  const [visible, setVisible] = useState(false)
  const timeElapsed = useTimer(isTimerRunning)
  const solutionBoard = useRef<number[][]>(createEmptyBoard())

  useEffect(() => {
    if (!isStart) return
    // ゲーム開始後
    const [generateBoard, solutionBoardd] = generateSudoku(mode)
    setBoard(generateBoard)
    solutionBoard.current = solutionBoardd
    calculateNumberCounts(generateBoard)
    setIsTimerRunning(true)
  }, [isStart, mode])

  const calculateNumberCounts = (board: number[][]) => {
    const counts = new Map<number, number>()
    for (const row of board) {
      for (const num of row) {
        if (num !== 0) counts.set(num, (counts.get(num) || 0) + 1)
      }
    }

    setDisableNumberCounts(counts)
  }

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

        if (validateInput(solutionBoard.current, row, col, number)) {
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
        setBoard(newBoard) // ボードの更新
        // エラーセルの状態を更新して、削除されたセルをエラーリストから除外
        setErrorCells(prev => prev.filter(cell => cell !== `${row}-${col}`))
        setSelectedCell(null) // セルの選択を解除
      }
    }
  }

  return (
    <>
      {isStart === false ? (
        <GameStartModal setIsStart={() => setIsStart(true)} setMode={setMode} />
      ) : (
        <div style={{ position: 'relative' }}>
          <Title ta='center' my={8}>
            <Text
              size='3xl'
              fw={900}
              variant='gradient'
              gradient={{ from: 'blue', to: 'green', deg: 90 }}
            >
              NaoDoku.com
            </Text>
          </Title>
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
            {/* 削除 */}
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
              <Button
                key={number}
                variant='light'
                onClick={() => handleNumberClick(number)}
                disabled={disableNumberCounts.get(number) === 9}
                w={{ base: 30, md: 48 }}
                h={{ base: 30, md: 48 }}
                fz={{ base: 'xs', md: 'lg' }}
                p={{ base: 'xs', md: 'sm' }}
                c={disableNumberCounts.get(number) === 9 ? 'gray' : 'blue'}
                fw='bold'
              >
                {number}
              </Button>
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
