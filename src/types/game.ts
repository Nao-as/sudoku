export type GameMode = 'easy' | 'normal' | 'hard'

export type GameScore = {
  id: number
  time: number
  miss_count: number
  mode: GameMode
  created_at: string
}

export type TotalScore = {
  mode: GameMode
  averageTime: number
  maxTime: number
  minTime: number
  gameCount: number
}

export type registerGameScore = {
  time: number
  missCount: number
  mode: GameMode
}

export type CalcrateScore = {
  gameCount: number
  averageTime: number
  maxTime: number
  minTime: number
}

export type GameScoress = {
  userId: number
} & registerGameScore
