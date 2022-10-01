export const timeString = (time: number): string => {
  time = Math.round(time)
  return `${Math.floor(time / 60)}: ${time % 60}`
}
