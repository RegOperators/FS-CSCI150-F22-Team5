import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import CoursesStep from './components/CoursesStep'
import BusyPeriodsStep from './components/BusyPeriodsStep'

function App() {
  const [formData, setFormData] = useState({
    courses: [{ courseId: '' }],
    busyPeriods: []
  })

  const [schedules, setSchedules] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchSchedules = () => {
    fetch('http://localhost:4000?' + new URLSearchParams(formData.courses.map((course) => ['classes', course.courseId])).toString())
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK')
      }
      return response.json()
    })
    .then((data) => {
      setSchedules(data)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
      setSchedules(null)
    })
    .finally(() => setLoading(false))
  }

  const steps = [
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
  
  return (
    <div className="dark:bg-[#0d1117] dark:text-white font-['Manrope']">
      <header className="px-6 py-4">
        <img src={logo} className="w-16 h-16" alt="logo" />
      </header>
      <div className="py-40 container mx-auto px-6 hidden">
        <h1 className="text-5xl sm:text-8xl font-extrabold mb-16">Create the perfect <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-400">class schedule</span> in a matter of seconds!</h1>
        <p className="text-lg mb-16">All you have to do is specify the classes you'd like to take, along with some preferences, and we'll take care of the rest.</p>
        {/*<button className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md" onClick={addCourse}>Add Course</button>*/}
        {/*<button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md" onClick={fetchSchedules}>Generate Schedules</button>*/}
      </div>
      <div>
        <div className="container mx-auto px-6 py-24 grid grid-cols-1 sm:grid-cols-10">
          <div className="col-span-3">
            <ol>
              {steps.map((step, index) => (
                <li>{step.name}</li>
              ))}
            </ol>
          </div>
          <div className="col-span-7">{steps[currentStepIndex].component}</div>
        </div>
        <div className="fixed bottom-0 w-full bg-white dark:bg-[#0d1117] py-4">
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
