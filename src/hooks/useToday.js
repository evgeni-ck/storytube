import { useEffect, useState } from 'react'
import { startOfDay } from '../lib/dates.js'

/**
 * Today at local midnight, refreshed when the clock crosses midnight so a tab
 * left open overnight does not keep saying "Днес" about yesterday.
 */
export function useToday() {
  const [today, setToday] = useState(() => startOfDay(new Date()))

  useEffect(() => {
    const now = new Date()
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    // +1s so we are safely past midnight when the timer fires.
    const id = setTimeout(() => setToday(startOfDay(new Date())), midnight - now + 1000)
    return () => clearTimeout(id)
  }, [today])

  return today
}
