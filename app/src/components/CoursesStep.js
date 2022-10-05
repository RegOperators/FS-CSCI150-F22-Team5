import { useState } from 'react'

const CoursesStep = ({ formData, setFormData }) => {
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
  
  return (
    <div>
      <h1 className="text-4xl sm:text-7xl font-extrabold mb-8">Courses</h1>
      <ul>
        {courses.map((course, index) => (
          <li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-16 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
            <div>
              <div>CSCI 117 - Structures of Programming Languages</div>
              <div>3</div>
            </div>
            <button onClick={() => removeCourse(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CoursesStep