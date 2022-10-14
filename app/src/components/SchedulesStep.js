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
  
  const militaryToRegularTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
  }
  
  return (
    <div>
      <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-extrabold mb-12">Schedules</h1>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map((schedule, index) => (
            <li className="bg-gray-100 dark:bg-[#161b22] rounded-md grid grid-cols-11 mb-4 last:mb-0" key={index}>
              <ul>
                {Array.from({ length: 11 }, (v, i) => militaryToRegularTime(`${(8 + i).toString().padStart(2, '0')}:00`)).map((time, index) => (
                  <li className="h-32" key={index}>{time}</li>
                ))}
              </ul>
              {Array.from(groupSectionsByDay(schedule)).map(([key, value], index) => (
                <ul className="relative col-span-2" key={index}>
                  {value.map((section, index) => (
                    <li className="bg-blue-500 p-1 rounded-md text-center absolute" style={{ top: ((((parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60)) - 8) / (19 - 8)) * 100) + '%', height: ((((parseInt(section.endTime.split(':')[0]) + (parseInt(section.endTime.split(':')[1]) / 60)) - (parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60))) / (19 - 8)) * 100) + '%' }} key={index}>
                      <div className="text-sm font-semibold">{section.courseName}</div>
                      <div className="text-xs">{militaryToRegularTime(section.startTime)} - {militaryToRegularTime(section.endTime)}</div>
                      <div className="text-xs">{section.room}</div>
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