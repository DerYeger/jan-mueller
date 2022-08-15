import { useEffect, useState } from 'react'

const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')!
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light'
  }
  return 'dark'
}

export default function ThemeToggle({
  light,
  dark,
}: {
  dark?: unknown
  light?: unknown
}) {
  const [theme, setTheme] = useState(getInitialTheme())

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return <></>
  }

  const onClick = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={onClick}
      className="h-[62px] w-[62px] flex items-center justify-center"
      title="Toggle dark mode"
    >
      <>
        {theme === 'light' && light}
        {theme === 'dark' && dark}
      </>
    </button>
  )
}
