'use client'

import type { GameMode } from '@/types/game'
import { clearMessages } from '@/util/message'
import { formatTime } from '@/util/util'
import { Button, Modal, Stack, Text } from '@mantine/core'

/**
 * ゲームクリア時に表示するモーダル
 *
 * @component
 * @param {boolean} isStart - ゲームが開始しているかどうか
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsStart - ゲームの開始状態を更新する関数
 * @param {boolean} open - モーダルを開くかどうか
 * @returns
 */
export const GameClearModal = ({
  mode,
  timeElapsed,
  status,
}: {
  mode: GameMode
  timeElapsed: number
  status: boolean
}) => {
  const gameClear = () => window.location.reload()

  const message =
    clearMessages[mode][Math.floor(Math.random() * clearMessages[mode].length)]

  return (
    <Modal
      centered
      opened={status}
      onClose={() => {}}
      withCloseButton={false}
      closeOnClickOutside={false}
    >
      <Stack>
        <Text mb={8}>
          {mode === 'easy'
            ? 'かんたん'
            : mode === 'normal'
              ? 'ふつう'
              : 'むずかしい'}
          クリアおめでとう~!(^○^)
        </Text>
        <Text mb={8}>{message}</Text>
        <Text mb={8}>クリアまでの時間は {formatTime(timeElapsed)} です</Text>

        <Button onClick={gameClear}>最初に戻る</Button>
      </Stack>
    </Modal>
  )
}
