import { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [courses, setCourses] = useState([{ courseId: '' }])

  const addCourse = () => {
    setCourses([...courses, { courseId: '' }])
  }

  const updateCourse = (index, event) => {
    const newCourses = [...courses]
    newCourses[index].courseId = event.target.value
    setCourses(newCourses)
  }
  
  const removeCourse = (index) => {
    const newCourses = [...courses]
    newCourses.splice(index, 1)
    setCourses(newCourses)
  }

  const [busyPeriods, setBusyPeriods] = useState([{ name: '', startTime: '', endTime: '' }])

  const addBusyPeriod = () => {
    setBusyPeriods([...busyPeriods, { name: '', startTime: '', endTime: '' }])
  }

  const updateBusyPeriod = (index, event) => {
    const newBusyPeriods = [...busyPeriods]
    newBusyPeriods[index][event.target.name] = event.target.value
    setBusyPeriods(newBusyPeriods)
  }
  
  const removeBusyPeriod = (index) => {
    const newBusyPeriods = [...busyPeriods]
    newBusyPeriods.splice(index, 1)
    setBusyPeriods(newBusyPeriods)
  }
  
  const [schedules, setSchedules] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchSchedules = () => {
    fetch('http://localhost:4000?' + new URLSearchParams(courses.map((course) => ['classes', course.courseId])).toString())
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
  
  return (
    <div className="dark:bg-[#0d1117] dark:text-white font-['Manrope']">
      <header className="px-6 py-4">
        <img src={logo} className="w-16 h-16" alt="logo" />
      </header>
      <div className="py-40 container mx-auto px-6 text-center">
        <h1 className="text-5xl sm:text-8xl font-extrabold mb-16">Create the perfect <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-400">class schedule</span> in a matter of seconds!</h1>
        <p className="text-lg mb-16">All you have to do is specify the classes you'd like to take, along with some preferences, and we'll take care of the rest.</p>
        <div className="grid grid-cols-1 sm:grid-cols-10 gap-8 mb-16">
          <div className="col-span-6">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-2.5 left-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input className="bg-gray-100 dark:bg-[#161b22] pl-14 pr-4 py-2.5 rounded-md w-full mb-8" />
            </div>
            <ul className="">
              {courses.map((course, index) => (
                <li className="bg-gray-100 dark:bg-[#161b22] p-16 rounded-md flex flex-col sm:flex-row mb-4 last:mb-0" key={index}>
                  <div>CSCI 117 - Structures of Programming Languages</div>
                  <div>3</div>
                  <button onClick={() => removeCourse(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
          <ul className="col-span-4">
            {courses.map((course, index) => (
              <li className="bg-gray-100 dark:bg-[#161b22] p-16 rounded-md flex flex-col sm:flex-row mb-4 last:mb-0" key={index}>
                <div>CSCI 117 - Structures of Programming Languages</div>
                <div>3</div>
                <button onClick={() => removeCourse(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mb-6">
          {busyPeriods.map((busyPeriod, index) => (
            <li className="grid grid-cols-2 sm:grid-cols-10 gap-4 mb-4 last:mb-0" key={index}>
              <div className="col-span-2">
                <label className="block mb-2">Name</label>
                <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" value={busyPeriod.name} onChange={(event) => updateBusyPeriod(index, event)} />
              </div>
              <div>
                <label className="block mb-2">Start Time</label>
                <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" type="time" value={busyPeriod.startTime} onChange={(event) => updateBusyPeriod(index, event)} />
              </div>
              <div>
                <label className="block mb-2">End Time</label>
                <input className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md w-full" type="time" value={busyPeriod.endTime} onChange={(event) => updateBusyPeriod(index, event)} />
              </div>
              <input className="" type="checkbox" />
              <button onClick={() => removeBusyPeriod(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button className="bg-gray-100 dark:bg-[#161b22] px-4 py-2.5 rounded-md" onClick={addCourse}>Add Course</button>
        <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md" onClick={fetchSchedules}>Generate Schedules</button>
      </div>
      <table>
        <tr>
          <td></td>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
        <tr>
          <th>8:00AM</th>
        </tr>
      </table>
    </div>
  );
}

export default App;
