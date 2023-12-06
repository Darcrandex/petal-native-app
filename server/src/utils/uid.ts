export function uid(len: number = 16): string {
  const l = Math.min(64, Math.max(4, len))
  let res = ''
  while (res.length < l) {
    res += Math.random().toString(36).slice(2)
  }

  return res.slice(0, l)
}
