'use client'

import type { GameMode } from '@/types/game'
import { formatTime } from '@/util/util'
import { Flex, Group, rem, Text } from '@mantine/core'
import { TbClock } from 'react-icons/tb'

/**
 * ゲームの進行状況を表示するコンポーネント
 *
 * @component
 * @param {boolean} setIsStart - ゲームを開始する
 * @returns
 */
export const GameProgress = ({
  mode,
  errorCells,
  timeElapsed,
}: {
  mode: GameMode
  errorCells: number
  timeElapsed: number
}) => {
  return (
    <Group
      p={8}
      justify='space-between'
      my={8}
      style={{ boxShadow: '0 0 4px #7e7e7e', borderRadius: 4 }}
    >
      <Text>
        難易度：
        {mode === 'easy'
          ? 'かんたん'
          : mode === 'normal'
            ? 'ふつう'
            : 'むずかしい'}
      </Text>
      <Group gap={24}>
        <Text>間違い: {errorCells}/3</Text>
        <Flex align={'center'} gap={4}>
          <TbClock style={{ width: rem(18), height: rem(18) }} />
          {formatTime(timeElapsed)}秒
        </Flex>
      </Group>
    </Group>
  )
}
