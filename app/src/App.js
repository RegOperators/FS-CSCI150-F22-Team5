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

  const [schedules, setSchedules] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  var potentialScheduleRes //Data used in Front end manipulation of potential schedules
  const fetchSchedules = () => {
    fetch('http://localhost:4000/?' + new URLSearchParams(courses.map((course) => ['classes', course.courseId])).toString())
      //http://localhost:4000?  test on local machine
      //http://35.92.207.28:8080/? If you want to run on AWS
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK')
      }

      return response.json()
    })
    .then((data) => {
      setSchedules(data)
      setError(null)
      potentialScheduleRes = data
      tableResults()
    })
    .catch((error) => {
      setError(error.message)
      setSchedules(null)
    })
    .finally(() => setLoading(false))
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const tableResults = () => {
    var res = ""
    for(let i = 0; i < potentialScheduleRes.length; i++){
      res += "<br/><br/><table> <tr><td></td><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>" + scheduleRow(potentialScheduleRes[i]) + "</table>"
    }
    document.getElementById("resultTables").innerHTML = res
  }

  const scheduleRow = (classes) => {
    var x = classes
    x.sort(compareFn)
    console.log(x)
    var res1 = ""
    for(let i = 0; i < x.length; i++){
      res1 += "<tr><td></td>"
      if(x[i].days.includes("Mo")){
        res1 += "<td>" + x[i].courseName + " " + x[i].type +"<br/>" + x[i].id
        res1 += "<br/> Time: " + getTime(x[i].startTime) + " - " + getTime(x[i].endTime)
        res1 += "<br/> Instructor: " + x[i].instructor
        res1 += "</td>"
      }else {res1 += "<td></td>"}

      if(x[i].days.includes("Tu")){
        res1 += "<td>" + x[i].courseName + " " + x[i].type +"<br/>" + x[i].id
        res1 += "<br/> Time: " + getTime(x[i].startTime) + " - " + getTime(x[i].endTime)
        res1 += "<br/> Instructor: " + x[i].instructor
        res1 += "</td>"
      }else {res1 += "<td></td>"}

      if(x[i].days.includes("We")){
        res1 += "<td>" + x[i].courseName + " " + x[i].type +"<br/>" + x[i].id
        res1 += "<br/> Time: " + getTime(x[i].startTime) + " - " + getTime(x[i].endTime)
        res1 += "<br/> Instructor: " + x[i].instructor
        res1 += "</td>"
      }else {res1 += "<td></td>"}

      if(x[i].days.includes("Th")){
        res1 += "<td>" + x[i].courseName + " " + x[i].type +"<br/>" + x[i].id
        res1 += "<br/> Time: " + getTime(x[i].startTime) + " - " + getTime(x[i].endTime)
        res1 += "<br/> Instructor: " + x[i].instructor
        res1 += "</td>"
      }else {res1 += "<td></td>"}

      if(x[i].days.includes("Fr")){
        res1 += "<td>" + x[i].courseName + " " + x[i].type +"<br/>" + x[i].id
        res1 += "<br/> Time: " + getTime(x[i].startTime) + " - " + getTime(x[i].endTime)
        res1 += "<br/> Instructor: " + x[i].instructor
        res1 += "</td>"
      }else {res1 += "<td></td>"}

      res1 += "<tr>"
    }

    return res1

  }

  const getTime = (timeGiven) => {
    let myArray = timeGiven.split(':');

    let x = parseFloat(myArray[0]);
    if(x > 12)
      x = x % 12
    
    return (x.toString() + ":" + myArray[1])
  }

  const compareFn = (firstItem, secondItem) => {
    const myArray = firstItem.startTime.split(':')
    myArray[1] = "0." + myArray[1]
    var a = parseFloat(myArray[0]) + parseFloat(myArray[1])
     
    const myArray1 = secondItem.startTime.split(':')
    myArray1[1] = "0." + myArray1[1]
    var b = parseFloat(myArray1[0]) + parseFloat(myArray1[1])

    if(a < b)
      return -1
    else if(a > b)
      return 1
    else 
      return 0
  }

  


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <header className="px-6 py-4">
        <img src={logo} className="w-16 h-16" alt="logo" />
      </header>
      <div className="py-32 container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-7xl font-extrabold mb-16">Create the perfect <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-400">class schedule</span> in a matter of seconds!</h1>
        <p className="text-lg mb-16">All you have to do is specify the classes you'd like to take, along with some preferences, and we'll take care of the rest.</p>
        {courses.map((course, index) => (
          <div className="mb-4" key={index}>
            <input className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded" value={course.courseId} onChange={(event) => updateCourse(index, event)} />
            <button onClick={() => removeCourse(index)}>Remove</button>
          </div>
        ))}
        <button className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded" onClick={addCourse}>Add Course</button>
        <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2 rounded" onClick={fetchSchedules}>Generate Schedules</button>
      </div>
      <div id="resultTables">

      </div>
    </div>
  );
}

export default App;
