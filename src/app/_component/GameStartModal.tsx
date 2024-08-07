'use client'

import type { GameMode } from '@/types/game'
import {
  Button,
  Divider,
  Flex,
  Modal,
  Radio,
  RadioGroup,
  Text,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'

/**
 * ゲーム開始時に表示するモーダル
 *
 * @component
 * @param {boolean} setIsStart - ゲームを開始する
 * @returns
 */
export const GameStartModal = ({
  setIsStart,
  setMode,
}: {
  setIsStart: () => void
  setMode: (mode: GameMode) => void
}) => {
  const [value, setValue] = useState('easy')

  const handleStart = () => {
    setIsStart()
    setMode(value as GameMode)
  }

  return (
    <Modal.Root opened={true} onClose={() => {}}>
      <Modal.Overlay />
      <Modal.Content
        p={{
          base: 12,
          md: 24,
        }}
      >
        <Modal.Body>
          <Title ta='center'>
            <Text
              size='3xl'
              fw={900}
              variant='gradient'
              gradient={{ from: 'blue', to: 'green', deg: 90 }}
            >
              NaoDoku.com
            </Text>
          </Title>
          <Text my={16}>
            1から9までの数字を使って、
            <br />
            各行、各列、各3×3のブロックに、
            <br />
            それぞれ1から9までの数字を1回ずつだけ入れて、
            <br className='sp-br' />
            すべてのマスを埋めるパズル、つまり数独です。
          </Text>
          <RadioGroup
            value={value}
            onChange={setValue}
            label='難易度を選んでゲームを開始しましょう'
            my={24}
          >
            <Flex
              gap={8}
              my={8}
              direction={{
                base: 'column',
                md: 'row',
              }}
            >
              <Radio label='かんたん' value='easy' />
              <Radio label='ふつう' value='normal' />
              <Radio label='むずかしい' value='hard' />
            </Flex>
          </RadioGroup>

          <Button
            onClick={handleStart}
            w='100%'
            variant='gradient'
            gradient={{ from: 'blue', to: 'cyan', deg: 160 }}
          >
            ゲームスタート
          </Button>
          <Divider my={24} />
          <Button
            variant='gradient'
            gradient={{ from: 'blue', to: 'indigo', deg: 90 }}
            component={Link}
            href='/score'
            w='100%'
          >
            スコアはこっち
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
