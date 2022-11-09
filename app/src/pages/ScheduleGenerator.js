import { useState } from 'react'
import TermStep from '../components/TermStep'
import CoursesStep from '../components/CoursesStep'
import BusyPeriodsStep from '../components/BusyPeriodsStep'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function ScheduleGenerator() {
  const [formData, setFormData] = useState({
    term: '',
    courses: [],
    busyPeriods: []
  })

  const steps = [
    { name: 'Select Term', component: <TermStep formData={formData} setFormData={setFormData} /> },
    { name: 'Select Courses', component: <CoursesStep formData={formData} setFormData={setFormData} /> },
    { name: 'Add Busy Periods', component: <BusyPeriodsStep formData={formData} setFormData={setFormData} /> }
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
  
  const navigate = useNavigate()
  
  const submit = () => {
    navigate('/schedule-generator/results', { state: formData })
  }
  
  return (
    <div>
      <div className="container mx-auto px-6 sm:px-12 py-24 sm:py-32 2xl:py-48 grid grid-cols-1 sm:grid-cols-10 gap-16">
        <div className="hidden sm:block col-span-3 sticky top-32 h-min">
          <ol>
            {steps.map((step, index) => (
              <li className={`flex items-center mb-16 last:mb-0 ${index !== currentStepIndex ? 'text-gray-500 dark:text-gray-400' : ''}`} onClick={() => setCurrentStepIndex(index)} key={index}><div className="bg-gray-100 dark:bg-[#161b22] w-8 h-8 rounded-md flex justify-center items-center mr-4">{index + 1}</div>{step.name}</li>
            ))}
          </ol>
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div className="sm:col-span-7" key={currentStepIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'tween' }}>{steps[currentStepIndex].component}</motion.div>
        </AnimatePresence>
      </div>
      <div className="fixed bottom-0 w-full z-10 bg-white dark:bg-[#0d1117] py-6">
        <div className="container mx-auto px-6 sm:px-12 flex justify-end">
          <button className="bg-gray-100 hover:bg-gray-200 dark:bg-[#161b22] dark:hover:bg-[#21262d] font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto disabled:opacity-50 disabled:pointer-events-none mr-4" onClick={goBack} disabled={currentStepIndex === 0}>Back</button>
          {currentStepIndex !== steps.length - 1 ? (
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={goForward}>Continue</button>
          ) : (
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={submit}>Generate</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleGenerator;
