import { useState, useEffect } from 'react'

const SchedulesStep = ({ formData, setFormData }) => {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('http://localhost:4000?' + new URLSearchParams(formData.courses.map((course) => ['classes', `${course.SUBJECT_ID} ${course.CATALOG_NBR}`])).toString())
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
  }, [])

  const groupSectionsByDay = (sections) => {
    const groups = new Map()
    for (const dayId of ['Mo', 'Tu', 'We', 'Th', 'Fr']) {
      groups.set(dayId, [])
      for (const section of sections) {
        if (section.days.includes(dayId)) {
          groups.get(dayId).push(section)
        }
      }
    }
    return groups
  }
  
  return (
    <div>
      <h1 className="text-4xl sm:text-7xl font-extrabold mb-12">Schedules</h1>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map((schedule, index) => (
            <li className="bg-gray-100 dark:bg-[#161b22] rounded-md grid grid-cols-11 mb-4 last:mb-0" key={index}>
              <ul>
                {Array.from({ length: 11 }, (v, i) => 8 + i).map((time) => (
                  <li>{time}</li>
                ))}
              </ul>
              {Array.from(groupSectionsByDay(schedule)).map(([key, value]) => (
                <ul className="relative col-span-2">
                  {value.map((section) => (
                    <li className="bg-blue-500 p-2 rounded-md text-center absolute" style={{ top: ((((parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60)) - 8) / (19 - 8)) * 100) + '%', height: ((((parseInt(section.endTime.split(':')[0]) + (parseInt(section.endTime.split(':')[1]) / 60)) - (parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60))) / (19 - 8)) * 100) + '%' }}>
                      <div className="font-semibold">{section.courseName}</div>
                      <div className="text-sm">{new Date(`1970-01-01T${section.startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} - {new Date(`1970-01-01T${section.endTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</div>
                      <div className="text-sm">{section.room}</div>
                    </li>
                  ))}
                </ul>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <div>No courses have been selected.</div>
      )}
    </div>
  )
}

export default SchedulesStep