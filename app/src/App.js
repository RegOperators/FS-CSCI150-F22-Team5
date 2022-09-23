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
    <div className="dark:bg-gray-900 dark:text-white font-['Manrope']">
      <header className="px-6 py-4">
        <img src={logo} className="w-16 h-16" alt="logo" />
      </header>
      <div className="py-32 container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-7xl font-extrabold mb-16">Create the perfect <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-400">class schedule</span> in a matter of seconds!</h1>
        <p className="text-lg mb-16">All you have to do is specify the classes you'd like to take, along with some preferences, and we'll take care of the rest.</p>
        <ul className="mb-6">
          {courses.map((course, index) => (
            <li className="mb-4 last:mb-0" key={index}>
              <input className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded mr-4" value={course.courseId} onChange={(event) => updateCourse(index, event)} />
              <button onClick={() => removeCourse(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded" onClick={addCourse}>Add Course</button>
        <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2 rounded" onClick={fetchSchedules}>Generate Schedules</button>
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
