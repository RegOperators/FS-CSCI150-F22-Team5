import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import CoursesStep from './components/CoursesStep'
import BusyPeriodsStep from './components/BusyPeriodsStep'
import SchedulesStep from './components/SchedulesStep'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
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
  
  const [formData, setFormData] = useState({
    courses: [],
    busyPeriods: []
  })

  const steps = [
    { name: 'Select Courses', component: <CoursesStep formData={formData} setFormData={setFormData} /> },
    { name: 'Add Busy Periods', component: <BusyPeriodsStep formData={formData} setFormData={setFormData} /> },
    { name: 'Compare Schedules', component: <SchedulesStep formData={formData} setFormData={setFormData} /> }
  ]

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const goForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="dark:bg-[#0d1117] dark:text-white font-['Manrope'] min-h-screen">
      <header className="flex justify-between items-center px-6 sm:px-12 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-semibold">RegOp</h1>
        <button onClick={switchTheme}>{options[optionIndex].component}</button>
      </header>
      <div>
        <div className="container mx-auto px-6 sm:px-12 py-16 sm:py-32 grid grid-cols-1 sm:grid-cols-10 gap-16">
          <div className="sm:col-span-3 sm:sticky sm:top-32 sm:h-min">
            <ol className="flex sm:flex-col overflow-x-auto">
              {steps.map((step, index) => (
                <li className="flex items-center shrink-0 mr-4 last:mr-0 sm:mr-0 sm:mb-16 sm:last:mb-0" onClick={() => setCurrentStepIndex(index)} key={index}><div className="bg-gray-100 dark:bg-[#161b22] w-8 h-8 rounded-md flex justify-center items-center mr-4">{index + 1}</div>{step.name}</li>
              ))}
            </ol>
          </div>
          <AnimatePresence initial={false} mode="wait">
            <motion.div className="sm:col-span-7" key={currentStepIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'tween' }}>{steps[currentStepIndex].component}</motion.div>
          </AnimatePresence>
        </div>
        <div className="fixed bottom-0 w-full z-10 bg-white dark:bg-[#0d1117] py-6">
          <div className="container mx-auto px-6 sm:px-12 flex justify-end">
            <button className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full sm:w-auto mr-4" onClick={goBack}>Back</button>
            <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={goForward}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
