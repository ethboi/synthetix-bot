export function convertToBoolean(input: string): boolean | undefined {
  try {
    return JSON.parse(input.toLowerCase())
  } catch (e) {
    return undefined
  }
}

export function shortAddress(value: string): string {
  return `${value.slice(0, 5)}...${value.slice(-4)}`
}

export function firstAddress(value: string): string {
  return `${value.slice(0, 5)}`
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)

export function calculatePercentageChange(oldValue: number, newValue: number): number {
  const change = newValue - oldValue
  const percentageChange = (change / oldValue) * 100
  return percentageChange
}
