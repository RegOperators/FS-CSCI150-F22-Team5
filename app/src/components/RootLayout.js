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
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx={12} cy={12} r={9}></circle>
      <path d="M12 3v18"></path>
      <path d="M12 14l7 -7"></path>
      <path d="M12 19l8.5 -8.5"></path>
      <path d="M12 9l4.5 -4.5"></path>
    </svg>
  )

  const lightThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx={12} cy={12} r={4}></circle>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </svg>
  )

  const darkThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
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
    <div className="dark:bg-[#0d1117] dark:text-white font-['Manrope'] overflow-x-clip">
      <header className="flex justify-between items-center px-6 sm:px-12 py-6 sm:py-8 absolute w-full">
        <h1 className="text-xl sm:text-2xl font-semibold">RegOp</h1>
        <button onClick={switchTheme}>{options[optionIndex].component}</button>
      </header>
      <AnimatePresence initial={false} mode="wait">
        <motion.div className="min-h-screen pt-24" key={location.pathname} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'tween' }}>
          <LocationContext.Provider value={{ location: location }}>{useOutlet()}</LocationContext.Provider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default RootLayout;
