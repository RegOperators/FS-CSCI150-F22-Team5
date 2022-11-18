import { useState, useEffect, Fragment } from 'react'
import BusyPeriodsStep from './BusyPeriodsStep'

const SchedulesStep = ({ formData, setFormData }) => {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('http://35.92.207.28:8080/?' + new URLSearchParams(formData.courses.map((course) => ['classes', `${course.SUBJECT_ID} ${course.CATALOG_NBR}`])).toString())
    //http://localhost:4000?  test on local machine
      //http://35.92.207.28:8080/? If you want to run on AWS
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK')
      }
      return response.json()
    })
    .then((data) => {
      data = filterBusy(data)
      setSchedules(data)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
      setSchedules(null)
    })
    .finally(() => setLoading(false))
  }, [])

  /////////////////////////////////////////
  const filterBusy = (potential) =>{
    console.log(formData.busyPeriods);
    let res = [];
    for(let j = 0; j < potential.length; j++){ //for possible weekly schedule
      if(filterHelp(potential[j]))
        res.push(potential[j])
    }
    return res
    //return res
  }

  const filterHelp = (potential) =>{
   
    for(let j = 0; j < potential.length; j++) // for each class in week
      for(let i = 0; i < formData.busyPeriods.length; i++){ //for each busy period
        var why = intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j])
        if(formData.busyPeriods[i].days[0] && potential[j].days.includes("Mo") && intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j]))
          return false;
        if(formData.busyPeriods[i].days[1] && potential[j].days.includes("Tu") && intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j]))
          return false;
        if(formData.busyPeriods[i].days[2] && potential[j].days.includes("We") && intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j]))
          return false;
        if(formData.busyPeriods[i].days[3] && potential[j].days.includes("Th") && intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j]))
          return false;
        if(formData.busyPeriods[i].days[4] && potential[j].days.includes("Fr") && intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j]))
          return false;
      }

    return true;
  }

  const intersectHelp = (start, end, potential) =>{ //returns true if classes intersect with busy periods
    var arr = start.split(":")
    var a = parseFloat(arr[0]) + (parseFloat(arr[1]) / 60)
    var arr2 = end.split(":")
    var b = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60)
   // for(let i = 0; i < potential.length; i++){ // Get each class in week
      var arr3 = potential.startTime.split(":")
      var c = parseFloat(arr3[0]) + (parseFloat(arr3[1]) / 60)
      var arr4 = potential.endTime.split(":")
      var d = parseFloat(arr4[0]) + (parseFloat(arr4[1]) / 60)
      if(b > c && a < d)
        return true
   // }
    return false
  }

  /////////////////////////////////////////

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
            <li className="grid grid-cols-[auto_repeat(5,_1fr)] overflow-x-auto mb-4 last:mb-0" style={{ gridTemplateRows: `auto repeat(${endTime - startTime}, 1fr)` }} key={index}>
              <div className="bg-white dark:bg-[#0d1117] sticky left-0 z-10" style={{ gridArea: '1 / 1 / 2 / 2' }}></div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 2 / 2 / 3' }}>Mo</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 3 / 2 / 4' }}>Tu</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 4 / 2 / 5' }}>We</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 5 / 2 / 6' }}>Th</div>
              <div className="text-center pb-4" style={{ gridArea: '1 / 6 / 2 / 7' }}>Fr</div>
              {Array.from({ length: endTime - startTime }, (v, i) => militaryToRegularTime(`${(startTime + i).toString().padStart(2, '0')}:00`)).map((time, index) => (
                <div className="bg-white dark:bg-[#0d1117] sticky left-0 z-10 min-h-[8rem] pr-4" style={{ gridArea: `${index + 2} / 1 / ${index + 3} / 2` }} key={index}>
                  <div className="text-xs -translate-y-1/2">{time}</div>
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