'use server'

import type { registerGameScore } from '@/types/game'
import {
  createScore,
  createTotalScore,
  getCalcrateScore,
} from '@/util/supabase/score'

/** ゲームクリア,ゲームオーバー時に実行 */
export const gameComplete = async (
  data: registerGameScore,
): Promise<'ok' | 'error'> => {
  // userIdは仮で1を設定
  const userId = 1

  // まずゲーム結果を登録
  const cs = await createScore({ ...data, userId })

  if (!cs) return 'error'

  // 対象難易度を集計
  const averageScore = await getCalcrateScore(data.mode, userId)

  if (!averageScore) return 'error'

  // 統計スコアを登録
  const totalScore = await createTotalScore({
    userId: userId,
    mode: data.mode,
    scores: averageScore,
  })

  if (!totalScore) return 'error'

  return 'ok'
}
