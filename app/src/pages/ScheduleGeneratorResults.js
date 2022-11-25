import { useState, useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const ScheduleGeneratorResults = () => {
  const location = useLocation()
  const formData = location.state
  
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        term: formData.term,
        courses: formData.courses.map((course) => `${course.SUBJECT_ID} ${course.CATALOG_NBR}`)
      })
    })
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

  const [offset, setOffset] = useState(Math.floor(Math.random() * 360))
  
  const calculateColor = (index) => {
    return `hsl(${(137.5 * index) + offset}, 84%, 67%)`
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

  //////////////////////////////

  //Handles

  //Functions that deal with the filtering of busy periods

  //Precondition: A list of javascript objects that are fomatted in the json format established in the courses array
  //Postcondition: A list of javascript objects in same format that is filtered of those conflicting with our busyperiods array.
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

  //Precondition: Singular item in courses array (represents one weekly schedule)
  //Postcondition: Returns boolean that equals if there are no conflicts with busy period
  const filterHelp = (potential) =>{
   
    for(let j = 0; j < potential.length; j++) // for each class in week
      for(let i = 0; i < formData.busyPeriods.length; i++){ //for each busy period
        var why = intersectHelp(formData.busyPeriods[i].startTime, formData.busyPeriods[i].endTime, potential[j]) //Test code
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

  //Precondition: start and end being in military time, potential being a singular class in schedule from courses list
  //Postcondition: A boolean that equals true if there is conflict between a class and a busy period
  const intersectHelp = (start, end, potential) =>{ //returns true if classes intersect with busy periods
    var arr = start.split(":")
    var a = parseFloat(arr[0]) + (parseFloat(arr[1]) / 60)
    var arr2 = end.split(":")
    var b = parseFloat(arr2[0]) + (parseFloat(arr2[1]) / 60)
      var arr3 = potential.startTime.split(":")
      var c = parseFloat(arr3[0]) + (parseFloat(arr3[1]) / 60)
      var arr4 = potential.endTime.split(":")
      var d = parseFloat(arr4[0]) + (parseFloat(arr4[1]) / 60)
      if(b > c && a < d)
        return true
    return false
  }
  /////////////////////////////
  
  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <LoadingSpinner className="mb-4" />
          <div className="text-lg font-semibold">Generating Schedules</div>
        </div>
      ) : (
        <>
          {!error ? (
            <div className="px-6 sm:px-12 py-48 sm:py-56 2xl:py-64">
              <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-bold mb-8">{schedules.length} Possible Schedules</h1>
              {schedules.length > 0 ? (
                <ul>
                  {schedules.map((schedule, index) => (
                    <li className="grid grid-cols-1 sm:grid-cols-10 gap-16 mb-16 last:mb-0" key={index}>
                      <div className="sm:col-span-4 sm:sticky sm:top-32 sm:h-min">
                        <h2 className="text-xl font-semibold mb-8">{index + 1}</h2>
                        <ul>
                          {schedule.map((section, index) => (
                            <li key={index}>
                              <div>{section.courseName}</div>
                              <div>{militaryToRegularTime(section.startTime)} - {militaryToRegularTime(section.endTime)}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="sm:col-span-6 grid grid-cols-[auto_repeat(5,_1fr)] overflow-x-auto" style={{ gridTemplateRows: `auto repeat(${endTime - startTime}, 1fr)` }}>
                        <div className="bg-white dark:bg-[#0d1117] sticky left-0 z-10" style={{ gridArea: '1 / 1 / 2 / 2' }}></div>
                        <div className="font-medium text-center pb-4" style={{ gridArea: '1 / 2 / 2 / 3' }}>Mo</div>
                        <div className="font-medium text-center pb-4" style={{ gridArea: '1 / 3 / 2 / 4' }}>Tu</div>
                        <div className="font-medium text-center pb-4" style={{ gridArea: '1 / 4 / 2 / 5' }}>We</div>
                        <div className="font-medium text-center pb-4" style={{ gridArea: '1 / 5 / 2 / 6' }}>Th</div>
                        <div className="font-medium text-center pb-4" style={{ gridArea: '1 / 6 / 2 / 7' }}>Fr</div>
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
                              <div className="bg-gray-100 dark:bg-[#161b22] border-l-4 p-1 rounded-md text-center relative m-0.5" style={{ borderColor: calculateColor(formData.courses.findIndex((course) => course.CRSE_ID === section.courseId)), gridArea: `${(parseInt(section.startTime.split(':')[0]) - startTime) + 2} / ${sectionGroupIndex + 2} / ${(parseInt(section.endTime.split(':')[0]) - startTime) + 3} / ${sectionGroupIndex + 3}`, top: `${(((parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60)) - parseInt(section.startTime.split(':')[0])) / ((parseInt(section.endTime.split(':')[0]) + 1) - parseInt(section.startTime.split(':')[0]))) * 100}%`, height: `${(((parseInt(section.endTime.split(':')[0]) + (parseInt(section.endTime.split(':')[1]) / 60)) - (parseInt(section.startTime.split(':')[0]) + (parseInt(section.startTime.split(':')[1]) / 60))) / ((parseInt(section.endTime.split(':')[0]) + 1) - parseInt(section.startTime.split(':')[0]))) * 100}%` }} key={index}>
                                <div className="text-sm font-semibold">{section.courseName} - {section.type}</div>
                                <div className="text-xs">{militaryToRegularTime(section.startTime)} - {militaryToRegularTime(section.endTime)}</div>
                                <div className="text-xs">{section.room}</div>
                              </div>
                            ))}
                          </Fragment>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No courses have been selected.</div>
              )}
            </div>
          ) : (
            <div>{error}</div>
          )}
        </>
      )}
    </>
  )
}

export default ScheduleGeneratorResults