import { useState, useEffect } from 'react'
import { useOutlet, useLocation, UNSAFE_LocationContext as LocationContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function RootLayout() {
  const [theme, setTheme] = useState(localStorage.theme || 'system')

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  
  const systemThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
      <title>Contrast</title>
      <path d="M256 32A224 224 0 0097.61 414.39 224 224 0 10414.39 97.61 222.53 222.53 0 00256 32zM64 256c0-105.87 86.13-192 192-192v384c-105.87 0-192-86.13-192-192z"/>
    </svg>
  )

  const lightThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
      <title>Sunny</title>
      <path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"/>
    </svg>
  )

  const darkThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
      <title>Moon</title>
      <path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"/>
    </svg>
  )
  
  const options = [
    { value: 'system', component: systemThemeIcon },
    { value: 'light', component: lightThemeIcon },
    { value: 'dark', component: darkThemeIcon }
  ]

  const [optionIndex, setOptionIndex] = useState(options.findIndex((option) => option.value === theme))
  
  const switchTheme = () => {
    const newOptionIndex = (optionIndex + 1) % options.length
    setOptionIndex(newOptionIndex)
    setTheme(options[newOptionIndex].value)
    localStorage.theme = options[newOptionIndex].value
  }
  
  const location = useLocation()
  
  return (
    <div className="dark:bg-[#0d1117] dark:text-white font-['Manrope'] min-h-screen overflow-x-hidden">
      <header className="flex justify-between items-center px-6 sm:px-12 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-semibold">RegOp</h1>
        <button onClick={switchTheme}>{options[optionIndex].component}</button>
      </header>
      <AnimatePresence initial={false} mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'tween' }}>
          <LocationContext.Provider value={{ location: location }}>{useOutlet()}</LocationContext.Provider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default RootLayout;
