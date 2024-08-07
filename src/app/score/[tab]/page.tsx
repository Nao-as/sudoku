import {
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Text,
  Title,
} from '@mantine/core'
import ScoreBoard from './client'
import Link from 'next/link'
import { TbArrowBackUp, TbHome2, TbScoreboard } from 'react-icons/tb'
import { getTotalScores } from '@/util/supabase/score'
import type { GameMode } from '@/types/game'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const metadata: Metadata = {
  title: 'スコア',
  description: '数独アプリのスコアです',
}

export default async function ScorePage({
  params,
}: { params: { tab: GameMode } }) {
  const scoreList = await getTotalScores(params.tab)

  return (
    <Container size={'sm'} my={20}>
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
      <Paper p={'md'} shadow={'xs'}>
        <Group justify={'space-between'} mb={20}>
          <Title order={2}>スコア</Title>
          <Flex gap={8}>
            <Button component={Link} href='/' leftSection={<TbHome2 />}>
              トップに戻る
            </Button>
            <Button
              component={Link}
              href='/score'
              leftSection={<TbScoreboard />}
            >
              統計
            </Button>
          </Flex>
        </Group>

        <ScoreBoard mode={params.tab} scores={scoreList} />
      </Paper>
    </Container>
  )
}
