/* eslint-disable react/prop-types */
import type { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'

const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')!
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

const ThemeToggle: FunctionalComponent<{
  dark?: unknown
  light?: unknown
}> = ({ dark, light }) => {
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
      className="h-[48px] w-[48px] flex items-center justify-center"
      title="Toggle dark mode"
    >
      <>
        {theme === 'light' && light}
        {theme === 'dark' && dark}
      </>
    </button>
  )
}

export default ThemeToggle
