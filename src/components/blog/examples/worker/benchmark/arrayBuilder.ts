export function buildArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i)
}
