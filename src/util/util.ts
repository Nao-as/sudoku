export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${String(minutes).padStart(2)}:${String(sec).padStart(2, '0')}`
}

import dayjs from 'dayjs'

export const formatDateTime = (date: string) =>
  dayjs(date).format('YYYY/MM/DD HH:mm:ss')
