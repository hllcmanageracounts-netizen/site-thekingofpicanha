export type DayHours = { open: string; close: string } | null

export const weeklyHours: Record<number, DayHours> = {
  0: { open: '10:00', close: '23:00' },
  1: { open: '10:30', close: '23:00' },
  2: null,
  3: { open: '10:30', close: '23:00' },
  4: { open: '10:30', close: '23:00' },
  5: { open: '10:30', close: '23:30' },
  6: { open: '10:00', close: '23:30' },
}

export const formattedHours = [
  ['Sunday', '10:00 AM – 11:00 PM'],
  ['Monday', '10:30 AM – 11:00 PM'],
  ['Tuesday', 'Closed'],
  ['Wednesday', '10:30 AM – 11:00 PM'],
  ['Thursday', '10:30 AM – 11:00 PM'],
  ['Friday', '10:30 AM – 11:30 PM'],
  ['Saturday', '10:00 AM – 11:30 PM'],
]

function philadelphiaParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(date)
  const weekday = parts.find((part) => part.type === 'weekday')?.value
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday ?? '')
  return { dayIndex, hour: Number(parts.find((part) => part.type === 'hour')?.value ?? 0), minute: Number(parts.find((part) => part.type === 'minute')?.value ?? 0) }
}

export function getOpenStatus(date = new Date()) {
  const local = philadelphiaParts(date)
  const hours = weeklyHours[local.dayIndex]
  if (!hours) return false
  const current = local.hour * 60 + local.minute
  const [openHour, openMinute] = hours.open.split(':').map(Number)
  const [closeHour, closeMinute] = hours.close.split(':').map(Number)
  return current >= openHour * 60 + openMinute && current < closeHour * 60 + closeMinute
}

export function getTodayHours(date = new Date()) {
  return weeklyHours[philadelphiaParts(date).dayIndex]
}
