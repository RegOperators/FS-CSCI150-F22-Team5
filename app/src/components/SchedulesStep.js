import { useState, useEffect, Fragment } from 'react'

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

  const calculateColor = (index) => {
    return `hsl(${137.5 * index}, 100%, 75%)`
  }
  
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
  
  const startTime = 8
  const endTime = 19
  
  return (
    <div>
      <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-extrabold mb-12">Schedules</h1>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map((schedule, index) => (
            <li className="grid grid-cols-[auto_repeat(5,_1fr)] mb-4 last:mb-0" style={{ gridTemplateRows: `auto repeat(${endTime - startTime}, 1fr)` }} key={index}>
              <div className="text-center pb-4" style={{ gridArea: '1 / 2 / 2 / 3' }}>Monday</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 3 / 2 / 4' }}>Tuesday</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 4 / 2 / 5' }}>Wednesday</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 5 / 2 / 6' }}>Thursday</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 6 / 2 / 7' }}>Friday</div>
              {Array.from({ length: endTime - startTime }, (v, i) => militaryToRegularTime(`${(startTime + i).toString().padStart(2, '0')}:00`)).map((time, index) => (
                <div className="h-32 pr-4" style={{ gridArea: `${index + 2} / 1 / ${index + 3} / 2` }} key={index}>
                  <div className="-translate-y-1/2">{time}</div>
                </div>
              ))}
              {Array.from({ length: 5 * (endTime - startTime) }, (v, i) => (
                <div className="border-t border-gray-200 dark:border-[#30363d]" style={{ gridArea: `${Math.floor(i / 5) + 2} / ${(i % 5) + 2} / ${Math.floor(i / 5) + 3} / ${(i % 5) + 3}` }} key={i}></div>
              ))}
              {Array.from(groupSectionsByDay(schedule)).map(([key, value], sectionGroupIndex) => (
                <Fragment key={sectionGroupIndex}>
                  {value.map((section, index) => (
                    <div className="text-black p-1 rounded-md text-center relative m-0.5" style={{ backgroundColor: calculateColor(formData.courses.findIndex((course) => course.CRSE_ID === section.courseId)), gridArea: `${(parseInt(section.startTime.split(':')[0]) - startTime) + 2} / ${sectionGroupIndex + 2} / ${(parseInt(section.endTime.split(':')[0]) - startTime) + 3} / ${sectionGroupIndex + 3}`, top: `${(((parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60)) - parseInt(section.startTime.split(':')[0])) / ((parseInt(section.endTime.split(':')[0]) + 1) - parseInt(section.startTime.split(':')[0]))) * 100}%`, height: `${(((parseInt(section.endTime.split(':')[0]) + (parseInt(section.endTime.split(':')[1]) / 60)) - (parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60))) / ((parseInt(section.endTime.split(':')[0]) + 1) - parseInt(section.startTime.split(':')[0]))) * 100}%` }} key={index}>
                      <div className="text-sm font-semibold">{section.courseName}</div>
                      <div className="text-xs">{militaryToRegularTime(section.startTime)} - {militaryToRegularTime(section.endTime)}</div>
                      <div className="text-xs">{section.room}</div>
                    </div>
                  ))}
                </Fragment>
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