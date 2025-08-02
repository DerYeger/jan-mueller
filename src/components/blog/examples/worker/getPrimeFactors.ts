export interface PrimeFactorsResult {
  factors: number[]
  time: number
}

export function getPrimeFactors(n: number): PrimeFactorsResult {
  const start = performance.now()
  const factors: number[] = []
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      factors.push(i)
      n /= i
    }
  }
  const uniqueFactors = [...new Set(factors)]
  const end = performance.now()
  return { factors: uniqueFactors, time: end - start }
}
