import { useEffect, useRef, useState } from 'react'

/**
 * タイマーのカスタムフック
 *
 * @param isRunning
 * @returns
 */
const useTimer = (isRunning: boolean) => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const timerIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    } else if (!isRunning && timerIdRef.current !== null) {
      clearInterval(timerIdRef.current)
      timerIdRef.current = null
    }

    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current)
    }
  }, [isRunning])

  return timeElapsed
}

export default useTimer
