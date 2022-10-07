import { useState } from 'react'
import Modal from './Modal'

const CoursesStep = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
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
    const newCourses = [...formData.courses]
    newCourses.splice(index, 1)
    setFormData({...formData, courses: newCourses})
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-7xl font-extrabold">Courses</h1>
        <button className="bg-gradient-to-br from-red-400 to-orange-400 px-4 py-2.5 rounded-md flex" onClick={() => setIsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add
        </button>
      </div>
      {formData.courses.length > 0 ? (
        <ul>
          {formData.courses.map((course, index) => (
            <li className="bg-gray-100 dark:bg-[#161b22] p-6 sm:p-8 rounded-md flex justify-between mb-4 last:mb-0" key={index}>
              <div>
                <div className="text-lg font-semibold">CSCI 117 - Structures of Programming Languages</div>
                <div>3</div>
              </div>
              <button onClick={() => removeCourse(index)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No courses have been selected.</div>
      )}
      <Modal isOpen={isModalOpen}>
        <div>
          <div className="relative mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-2.5 left-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input className="bg-gray-100 dark:bg-[#161b22] pl-14 pr-4 py-2.5 rounded-md w-full" />
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
      </Modal>
    </div>
  )
}

export default CoursesStep