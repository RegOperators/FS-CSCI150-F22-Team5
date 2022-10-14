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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" />
    </svg>
  )

  const lightThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  )

  const darkThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
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
  
  return (
    <div className="dark:bg-[#0d1117] dark:text-white font-['Manrope'] min-h-screen">
      <header className="flex justify-between px-6 sm:px-12 py-6 sm:py-8">
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
        <div className="fixed bottom-0 w-full bg-white dark:bg-[#0d1117] py-6">
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
