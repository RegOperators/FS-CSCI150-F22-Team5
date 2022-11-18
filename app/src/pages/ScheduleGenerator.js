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
      <div className="hidden xl:block xl:w-96 2xl:w-[28rem] h-full fixed px-6 sm:px-12 py-48 sm:py-56 2xl:py-64">
        <ol className="border-l border-gray-200 dark:border-[#30363d]">
          {steps.map((step, index) => (
            <li className={`px-8 py-1 mb-12 last:mb-0 relative ${index === currentStepIndex ? 'text-indigo-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setCurrentStepIndex(index)} key={index}>
              {index === currentStepIndex && (
                <motion.div className="w-[3px] h-full bg-current rounded-md absolute -left-0.5 top-0" layoutId="stepMarker"></motion.div>
              )}
              {step.name}
            </li>
          ))}
        </ol>
      </div>
      <div className="xl:ml-96 2xl:ml-[28rem]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div className="max-w-5xl px-6 sm:px-12 py-48 sm:py-56 2xl:py-64 min-h-screen" key={currentStepIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'tween' }}>{steps[currentStepIndex].component}</motion.div>
        </AnimatePresence>
        <div className="sticky bottom-0 bg-white dark:bg-[#0d1117] py-6">
          <div className="max-w-5xl px-6 sm:px-12 flex justify-end">
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-[#161b22] dark:hover:bg-[#21262d] font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto disabled:opacity-50 disabled:pointer-events-none mr-4" onClick={goBack} disabled={currentStepIndex === 0}>Back</button>
            {currentStepIndex !== steps.length - 1 ? (
              <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={goForward}>Continue</button>
            ) : (
              <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={submit}>Generate</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleGenerator;
