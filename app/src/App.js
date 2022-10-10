import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import CoursesStep from './components/CoursesStep'
import BusyPeriodsStep from './components/BusyPeriodsStep'
import SchedulesStep from './components/SchedulesStep'

function App() {
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
      <header className="px-6 py-4">
        <img src={logo} className="w-16 h-16" alt="logo" />
      </header>
      <div>
        <div className="container mx-auto px-6 py-32 grid grid-cols-1 sm:grid-cols-10 gap-16">
          <div className="col-span-3">
            <ol>
              {steps.map((step, index) => (
                <li>{step.name}</li>
              ))}
            </ol>
          </div>
          <div className="col-span-7">{steps[currentStepIndex].component}</div>
        </div>
        <div className="fixed bottom-0 w-full bg-white dark:bg-[#0d1117] py-8">
          <div className="container mx-auto px-6">
            {/*<button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={fetchSchedules}>Generate Schedules</button>*/}
            <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md w-full sm:w-auto" onClick={goForward}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
