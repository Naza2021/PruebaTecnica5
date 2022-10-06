import { msToTime } from '@Utils/index'
import { useEffect, useRef, useState } from 'react'

export const useTime = (startDate, endDate, updateTime = 1000, timeoutFunc) => {
  const intervalRef = useRef()

  const calculateTime = () => {
    const createTime = new Date(startDate).getTime()
    const endTime = new Date(endDate).getTime()
    const maxTimeout = endTime - createTime
    const TimeDif = new Date().getTime() - createTime
    const Timeout = maxTimeout - TimeDif
    if (Timeout <= 0) {
      clearInterval(intervalRef.current)
      timeoutFunc()
    }
    return msToTime(Timeout, 'MM:SS')
  }

  const [time, setTime] = useState((prev) => calculateTime())

  useEffect(() => {
    setTime((prev) => calculateTime())

    intervalRef.current = setInterval(() => {
      setTime((prev) => calculateTime())
    }, updateTime)

    return () => intervalRef.current && clearInterval(intervalRef.current)
  }, [startDate, endDate])

  return { time }
}
