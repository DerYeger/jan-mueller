const birthday = new Date('1998-06-03').getTime()

const age = Math.abs(new Date(Date.now() - birthday).getFullYear() - 1970)

export function useAge(): number {
  return age
}
